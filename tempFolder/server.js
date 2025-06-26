import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { webhookHandler , clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './Routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';



// Initialize Express
const app = express();

// Connect to DB
await connectDB();
await connectCloudinary()

// Middlewares
app.use(express.json()); // should come before other middlewares that rely on parsed body
app.use(cors());
app.use(clerkMiddleware());





// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.post('/api/webhooks', webhookHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
