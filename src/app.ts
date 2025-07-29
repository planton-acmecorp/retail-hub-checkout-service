import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import checkoutRoutes from './routes/checkout';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    service: 'ACME Corp RetailHub - Checkout Service',
    version: '0.1.0',
    description: 'A lightweight Node.js Express API that handles order check-out for RetailHub',
    endpoints: {
      health: '/health',
      healthz: '/healthz',
      checkout: '/api/checkout'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/checkout', checkoutRoutes);

app.listen(PORT, () =>
  console.log(`Checkout‑service listening on port ${PORT}`)
); 