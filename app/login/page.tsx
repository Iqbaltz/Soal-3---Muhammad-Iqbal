import Link from "next/link";
import React from "react";
import LoginForm from "./components/login-form";
import prisma from "@/prisma";

type Props = {};

export default async function LoginPage({}: Props) {
  const product = await prisma.product.findMany();

  return (
    <div className="flex justify-center pt-20">
      <div className="min-w-[80%] md:min-w-[400px]">
        <h1 className="mb-4 font-bold text-2xl">Login Account</h1>
        <div className="bg-zinc-900/90 rounded p-6">
          <LoginForm />
          <p className="text-center mt-2 text-sm">
            Tidak punya akun?{" "}
            <Link className="text-primary underline" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
