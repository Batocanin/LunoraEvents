"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authSchema, authValues } from "@/scheme/auth/scheme";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { AxiosInstance } from "@/lib/axios";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<authValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: authValues) {
    setError("");
    startTransition(async () => {
      try {
        const res = await AxiosInstance.post(
          "/auth/signIn",
          { values },
          { withCredentials: true }
        );
        const { success, successMessage } = res.data;
        if (success) {
          toast.success(successMessage);
          router.push("/dashboard");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.successMessage) {
            return setError(error.response.data.successMessage);
          }
          if (error.code === "ERR_NETWORK")
            return setError(
              "There was an error with connection on server, try again later."
            );
        }
        setError("There was an error on server, try again later.");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPending ? <Loader className="animate-spin" /> : "Login"}
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-center">{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}

export default LoginForm;
