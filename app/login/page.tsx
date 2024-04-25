"use client";
import { UserLoginSchema } from "@/src/entities/user-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function LoginPage({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="flex justify-center pt-20">
      <div className="min-w-[80%] md:min-w-[400px]">
        <h1 className="mb-4 font-bold text-2xl">Register Account</h1>
        <div className="bg-zinc-900/90 rounded p-6">
          <form onSubmit={onSubmit} className="flex-col flex gap-3">
            <Input
              {...register("email")}
              labelPlacement="outside"
              label="Email"
              placeholder=" "
              type="email"
              isRequired
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password")}
              labelPlacement="outside"
              label="Password"
              placeholder=" "
              isRequired
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              type="password"
            />
            <Button color="primary" type="submit" className="mt-3">
              Register
            </Button>
          </form>
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
