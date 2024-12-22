const ProductList = ({product,setProduct,products,setListProducts}) => {
    
const{nombre, referencia, precio, peso, categoria, stock} = product;
   const handleDelete =(id)=>{
    const requestInit={
        method:'DELETE'
    }
    fetch('http://localhost:3000/api/productos/' + id,requestInit)
    .then(response => response.json())
    .then(response => console.log(response));

    setListProducts(true);
   } 

   const handleUpdate=(id)=>{ 

    //validaciones de los datos 
    const parsedPrecio = parseInt(precio,10);
    const parsedPeso = parseInt(peso,10);
    const parsedStock = parseInt(stock,10);
   if(nombre === ''|| referencia === ''|| parsedPrecio <= 0 || parsedPeso <= 0 || categoria === ''|| parsedStock <= 0 ) {
       alert('Todos los campos son obligatorios');
       return;
   } 
    const requestInit={
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)

    }
  
            
    fetch('http://localhost:3000/api/productos/' + id,requestInit)
    .then(response => response.json())
    .then(response => console.log(response));

    //limpiar el formulario
    setProduct({
        nombre: '',
        referencia: '',
        precio: 0,
        peso: 0,
        categoria: '',
        stock: 0
     })
   } 
   
   
   
   
    return (  
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Referencia</th>
                    <th>Precio</th>
                    <th>Peso</th>
                    <th>Categoria</th>
                    <th>Stock</th>
                    
                </tr>
            </thead>
            <tbody>
                {products.map( product =>( 
                <tr key={product.id}>
                   <td>{product.id}</td>
                   <td>{product.nombre}</td>
                   <td>{product.referencia}</td>
                   <td>{product.precio}</td>
                   <td>{product.peso}</td>
                   <td>{product.categoria}</td>
                   <td>{product.stock}</td>
                   <td>
                    <div className="mb-3">
                        <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>

                    </div>
                    <div className="mb-3">
                        <button onClick={() => handleUpdate(product.id)} className="btn btn-primary">UPDATE</button>

                    </div>
                   </td>
                   
                  </tr>
                ))}
            

            </tbody>
        </table>
    );
}
 
export default ProductList;


     
   