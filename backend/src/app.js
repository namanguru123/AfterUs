import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js'
import assetRoutes from './routes/asset.routes.js'






const app = express();

app.use(helmet());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try again later.'
})

app.use(limiter)

app.use(express.json({ limit: '10kb' }))

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.get('/', (req, res) => {
    res.json({
        status: "ok",
        message: "API is running",
        timestamp: new Date()
    })
})

app.use('/api/assets', assetRoutes)

export default app;