import { Router } from 'express';
import { ProductManager } from '../managers/ProductManager.js';
import { io } from '../server.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  const newProduct = await manager.addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const updated = await manager.updateProduct(req.params.pid, req.body);
  updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
  const deleted = await manager.deleteProduct(req.params.pid);
  deleted ? res.sendStatus(204) : res.status(404).json({ error: 'Producto no encontrado' });
});


router.post('/', async (req, res) => {
  const newProduct = await manager.addProduct(req.body);
  const products = await manager.getProducts();
  io.emit('products', products); 
  res.status(201).json(newProduct);
});

router.delete('/:pid', async (req, res) => {
  const deleted = await manager.deleteProduct(req.params.pid);
  const products = await manager.getProducts();
  io.emit('products', products); 
  deleted ? res.sendStatus(204) : res.status(404).json({ error: 'Producto no encontrado' });
});


export default router;
