import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('data/products.json');

export class ProductManager {
  async getProducts() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newId = crypto.randomUUID();
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updatedProduct = { ...products[index], ...updates, id };
    products[index] = updatedProduct;
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return updatedProduct;
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length === initialLength) return false;
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return true;
  }
}
