import React from "react";
import "./../assets/css/History.css";

function History(props) {
  let { index, his, date, info } = props;
  return (
    <div {...props} className="row" style={{ backgroundColor: "#DDD" }}>
      {info !== "wrong name" ? (
        <div className="haveCity">
          {index + 1}. {his} : &nbsp; <span>{date}</span>
        </div>
      ) : (
        <div className="unknowCity">
          {index + 1}. {his} : &nbsp; <span>{date}</span>
        </div>
      )}
    </div>
  );
}

export default History;
