import React from "react";

const Button = ({ label }) => {
  return (
    <div className="text-right">
      <button className="btn btn-primary" style={{ fontSize: 20 }}>
        {label}
      </button>
    </div>
  );
};

export default Button;
