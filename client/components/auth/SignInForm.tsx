"use client";

import {
  Button,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  SIGN_IN_INITIAL_VALUES,
  SignInFormValues,
  signInSchema,
} from "./auth.schema";
import { useSignInMutation } from "@/services/auth.service";
import { toast } from "sonner";

const SignInForm = () => {
  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: SIGN_IN_INITIAL_VALUES,
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const response = await signIn(values).unwrap();
      toast.success(response?.message || "Signed in successfully");
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
            : "Something went wrong while signing up."),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg" py="md">
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

        <Button
          type="submit"
          color="primary"
          fullWidth
          loading={isSigningIn || isSubmitting}
        >
          Sign In
        </Button>
      </Stack>

      <Divider
        label={
          <>
            <Text fz="xs">Don&apos;t have an account?</Text>
            &nbsp;
            <Link href="/signup">
              <Text fz="xs" c="primary">
                Sign up
              </Text>
            </Link>
          </>
        }
        labelPosition="center"
      />
    </form>
  );
};

export default SignInForm;
