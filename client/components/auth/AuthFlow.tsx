
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
import {
  FormValues,
  SIGN_IN_INITIAL_VALUES,
  SIGN_UP_INITIAL_VALUES,
  signInSchema,
  signUpSchema,
} from "./auth.schema";
import Link from "next/link";
import { z } from "zod";

type AuthFormProps = {
  mode: "signin" | "signup";
};

function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";

  const schema = isSignUp ? signUpSchema : signInSchema;
  
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isSignUp
      ? SIGN_UP_INITIAL_VALUES
      : SIGN_IN_INITIAL_VALUES,
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg" py="md">
        {isSignUp && (
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
        )}

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

        {isSignUp && (
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
        )}

        <Button
          type="submit"
          color="primary"
          fullWidth
          loading={isSubmitting}
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </Button>
      </Stack>

      <Divider
        label={
          <>
            <Text fz="xs">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
            </Text>

            {isSignUp ? (
              <Link href="/signin">
                <Text fz="xs" c="primary">
                  Sign in
                </Text>
              </Link>
            ) : (
              <Link href="/signup">
                <Text fz="xs" c="primary">
                  Sign up
                </Text>
              </Link>
            )}
          </>
        }
        labelPosition="center"
      />
    </form>
  );
}

export default AuthForm;
