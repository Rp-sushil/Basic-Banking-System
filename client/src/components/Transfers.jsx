import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Transfers() {
  const [transactionsDetails, setTransactionsDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getTransactionsDetails = () => {
    axios
      .get("/transfers?limit=7")
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
    <div className="customer-table">
      {isLoading && <strong>Loading</strong>}
      {!isLoading && (
        <>
          <h2>Colored Table Header</h2>
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
        </>
      )}
    </div>
  );
}
