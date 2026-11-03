import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { createUser, findUserByEmail } from "../../services/user.service.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.js";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const signinController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json(
        errorResponse("Email and password are required")
      );
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      res.status(404).json(errorResponse("User not found"));
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json(errorResponse("Invalid credentials"));
      return;
    }

    res.status(200).json(
      successResponse("User signed in successfully", {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        createdAt: user.created_at,
      })
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(500).json(
      errorResponse("Failed to sign in user", "INTERNAL_SERVER_ERROR", { message })
    );
  }
}
       