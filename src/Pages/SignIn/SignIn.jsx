import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form"; // Import React Hook Form
import { useDispatch } from "react-redux"; // Import Redux Dispatch
import { SignIN } from "@/features/authSlice"; // Import login action from Redux
import React from "react";
import authService from "@/appwrite/auth";

function SignIn() {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const {
    register, // To register input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // To handle validation errors
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data.email, data.password);

      // Dispatch login action to Redux
      dispatch(
        SignIN({
          userData: response, // This assumes the Appwrite response has user data
        })
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card className="mx-auto mt-16 max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignIn;
