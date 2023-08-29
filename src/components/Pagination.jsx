import React, { useContext } from "react";
import { AppContext } from "../AppState";

const Pagination = () => {
  const { nextPage, PrevPage } = useContext(AppContext);
  return (
    <div>
      <button onClick={PrevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
