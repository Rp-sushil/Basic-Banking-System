import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Customers() {
  const [customersData, setCustomersData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const getCustomersData = () => {
    axios
      .get("http://localhost:5050/customers")
      .then((res) => {
        setCustomersData(res.data);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCustomersData();
  });

  return (
    <div className="customers">
      {isLoading && <strong>Loading</strong>}
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((customer, i) => {
              return (
                <tr key={i}>
                  <td>{customer.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
