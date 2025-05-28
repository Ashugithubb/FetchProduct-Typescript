import React from "react";
import '../Style/eCard.css';
interface Items{
  title:string;
  price: number;
  rating: number;
  thumbnail:string;  
}
const Card: React.FC<Items> = (props)=>{
return(
<><div className="box">
<div className="container">
    <div id="img">
    <img style= {{width:"360px",height:"300px"}}src={props.thumbnail} alt="productimage"/>
  </div>
    <div className="detail">
        <h5>{props.title}</h5>
        <h5><i className="fa-solid fa-indian-rupee-sign"></i>{props.price}</h5>
        <h6>{props.rating}/5</h6>
    </div>
    
</div>
</div>
</>);
}
export default Card;