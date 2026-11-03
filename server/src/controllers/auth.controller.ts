import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function signupController(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body ?? {};

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.status(400).json(
        errorResponse(
          "firstName, lastName, email, password and confirmPassword are required"
        )
      );
      return;
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      res.status(400).json(errorResponse("firstName and lastName must be strings"));
      return;
    }

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      res.status(400).json(
        errorResponse("First name and last name must be at least 2 characters long")
      );
      return;
    }

    if (typeof password !== "string" || password.length < 8) {
      res.status(400).json(
        errorResponse("Password must be at least 8 characters long")
      );
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json(errorResponse("Passwords do not match"));
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      res.status(400).json(errorResponse("Please enter a valid email address"));
      return;
    }

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      res.status(409).json(errorResponse("User with this email already exists"));
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: passwordHash,
    });

    res.status(201).json(   
      successResponse("User created successfully", {
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
      errorResponse("Failed to create user", "INTERNAL_SERVER_ERROR", { message })
    );
  }
}
