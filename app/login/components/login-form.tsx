"use client";

import { UserLoginSchema } from "@/src/entities/user-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function LoginForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (ok) {
        router.push("/dashboard");
      } else {
        alert("Email atau password anda salah");
      }
    });
  });

  return (
    <div>
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
          Login
        </Button>
      </form>
    </div>
  );
}
