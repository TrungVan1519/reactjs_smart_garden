import React from "react";
import PropTypes from "prop-types";
import { FaPowerOff } from "react-icons/fa";

const CustomButton = ({ id, customButton, onClick }) => {
  const getClasses = () => {
    if (customButton.isActive) {
      return "custom-btn active";
    } else {
      return "custom-btn";
    }
  };

  return (
    <div id={id} className={getClasses()} onClick={() => onClick(customButton)}>
      <FaPowerOff />
      <p>{customButton.label}</p>
    </div>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  customButton: PropTypes.object.isRequired,
};

export default CustomButton;
