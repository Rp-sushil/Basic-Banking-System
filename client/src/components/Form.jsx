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
      alert(":( You can not transfer money to yourself");
      return;
    }
    console.log(paidto, amount);
    axios
      .patch(
        "/transfers",
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
          alert(":) Money Succesfully Transfered");
          e.target[1].value = "";
          console.log(res);
        } else {
          alert(":( something goes wrong");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <div className="showcase-form card">
      <h2>Transfer Money To</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control box">
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
          </select>
        </div>
        <div className="form-control">
          <input
            id="amountTopay"
            type="number"
            name="amount"
            placeholder="Amount"
            required
          />
        </div>
        <input type="submit" value="Send" className="btn btn-primary" />
      </form>
    </div>
  );
}
