"use client";

import {
  Button,
  Divider,
  Grid,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useSignUpMutation } from "@/services/auth.service";
import {
  SIGN_UP_INITIAL_VALUES,
  SignUpFormValues,
  signUpSchema,
} from "./auth.schema";
import { toast } from "sonner";

const SignUpForm = () => {
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: SIGN_UP_INITIAL_VALUES,
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const result = await signUp(values).unwrap();
      toast.success(result?.message || "User created successfully");
      reset();
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" && error !== null && "data" in error
          ? (error as { data?: { message?: string } }).data?.message
          : undefined;

      toast.error(
        errorMessage ||
          (error instanceof Error
            ? error.message
            : "Something went wrong while signing up.")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg" py="md">
        <Grid>
          <Grid.Col span={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <TextInput
                  label="First Name"
                  placeholder="First name"
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <TextInput
                  label="Last Name"
                  placeholder="Last name"
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid.Col>
        </Grid>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button
          type="submit"
          color="primary"
          fullWidth
          loading={isSubmitting || isSigningUp}
        >
          Create Account
        </Button>
      </Stack>

      <Divider
        label={
          <>
            <Text fz="xs">Already have an account?</Text>
            &nbsp;
            <Link href="/signin">
              <Text fz="xs" c="primary" fw={600}>
                Sign in
              </Text>
            </Link>
          </>
        }
        labelPosition="center"
      />
    </form>
  );
};

export default SignUpForm;
