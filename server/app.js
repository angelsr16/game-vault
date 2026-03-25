import './config.js';
import connectToDatabase from "./database/mongodb.js";
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middlewares/error.middleware.js";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(
    cors({
        origin: [`http://localhost:3000`],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.set("trust proxy", 1);

// Apply rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req) => (req.user ? 1000 : 150),
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req) => ipKeyGenerator(req.ip),
});

app.use(limiter);

app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('API running');
});

app.listen(process.env.PORT, async () => {
    console.log(process.env.PORT)
    console.log(`Server running on http://localhost:${process.env.PORT}`);

    await connectToDatabase();
});