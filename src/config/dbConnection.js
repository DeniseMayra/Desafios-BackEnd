import mongoose from 'mongoose';

const url = 'mongodb+srv://lade:AAPxiDVBiZRr5F2s@mycluster.xnib3fr.mongodb.net/ecommerceDB?retryWrites=true&w=majority';

export const connectDB = async() => {
  try{
    await mongoose.connect(url);
    console.log('DB conectada correctamente');
  } catch (error){
    console.log(error.message);
  }
};