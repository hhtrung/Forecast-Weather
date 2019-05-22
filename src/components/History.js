import React from 'react';
import './../assets/css/History.css';

function History(props){
    let {index, his, date} = props;
    return(
        <div {...props} className="row" style={{backgroundColor: "#DDD"}}>
              {index+1}. {his}  :  <div style={{fontSize: "20px",padding:"3px"}}>{date}</div>
        </div>
    )
}

export default History;
