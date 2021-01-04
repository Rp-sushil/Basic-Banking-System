import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Customer({ moneyTransfered, setMoneyTransfered }) {
  const { customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getCustomerDetails = () => {
    axios.get(`http://localhost:5050/customers/${customerId}`).then((res) => {
      setCustomerDetails(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getCustomerDetails();
    setMoneyTransfered(false);
  }, [customerId, moneyTransfered]);

  return (
    <div className="customer-details-card">
      {isLoading && <strong>Loading....</strong>}
      {!isLoading && (
        <>
          <h3>----Account Details----</h3>
          <strong>
            Name: <span>{customerDetails.name}</span>
          </strong>
          <br />
          <strong>
            Email: <span>{customerDetails.email}</span>
          </strong>
          <br />
          <strong>
            Balance: <span>{customerDetails.balance}</span>
          </strong>
        </>
      )}
    </div>
  );
}
