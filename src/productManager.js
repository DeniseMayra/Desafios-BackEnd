import fs from 'fs';

export class ProductManager {
    constructor() {
        this.path = '../files/products.json';
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
            return {error: false, product: productById};
        } else {
            return {error: true, product: null};
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

