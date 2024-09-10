import React from "react";

const Navbar = ({ inputValue, handleInputValue }) => {
  return (
    <nav>
      <div className="mb-5 flex items-end justify-end w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={handleInputValue}
          className="px-3 py-2  w-full lg:w-[20vw] outline-none rounded"
        />
      </div>
    </nav>
  );
};

export default Navbar;
