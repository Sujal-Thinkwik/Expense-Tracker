
import cors from "cors";
import dotenv from "dotenv";
import express, {
  type Express,
  type Request,
  type Response,
} from "express";

import rateLimit from "express-rate-limit";

import { testConnection } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import { errorResponse } from "./utils/apiResponse.js";

dotenv.config();

const app: Express = express();
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  handler: (_req, res) => {
    res.status(429).json(
      errorResponse(
        "Too many requests from this IP, please try again later.",
        "TOO_MANY_REQUESTS"
      )
    );
  },
});

const port = Number(process.env.PORT ?? 5000);
const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;
const version = process.env.URL_VERSION ?? "v1";

const apiPrefix = `/api/${version}`;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// API routes
app.use(`${apiPrefix}/auth`, authRoutes);

const validateDatabaseConnection = async (): Promise<void> => {
  const dbConnected = await testConnection();

  if (!dbConnected) {
    throw new Error("Unable to connect to the database");
  }
};

// Database health check
app.get("/db-health", async (_req: Request, res: Response) => {
  try {
    await validateDatabaseConnection();
    res.json({ status: "ok" });
  } catch (_error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

// Server initialization
const startServer = async (): Promise<void> => {
  try {
    await validateDatabaseConnection();

    app.listen(port, () => {
      console.log(`Server running at ${baseUrl}`);
      console.log(`API endpoint: ${baseUrl}${apiPrefix}`);
    });
    
  } catch (error) {
    console.error("Server initialization failed:", error);
    process.exit(1);
  }
};

void startServer();
