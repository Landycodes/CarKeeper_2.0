import React from "react";

export default function Alert({ msg, alert, disableAlert }) {
  const alertOff = () => {
    disableAlert(!alert);
  };
  return (
    <div id="alert">
      <div className="custom-alert">
        <span id="close" onClick={alertOff}>
          X
        </span>
        <h4 className="text-center"> {msg}</h4>
      </div>
    </div>
  );
}
