// src/app.js
import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import bodyParser from 'body-parser'
import cors from 'cors';

const app = express();



// Allow only your frontend origin
// const allowedOrigins = ['https://jacasproject.onrender.com'];
const allowedOrigins = ['https://global-venture.onrender.com'];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if using cookies
}));

app.use(express.json());
// Increase payload size limit
app.use(bodyParser.json({ limit: '5mb' })); // Adjust the limit as per your need
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))


// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
  
  
  

export default app;
