import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const filePath = path.resolve('data/carts.json');

export class CartManager {
  async getCarts() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: crypto.randomUUID(), products: [] };
    carts.push(newCart);
    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const existing = cart.products.find(p => p.product === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}
