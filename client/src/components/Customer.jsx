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
    <div className="customer">
      {isLoading && <strong>Loading....</strong>}
      {!isLoading && (
        <>
          <h3>{customerDetails.name}</h3>
          <span>{customerDetails.email}</span>
          <span>{customerDetails.balance}</span>
        </>
      )}
    </div>
  );
}
