"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LockIcon,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Login } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginFrom() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    const response = await Login(form.getValues());
    if (!response.status) {
      setError(response?.message as string);
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <h1 className="text-6xl text-secondary">Login</h1>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                <User className="size-5" /> Username
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-full border-secondary focus-visible:ring-secondary focus-visible:border-secondary focus-within:ring-secondary"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-end gap-2 relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className=" flex-1">
                <FormLabel>
                  <LockIcon className="size-5" /> Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="rounded-full border-secondary focus-visible:ring-secondary focus-visible:border-secondary focus-within:ring-secondary"
                    type={show ? "text" : "password"}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => setShow(!show)}
            className={cn(
              "center rounded-full absolute end-2 bottom-1.5 size-6",
              show &&
                "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
              form.formState.errors.password && "top-1/2 -translate-y-1/2"
            )}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            {show ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          disabled={isLoading}
          className="w-full rounded-full bg-secondary text-secondary-foreground"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
