import React from "react";

export default function Customer({ name, email, balance }) {
  return (
    <div className="customer">
      <strong style={{ backgroundColor: "black", color: "white" }}>
        {name}
      </strong>
      <br></br>
      <i>{email}</i>
      <br></br>
      <strong>{balance}</strong>
    </div>
  );
}
