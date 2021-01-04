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
    <section className="showcase">
      {isLoading && <strong>Loading</strong>}
      {!isLoading && (
        <div className="container grid">
          <div className="dropdown">
            <h2>Transfer Money From</h2>
            <button className="dropbtn btn">Customers</button>
            <div className="dropdown-content">
              {customersData.map((customer, i) => {
                return (
                  <Link key={customer.name + i} to={`${url}/${customer.id}`}>
                    {customer.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <Switch>
            <Route exact path={path}></Route>
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
        </div>
      )}
    </section>
  );
}
