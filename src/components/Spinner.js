import React from "react";
import { PropagateLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PropagateLoader color="#0047ff" />
    </div>
  );
};

export default Spinner;
