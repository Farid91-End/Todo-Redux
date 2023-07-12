import React from "react";

const Button = ({ title, handleClick }) => {
  return (
    <button className="bg-slate-500 m-2 p-2 rounded-md" onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
