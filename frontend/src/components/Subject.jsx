import React from "react";
import { Link } from "react-router-dom";

const Subject = ({ title, credits, id }) => {
  return (
    <Link to={`/subject/${id}`}>
      <div className="bg-dark text-white p-5">
        <h4>{title}</h4> <p>{credits} credits</p>
      </div>
    </Link>
  );
};

export default Subject;
