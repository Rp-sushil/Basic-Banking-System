const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// MIddlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SETUP Database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

// id_counter
var count = 16;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// Routes
app.get("/customers", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM customers");
    return res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM customers WHERE id=${req.params.id}`
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Record not found" });
    return res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/transfers", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const {
      rows,
    } = await client.query(`SELECT table1."paidfrom", table2."paidto", table1."amount", table1."transaction_at" FROM
    (SELECT transfers."id", customers."name" as paidFrom, transfers."amount", transfers."transaction_at" FROM transfers JOIN customers ON customers."id"=transfers."paidFrom") as table1
    INNER JOIN
    (SELECT transfers."id", customers."name" as paidTo, transfers."amount", transfers."transaction_at" FROM transfers JOIN customers ON customers."id"=transfers."paidTo") as table2 ON
    table1."id"=table2."id" order BY table1."transaction_at" DESC LIMIT ${limit}
    `);
    return res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/transfers", async (req, res) => {
  const { to, from, amount } = req.body;
  if (!to || !from || !amount || amount < 0)
    return res
      .status(400)
      .json({ message: "Please provide accurate and complete details" });
  try {
    const first = await client.query(`SELECT * FROM customers WHERE id=${to}`);
    const second = await client.query(
      `SELECT * FROM customers WHERE id=${from}`
    );
    if (second.rows.length === 0 || first.rows.length === 0)
      return res.status(404).json({ message: "Record not found" });
    if (first.rows[0].balance < amount)
      return res
        .status(400)
        .json({ message: `:( You do not have ${amount} in your account}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  try {
    const data = await client.query(
      `UPDATE customers SET balance = balance - ${amount} WHERE id = ${from}; UPDATE customers SET balance = balance + ${amount} WHERE id = ${to};`
    );
    count++;
    const transferData = await client.query(
      `INSERT INTO transfers (id, "paidTo", "paidFrom", "amount") VALUES (${count} ,${to}, ${from}, ${amount})`
    );
    if (data[0].rowCount > 0 && transferData.rowCount > 0)
      return res.json({
        message: `:) sucessfully transfered ${amount} from ${from} to ${to}`,
      });
    return res.json({ message: ":( failed to transfer money" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.send({ to, from, amount });
});

app.listen(process.env.PORT, () =>
  console.log("App is listening at port 5050")
);
