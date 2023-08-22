class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct = (title, desc, price, thumbnail, stock, code) => {
        if (title && desc && price && thumbnail && stock && code) {
            if (this.isValidCode(code)){
                this.id++;
                const object = {
                    title, description: desc, price, thumbnail, stock, code, id: this.id
                };
                this.products.push(object);
                console.log('Creado correctamente');
            } else {
                console.log('Error: Codigo ya existente');
            }
        } else {
            console.log('Faltan datos');
        }
    }

    isValidCode = (code) => {
        const product = this.products.find(ele => ele.code === code);
        if (product) {
            return false;
        } else {
            return true;
        }
    }

    getProducts = () => {
        return this.products;
    }
    
    getProductById = (id) => {
        const product = this.products.find(ele => ele.id === id);
        if (product){
            return product;
        } else {
            console.log(`Not Found - id: ${id}`);
        }
    }
}

const tecnology = new ProductManager();

console.log(tecnology.getProducts());
tecnology.addProduct('Iphone 12', 'Iphone nuevo', '980USD', 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg', '10', '0111');
tecnology.addProduct('i[hone15');
tecnology.addProduct('Iphone 6', 'Iphone nuevo', '980USD', 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg', '10', '0111');
tecnology.addProduct('Iphone 11', 'Iphone nuevo', '980USD', 'https://www.macstation.com.ar/img/productos/2493-2317-1.jpg', '10', '0222');
console.log('----------- productos -----------');
console.log(tecnology.getProducts());
console.log('----------- producto con id 1 -----------');
console.log(tecnology.getProductById(1));
tecnology.getProductById(10);
