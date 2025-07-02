import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { setupSocket } from './socket/socket';
import authRouter from './routes/auth';
import { config } from './config/config';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.frontendUrl,
    credentials: true
  }
});

app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/v1/auth", authRouter);
// app.use("/v1/worker", workerRouter);


setupSocket(io);


const PORT = config.port || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
