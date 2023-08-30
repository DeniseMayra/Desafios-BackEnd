import express from 'express';
import { ProductManager } from './productManager.js';

const port = 8080;
const app = express();
app.use(express.urlencoded({extended:true}));

const tecnology = new ProductManager();


app.get('/products', (req, res) => {
  const products = tecnology.getProducts();
  const limit = req.query.limit;
  if (limit){
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const managerResponse = tecnology.getProductById(parseInt(req.params.pid));
  if (managerResponse.error){
    res.send(`Not Found product with id ${req.params.pid}`);
  } else {
    res.send(managerResponse.product);
  }
});

app.listen(port, () => console.log('Servidor funcionando en el puerto ' + port));
