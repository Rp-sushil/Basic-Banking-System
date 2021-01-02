import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
export default function Form({ customersData, setMoneyTransfered }) {
  const { customerId } = useParams();

  const handleSubmit = (e) => {
    const paidto = e.target[0].value;
    const amount = e.target[1].value;
    if (paidto === customerId) {
      e.preventDefault();
      alert("Can not transfer money to yourself");
      return;
    }
    console.log(paidto, amount);
    axios
      .patch(
        "http://localhost:5050/transfers",
        JSON.stringify({
          to: paidto,
          from: customerId,
          amount: parseInt(amount),
        }),
        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setMoneyTransfered(true);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customerNames">Transfer Money To:</label>

        <select name="customerID" id="customerNames">
          {customersData.map((customer, i) => {
            return (
              <option
                key={customer.email + i}
                value={customer.id}
                disabled={parseInt(customer.id) === parseInt(customerId)}
              >
                {customer.name}
              </option>
            );
          })}
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <label htmlFor="amountToPay">Amount</label>
        <br />
        <input type="number" id="amountTopay" name="amount" />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
