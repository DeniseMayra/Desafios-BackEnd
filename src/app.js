import express from 'express';
import { productRouter } from './router/products.router.js';
import { viewRouter } from './router/view.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import path from 'path';
import { Server } from 'socket.io';
import { ProductManager } from './dao/fileSystem/manager/productManager.js';
import { connectDB } from './config/dbConnection.js';
import { productsRouterMongo } from './router/products.mongo.router.js';

const isDBSystem = false;
const tecnology = new ProductManager('../files/products.json');

// ---------- CONFIG ----------
const port = 8080;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// ---------- ROUTES ----------
if (isDBSystem) {
  connectDB();
  app.use('/api/products', productsRouterMongo);
} else {
  app.use('/api/products', productRouter);
}
app.use('/', viewRouter);


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


// ---------- SERVER ----------
const httpServer = app.listen(port, () => console.log('Servidor funcionando en el puerto ' + port));
export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  console.log('usuario: ' + socket.id);

  socket.on('newProduct', async (data) => {

    if (!isDBSystem){
      const response = await tecnology.addProduct(data);
      
      if (!response.error){
        const products = await tecnology.getProducts();
  
        socketServer.emit('update', products);
      }
    }

  })

})

