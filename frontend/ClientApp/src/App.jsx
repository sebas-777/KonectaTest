import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import ProductList from './Components/ProductList';

function App() {
  
  const[products, setProducts] = useState([]);

  useEffect(() => {
      const getProducts =()=>{
         fetch('http://localhost:3000/api/productos')
         .then(response => response.json())
         .then(response => console.log(response));
         
      }  
      getProducts();
  }, []);

  return (
    <>
      <NavBar brand="KONECTA" />
        <div className='container'>
          <div className='row'>
            <div className='col-7'>
              <h2 style={{textAlign:'center;'}}>LIST PRODUCTS</h2>
              <ProductList/>

            </div>
            <div className='col-5'>
            <h2 style={{textAlign:'center;'}}>PRODUCTS FORM</h2>
            </div>
          </div>

      </div>
    </>
  )
}

export default App
