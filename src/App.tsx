import { useEffect, useState } from 'react'
import axios from 'axios'; 
import Card from './Component/Card';
import Pagination from './Component/Pagination';
import './App.css'
import './Style/Card.css';
interface products {
  id: number;
  title:string;
  price: number;
  rating: number;
  thumbnail:string; 
}

function App() {
  const [data, setData] = useState<products[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    const localdata = localStorage.getItem('products');
    if(localdata ){
      const j  = JSON.parse(localdata)
      setData(j);
      setLoading(false);
    }
    else{
    axios.get(import.meta.env.VITE_URL)
    .then((res)=>{
      setData(res.data.products);
      setLoading(false);
      console.log(res.data.products);
      localStorage.setItem('products',JSON.stringify(res.data.products));
    })
    .catch((err) =>{
      setError(err.message);
      setLoading(false);
    });}
  }, []);
  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error: {error}</div>;

 const PAGE_SIZE = 10;
  const totalProducts = data.length;
  const noOfPage = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  function handlePageChange() {
    setCurrentPage((prev) => prev);
  }
  function goToNextPage() {
    setCurrentPage((prev) => prev + 1);
  }
  function goToPrevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  return data.length==0 ? (<h1>Not able to fetch data</h1>) : (

    <>
    <h1>All Products</h1>
      <div className="card">
        {data.slice(start, end).map((item) => (
          <Card key={item.id}
            thumbnail/* .box{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  width: 350px;
  height: 350px;
  background-color: rgba(92, 117, 117,.0.5);
} */={item.thumbnail}
            title={item.title}
            price={item.price}
            rating={item.rating} />

        ))}
      </div>
      <Pagination currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        handlePageChange={handlePageChange}
        noOfPage={noOfPage}
      />
    </>
  )}
export default App
