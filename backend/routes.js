const express = require('express');
const router = express.Router();
const validateProduct = require('./validators/productValidator');


// Obtener todos los productos 
router.get('/productos',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.status(500).send(err);
            conn.query('SELECT * FROM productos',(err,rows)=>{ 
                if(err) return res.send(err);
                res.json(rows);
            });
    });
});

//Crear un nuevo producto
router.post('/productos',validateProduct, (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
            conn.query('INSERT INTO productos set ? ',[req.body],(err)=>{ 
                if(err) return res.status(500).send(err);
                res.status(201).send('Producto Guardado');
            });
    });
});

//Eliminar un producto
router.delete('/productos/:id', (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.status(500).res.send(err);
            conn.query('DELETE FROM productos WHERE id = ? ',[req.params.id],(err)=>{ 
                if(err) return res.status(500).res.send(err);
                res.send('Producto Borrado');
            });
    });
});  

//Actualizar un producto 
router.put('/productos/:id',validateProduct,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.status(500).send(err);
            conn.query('UPDATE  productos set ? WHERE id = ?',[req.body,req.params.id],(err)=>{ 
                if(err) return res.status(500).send(err); 
                res.send('Producto Actualizado');
            });
    });
})

//Modulo de ventas 
router.post('/ventas',(req,res) =>{
    const {producto_id,cantidad} = req.body;

    req.getConnection((err,conn)=>{ 
        if(err) return res.status(500).send(err);
         
    // verificar stock antes de realizar la venta
    conn.query('SELECT stock FROM productos WHERE id = ? ',[producto_id],(err,rows)=>{
        if(err || rows.length === 0 || rows[0].stock < cantidad) {
            return res.status(400).send('Stock insuficiente o producto no encontrado.');
        }

       // Actualizar el stock después de la venta
       const newStock  = rows[0].stock - cantidad;
       conn.query('UPDATE productos SET stock = ? WHERE id = ?',[newStock,producto_id],(err)=>{
            if(err) return res.status(500).send(err);        
       
            //Registrar la venta 
            conn.query('INSERT INTO ventas (producto_id,cantidad) VALUES(?,?)',[producto_id,cantidad],(err)=>{ 
                    if(err) return res.status(500).send(err);
                    res.send('Venta registrada correctamente');
            });
       
        }); 

    });
  });     
});

module.exports = router