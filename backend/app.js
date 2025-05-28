// src/app.js
import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import bodyParser from 'body-parser'

const app = express();



app.use(express.json());
// Increase payload size limit
app.use(bodyParser.json({ limit: '5mb' })); // Adjust the limit as per your need
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))


// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
  
  
  

export default app;
