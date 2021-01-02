import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Transfers() {
  const [transactionsDetails, setTransactionsDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getTransactionsDetails = () => {
    axios
      .get("http://localhost:5050/transfers")
      .then((res) => {
        console.log(res.data);
        setTransactionsDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTransactionsDetails();
  }, []);

  return (
    <div className="customers">
      {isLoading && <strong>Loading</strong>}
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Transaction_at</th>
            </tr>
          </thead>
          <tbody>
            {transactionsDetails.map((tran, i) => {
              return (
                <tr key={i}>
                  <td>{tran.paidfrom}</td>
                  <td>{tran.paidto}</td>
                  <td>{tran.amount}</td>
                  <td>{tran.transaction_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
