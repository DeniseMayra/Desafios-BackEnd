import { Router } from 'express';
import { ProductManager } from '../dao/fileSystem/productManager.js';

const router = Router();
const tecnology = new ProductManager('../files/products.json');

router.get('/', async (req, res) => {
  try{
    const products = await tecnology.getProducts();
    const limit = req.query.limit;
    if (limit){
      res.json({data: products.slice(0, limit)});
    } else {
      // res.send(products);
      res.json({data: products});
    }
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

router.get('/:pid', async(req, res) => {
  try{
    res.json(await tecnology.getProductById(req.params.pid));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

router.post('/', async(req,res) => {
  try{
    res.json(await tecnology.addProduct(req.body));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
})

export { router as productsRouter};
