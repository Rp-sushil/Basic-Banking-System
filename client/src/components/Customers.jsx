import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Customer from "./Customer";
import Form from "./Form";

export default function Customers() {
  const [customersData, setCustomersData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [moneyTransfered, setMoneyTransfered] = useState(true);

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
  }, []);

  let { path, url } = useRouteMatch();
  return (
    <div className="customers">
      {isLoading && <strong>Loading</strong>}
      {!isLoading && (
        <>
          <h2>Customer</h2>
          <ul>
            {customersData.map((customer, i) => {
              return (
                <li key={customer.name + i}>
                  <Link to={`${url}/${customer.id}`}>{customer.name}</Link>
                </li>
              );
            })}
          </ul>
          <Switch>
            <Route exact path={path}>
              <h3>Please select a customer.</h3>
            </Route>
            <Route path={`${path}/:customerId`}>
              <Customer
                moneyTransfered={moneyTransfered}
                setMoneyTransfered={setMoneyTransfered}
              />
              <Form
                customersData={customersData}
                setMoneyTransfered={setMoneyTransfered}
              />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}
