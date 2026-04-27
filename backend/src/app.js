import express from 'express';
import cors from 'cors';
import passport from './config/passport.js';


import authRoutes from './routes/auth.routes.js';
import roomRoutes from './routes/room.routes.js'

const app = express();

const url = process.env.FRONTEND_URL;
app.use(cors({
    origin: url,
    credentials: true
}));

app.use(express.json());
app.use(passport.initialize());


app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
export default app;