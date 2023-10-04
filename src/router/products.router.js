import { Router } from 'express';
import { ProductManager } from '../dao/fileSystem/manager/productManager.js';
import { ERROR, SUCCESS } from '../clases/constant.js';


const router = Router();
const manager = new ProductManager('./src/dao/fileSystem/files/products.json');

router.get('/', async (req,res) => {
  try{
    const products = await manager.getProducts();
    const limit = req.query.limit;
    if (limit){
      res.json({status: SUCCESS, data: products.slice(0, limit), message: ''});
    } else {
      res.json({status: SUCCESS, data: products, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.get('/:pid', async (req, res) => {
  try{
    const result = await manager.getProductById(req.params.pid);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.post('/', async(req,res) => {
  try{
    const result = await manager.addProduct(req.body);

    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

router.put('/:pid', async(req,res) => {
  try{
    const result = await manager.updateProduct(req.params.pid, req.body);

    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }
  
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

router.delete('/:pid', async(req,res) => {
  try{
    const result = await manager.deleteProduct(req.params.pid);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }
  
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

export { router as productRouter };
