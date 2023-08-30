import { ProductManager } from './src/productManager.js'

export async function test(){
  try {
      const tecnology = new ProductManager();
      const prod1 = {
          title: 'Iphone 12',
          desc: 'Iphone nuevo',
          price: '980USD',
          thumbnail: 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg',
          stock: '10',
          code: '0111'
      };
      const prod2Errrorcode = {
          title: 'Iphone 6',
          desc: 'Iphone nuevo',
          price: '980USD',
          thumbnail: 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg',
          stock: '10',
          code: '0111'
      };
      const prod2ErrrorMissing = {
          title: 'Iphone 6',
          desc: 'Iphone nuevo'
      };
      const prod2 = {
          title: 'Iphone 11',
          desc: 'Iphone nuevo',
          price: '980USD',
          thumbnail: 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg',
          stock: '10',
          code: '0222'
      };
      const prod1Modify = {
          title: 'Iphone 12',
          desc: 'modificado',
          price: '1000USD',
          thumbnail: 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg',
          stock: '3',
          code: '0000'
      };
      // no se puede enviar varios productos juntos porque el id va a ser el mismo ya que busca segun el largo del array,
      // como se guarda con promesa no se llega a guardar el primero antes del segundo
      // si es un id random si se puede
  
      // console.log(tecnology.addProduct(prod1));
      // console.log(tecnology.addProduct(prod2Errrorcode));
      // console.log(tecnology.addProduct(prod2ErrrorMissing));
      // console.log(tecnology.addProduct(prod2));
      // console.log('----------- productos -----------');
      console.log(tecnology.getProducts());
      // console.log('----------- producto con id 1 -----------');
      // console.log(await tecnology.getProductById(1));
      // console.log(await tecnology.updateProduct(2, prod1Modify ));
      // console.log(await tecnology.getProductById(10));
  } catch (error) {
      console.log(error);
  }
}

test();
