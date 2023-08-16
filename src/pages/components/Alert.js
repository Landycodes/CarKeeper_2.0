import React from "react";

export default function Alert({ msg, alert, disableAlert }) {
  const alertOff = () => {
    disableAlert(!alert);
  };
  return (
    <div id="alert">
      <div className="custom-alert">
        <h4 className="text-center p-1 pb-3"> {msg}</h4>

        <button
          type="button"
          // id="close"
          className="btn btn-danger w-25"
          onClick={alertOff}
        >
          OK
        </button>
      </div>
    </div>
  );
}
