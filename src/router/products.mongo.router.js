import { Router } from 'express';
import { productsService } from '../dao/mongo/services.js';

const router = Router();

router.get('/', async (req, res) => {
  try{
    const result = await productsService.getProducts();
    res.json({status:'success', data: result});
   
  } catch (error) {
    res.status(500).json({stauts:'error', message: error.message});
  }
});

// router.get('/:pid', async(req, res) => {
//   try{
//     res.json(await tecnology.getProductById(req.params.pid));
//   } catch (error) {
//     console.log('ERROR: ', error.message);
//   }
// });

// router.post('/', async(req,res) => {
//   try{
//     res.json(await tecnology.addProduct(req.body));
//   } catch (error) {
//     console.log('ERROR: ', error.message);
//   }
// })

export { router as productsRouterMongo};
