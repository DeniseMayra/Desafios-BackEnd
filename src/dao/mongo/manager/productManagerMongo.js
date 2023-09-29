import { productModel } from '../models/product.model.js';

export class ProductManagerMongo {
  constructor() {
    this.model = productModel;
  };

  addProduct = async(object) => { 
    try{
      const result = await this.model.create(object);
      return result;

    } catch (error) {
      console.log('ERROR: ', error.message);
      throw new Error('No se puede crear el producto');
    }
  }

  getProducts = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      console.log('ERROR: ', error.message);
      throw new Error('No se puede obtener los productos');
    }
  }

  getProductById = async(id) => {
    try{
      const result = await this.model.findById(id);
      return result;

    } catch (error) {
      console.log('ERROR: ', error.message);
      throw new Error('No se puede obtener el producto');
    }
  }

  updateProduct = async (id, objectModify) => {
    try {
      // new:true me devuelve el producto ya modificado
      // si paso un solo dato tendria que hacer .updateOne({_id:id}, {$set filtrado}) porque findeandup se actualiza todo el doc, hay que pasar todos los datos
      const result = await this.model.findByIdAndUpdate( id, objectModify, {new:true});
      if (!result){
        throw new Error('No se puede encontrar el producto');
      }
      return result;

    } catch (error) {
      console.log('ERROR: ', error.message);
      throw new Error('No se puede actualizar el producto');
    }
  }

  deleteProduct = async (id) => {
    try{
      const result = await this.model.findByInAndDelete(id);
      if (!result){
        throw new Error('No se puede encontrar el producto');
      }
      return result;

    } catch (error){
      console.log('ERROR: ', error.message);
      throw new Error('No se puede eliminar el producto');
    }
  }
};

