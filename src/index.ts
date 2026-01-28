import express, { Request, Response } from 'express';
import cors from 'cors';
import { query } from './db';
import { signin, signup } from './auth';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.get('/', (req, res) =>{
  res.send('Restuarant API is running');
})
// 1. Products (Added /api to match your client.ts)
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM Products ORDER BY category ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. Auth (Fixed the missing leading slashes)
app.post('/api/signup', signup);
app.post('/api/signin', signin);

// 3. Orders
app.post('/api/orders', async (req: Request, res: Response) => {
  const { userId, total, items } = req.body;

  try {
    await query('BEGIN');

    const orderResult = await query(
      'INSERT INTO Orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [userId || null, total, 'pending']
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await query(
        'INSERT INTO OrderItems (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [orderId, item.id, item.quantity]
      );
    }

    await query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    await query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// --- SERVER START ---
// We use '0.0.0.0' to allow connections from your Wi-Fi (phone)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live!`);
  console.log(` Local: http://localhost:${PORT}`);

});