"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response: any = await loginUser(values);
    if (response.success) {
      toast.success(response.message);
      Cookies.set("token", response.data);
      router.push("/products");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] p-5 flex flex-col border rounded-sm shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <h1 className="text-xl font-bold">Login to your account</h1>
            <hr className="border-t border-gray-400" />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <h1 className="text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-black underline">
                  Register
                </Link>
              </h1>
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
