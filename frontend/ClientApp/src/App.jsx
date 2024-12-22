import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import ProductList from './Components/ProductList';
import FormProducts from './Components/FormProducts';

function App() {
  
  const [product, setProduct] = useState({
    nombre:'',
    referencia:'',
    precio:0,
    peso:0,
    categoria:'',
    stock:0
  });

  const[products, setProducts] = useState([]);

  const [listproducts, setListProducts] = useState(false);

  useEffect(() => {
      const getProducts =()=>{
         fetch('http://localhost:3000/api/productos')
         .then(response => response.json())
         .then(response => setProducts(response));
         
      }  
      getProducts();
      setListProducts(false);
  }, [setListProducts]);

  const addProduct = (newProduct)=>{
    setProducts(prevProducts =>[...prevProducts,newProduct]);
  };
  

  return (
    <>
      <NavBar brand="KONECTA" />
        <div className='container'>
          <div className='row'>
            <div className='col-7'>
              <h2 style={{textAlign:'center;'}}>LIST PRODUCTS</h2>
              <ProductList product={product} setProduct={setProduct} products={products} setListProducts={setListProducts}/>

            </div>
            <div className='col-5'>
            <h2 style={{textAlign:'center;'}}>PRODUCTS FORM</h2>
              <FormProducts product={product} setProduct={setProduct} addProduct={addProduct}/>
            </div>
          </div>

      </div>
    </>
  )
}

export default App
