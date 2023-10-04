import { Router } from 'express';
import { ProductManager } from '../dao/fileSystem/manager/productManager.js';

const viewRouter = Router();
const tecnology = new ProductManager('../files/products.json');

viewRouter.get('/', async (req,res) => {
  try{
    const products = await tecnology.getProducts();
    res.render('home', {data: products});
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

viewRouter.get('/realTimeProducts', async (req,res) => {
  try{
    const products = await tecnology.getProducts();
    const objToSend = {
      data: products,
      isAdmin: true
    }
    res.render('realTimeProducts', objToSend);
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});


export { viewRouter };
