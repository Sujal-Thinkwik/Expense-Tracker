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
import {
  SIGN_UP_INITIAL_VALUES,
  SignUpFormValues,
  signUpSchema,
} from "./auth.schema";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: SIGN_UP_INITIAL_VALUES,
  });

  const onSubmit = async (values: SignUpFormValues) => {
    console.log({ values });
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

        <Button type="submit" color="primary" fullWidth loading={isSubmitting}>
          Create Account
        </Button>
      </Stack>

      <Divider
        label={
          <>
            <Text fz="xs">Already have an account?</Text>
            &nbsp;
            <Link href="/signin">
              <Text fz="xs" c="primary">
                Sign in
              </Text>
            </Link>
          </>
        }
        labelPosition="center"
      />
    </form>
  );
}

export default SignUpForm;
