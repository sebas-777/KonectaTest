import React from 'react';

const FormProducts = ({product, setProduct, addProduct}) => {  

    const{nombre, referencia, precio, peso, categoria, stock} = product;

        const handleChange = (event) =>{
            setProduct({ 
                ...product,
                [event.target.name]: event.target.value
            })

        }

        const handleSubmit = (event) => { 
           event.preventDefault();

            //validaciones de los datos 
            const parsedPrecio = parseInt(precio,10);
            const parsedPeso = parseInt(peso,10);
            const parsedStock = parseInt(stock,10);
           if(nombre === ''|| referencia === ''|| parsedPrecio <= 0 || parsedPeso <= 0 || categoria === ''|| parsedStock <= 0 ) {
               alert('Todos los campos son obligatorios');
               return;
           } 

           // consulta 
           const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
           }
         fetch('http://localhost:3000/api/productos',requestInit)
         .then(response => {
            if(!response.ok){
                throw Error('Error en la respuesta del servidor');
            }
            return response.json();
         })
         .then(response => {
            console.log(response);
            alert('Producto creado correctamente');

            addProduct(response);

           
         })
         .catch(error =>{
            console.error('Error:',error);
            alert('Error al crear el producto');
         });
         


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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input name="nombre" onChange={handleChange} type="text" className="form-control" id="nombre"  value={nombre}/>
            </div>
            <div className="mb-3">
                <label htmlFor="referencia" className="form-label">Referencia</label>
                <input name="referencia" onChange={handleChange} type="text" className="form-control" id="referencia" value={referencia} />
            </div>
            <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input name="precio" onChange={handleChange} type="number" className="form-control" id="precio" value={precio} />
            </div>
            <div className="mb-3">
                <label htmlFor="peso" className="form-label">Peso</label>
                <input name="peso" onChange={handleChange} type="number" className="form-control" id="peso" value={peso} />
            </div>
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoria</label>
                <input name="categoria" onChange={handleChange} type="text" className="form-control" id="categoria" value={categoria} />
            </div> 
            <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input name="stock" onChange={handleChange} type="number" className="form-control" id="stock" value={stock} />
            </div> 
            <button type="submit" className="btn btn-primary">Guardar</button> 
        </form>
     );
}
 
export default FormProducts;