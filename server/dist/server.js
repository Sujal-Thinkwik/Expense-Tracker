import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { testConnection } from "./src/config/database.js";
import { ensureUsersTableExists } from "./src/services/user.service.js";
import authRoutes from "./src/routes/auth.routes.js";
dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 5000);
const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;
const version = process.env.URL_VERSION ?? "v1";
const apiPrefix = `/api/${version}`;
app.use(cors());
app.use(express.json());
// Health check
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// API routes
app.use(`${apiPrefix}/auth`, authRoutes);
// Database health check
app.get("/db-health", async (_req, res) => {
    const dbConnected = await testConnection();
    if (!dbConnected) {
        res.status(500).json({
            status: "error",
            message: "Database connection failed",
        });
        return;
    }
    res.json({ status: "ok" });
});
// Server initialization
const startServer = async () => {
    try {
        const dbConnected = await testConnection();
        if (!dbConnected) {
            throw new Error("Unable to connect to the database");
        }
        await ensureUsersTableExists();
        app.listen(port, () => {
            console.log(`Server running at ${baseUrl}`);
            console.log(`API endpoint: ${baseUrl}${apiPrefix}`);
        });
    }
    catch (error) {
        console.error("Server initialization failed:", error);
        process.exit(1);
    }
};
void startServer();
