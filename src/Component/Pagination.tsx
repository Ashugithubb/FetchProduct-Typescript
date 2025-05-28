import React from "react";
import '../Style/Card.css';
interface pagei{
    currentPage:number;
    goToNextPage : ()=>void;
    goToPrevPage : ()=>void;
    handlePageChange: ()=>void;
    noOfPage:number
}
const Pagination:React.FC<pagei>= (props)=>{
return(
    <>
    <div className="pages">
        <div className="but">
        <button disabled ={props.currentPage ===0} className ="page" onClick={()=>{props.goToPrevPage()}} ><i className="fa-solid fa-arrow-left"></i></button>
        <button disabled={props.currentPage===0} onClick={props.goToPrevPage}>{props.currentPage-1}</button>
        
        <button className="main" onClick={props.handlePageChange}>{props.currentPage}</button>
        
        <button disabled={props.currentPage===props.noOfPage-1} onClick={props.goToNextPage}>{props.currentPage+1}</button>
        <button disabled={props.currentPage===props.noOfPage-1} className ="page" onClick={()=>{props.goToNextPage()}}><i className="fa-solid fa-arrow-right"></i></button>
     </div>

</div>
    </>
)
}
export default Pagination;