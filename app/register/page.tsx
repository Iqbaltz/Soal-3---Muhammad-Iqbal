"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterSchema } from "@/src/entities/user-entity";
import { z } from "zod";
import Link from "next/link";

type Props = {};

export default function RegisterPage({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserRegisterSchema>>({
    resolver: zodResolver(UserRegisterSchema),
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
              {...register("name")}
              labelPlacement="outside"
              label="Nama"
              placeholder=" "
              isRequired
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
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
              {...register("phone_number")}
              labelPlacement="outside"
              label="Nomor Hp"
              placeholder=" "
              type="number"
              isRequired
              isInvalid={!!errors.phone_number}
              errorMessage={errors.phone_number?.message}
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
            <Input
              {...register("confirm_password")}
              labelPlacement="outside"
              label="Confirm Password"
              placeholder=" "
              isRequired
              type="password"
              isInvalid={!!errors.confirm_password}
              errorMessage={errors.confirm_password?.message}
            />
            <Button color="primary" type="submit" className="mt-3">
              Register
            </Button>
          </form>
          <p className="text-center mt-2 text-sm">
            Sudah punya akun?{" "}
            <Link className="text-primary underline" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
