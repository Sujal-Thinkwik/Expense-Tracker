import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { testConnection } from "./src/config/database.js";
dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 5000);
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
const startServer = async () => {
    const dbConnected = await testConnection();
    if (!dbConnected) {
        console.warn("Server started without a PostgreSQL connection.");
    }
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};
startServer();
