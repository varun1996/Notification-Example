import React from "react";

const Notification = ({ message, type }) => (
  <>
    <span>{message}</span>
    <span>{type}</span>
  </>
);

export default Notification;
