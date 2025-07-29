import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();

interface CartItem {
  sku: string;
  qty: number;
  price: number;
}

interface CheckoutRequest {
  cart: CartItem[];
  customer?: any;
}

interface OrderResponse {
  orderId: string;
  total: number;
  createdAt: string;
}

/**
 * POST /api/checkout
 * Body: { cart: [{ sku, qty, price }], customer: {...} }
 * Returns: { orderId, total, createdAt }
 */
router.post('/', (req: Request<{}, OrderResponse, CheckoutRequest>, res: Response<OrderResponse>) => {
  const { cart = [] } = req.body;

  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const order: OrderResponse = {
    orderId: uuidv4(),
    total,
    createdAt: new Date().toISOString()
  };

  // TODO: Persist to DB in a future iteration.
  return res.status(201).json(order);
});

export default router; 