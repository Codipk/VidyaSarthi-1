import React from "react";

const HighLightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-r from-blue-100 via-yellow-100 to-blue-50 inline-block text-transparent bg-clip-text">
      {" "}
      {text}
    </span>
  );
};

export default HighLightText;
