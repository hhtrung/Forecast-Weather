import React from "react";
import "./../assets/css/History.css";

interface Props{
  key: number,
  index: number,
  his: any[],
  date: string,
  info: any,
  onClick: any
}

function History(props:Props) {
  let { index, his, date, info } = props;
  return (
    <div {...props} style={{ backgroundColor: "#DDD" }}>
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
