const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './files/products.json';
    }

    addProduct = async(object) => { 
        try{
            if (object.title && object.desc && object.price && object.thumbnail && object.stock && object.code) {
                if (this.isValidCode(object.code)){
                    if (!object.id){
                        object = {
                            ...object, id: this.createId()
                        };
                    }
                    const products = this.getProducts();
                    products.push(object);
                    fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return {error: false, msg:`Archivo creado Correctamente con id: ${object.id}`};
                } else {
                    return {error: true, msg:`Error: Codigo ${object.code} ya existente`};
                }
            } else {
                return {error: true, msg:'Faltan datos'};
            } 
        } catch (error) {
            console.log('ERROR: ', error.message);
        }
    }

    isValidCode = (code) => {
        const products = this.getProducts();
        const product = products.find(ele => ele.code === code);
        if (product) {
            return false;
        } else {
            return true;
        }
    }
    createId = () => {
        let number = 1;
        const products = this.getProducts();
        while (!this.isValidId(products.length + number)){
            number++;
        }
        return products.length + number;
    }
    isValidId = (id) => {
        const products = this.getProducts();
        const product = products.find(ele => ele.id === id);
        if (product) {
            return false;
        } else {
            return true;
        }
    }

    getProducts = () => {
        let products = fs.readFileSync(this.path, 'utf-8');
        if (products === '') {
            return [];
        } else {
            return JSON.parse(products);
        }
    }

    getProductById = (id) => {
        const products = this.getProducts();
        const productById = products.find(ele => ele.id === id);

        if (productById){
            return productById;
        } else {
            return `Not Found - id: ${id}`;
        }
    }

    updateProduct = async (id, objectModify) => {
        try {
            const deleteResponse = await this.deleteProduct(id);
            if (!deleteResponse.error){
                objectModify = {...objectModify, id: id};
                const response = await this.addProduct(objectModify);
                if (!response.error){
                    return {error: false, msg:`Archivo modificado Correctamente`};
                } else {
                    return {error: true, msg:'Hubo un error'};
                }
            }
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (id) => {
        try{
            let products = this.getProducts();
            products = products.filter(prod => prod.id !== id);

            fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'));
            return {error: false, msg:`Producto con id "${id}" eliminado correctamente`};
        } catch (error){
            throw error;
        }
    }
}

async function test(){
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
        // console.log(tecnology.getProducts());
        // console.log('----------- producto con id 1 -----------');
        // console.log(await tecnology.getProductById(1));
        // console.log(await tecnology.updateProduct(2, prod1Modify ));
        // console.log(await tecnology.getProductById(10));
    } catch (error) {
        console.log(error);
    }
}

test();
