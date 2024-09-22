import express from 'express';
import morgan from 'morgan';

const app = express();

// ... existing middleware ...

app.use(morgan('combined')); // Centralized logging

// ... existing routes and error handling ...