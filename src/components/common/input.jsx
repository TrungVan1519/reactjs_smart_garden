import React from "react";

const Input = ({ label, name, value, error, ...otherProps }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className="form-control"
        name={name}
        value={value}
        style={{ fontSize: 20 }}
        {...otherProps}
      />
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </div>
  );
};

export default Input;
