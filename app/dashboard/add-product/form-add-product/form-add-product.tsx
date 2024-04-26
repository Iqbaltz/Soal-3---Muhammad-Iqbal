"use client";
import { RequestCreateProduct } from "@/src/entities/product-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function FormAddProduct({}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof RequestCreateProduct>>({
    resolver: zodResolver(RequestCreateProduct),
  });

  const onSubmit = (data: z.infer<typeof RequestCreateProduct>) => {
    console.log(data);
  };

  console.log("errors", errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-6">
        <div>
          <input
            onChange={(e) => {
              setValue("image", e.target.files?.[0]);
            }}
            type="file"
          />
          {errors.image && (
            <p className="mt-1 text-danger text-xs">
              {String(errors?.image?.message)}
            </p>
          )}
        </div>

        <Input
          {...register("code")}
          label="Kode Barang"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.code}
          errorMessage={errors.code?.message}
        />

        <Input
          {...register("name")}
          label="Nama"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          {...register("category")}
          label="Kategori"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.category}
          errorMessage={errors.category?.message}
        />

        <Input
          {...register("stock", { setValueAs: (value) => Number(value) })}
          label="Stok"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          type="number"
          isInvalid={!!errors.stock}
          errorMessage={errors.stock?.message}
        />

        <Input
          {...register("price", { setValueAs: (value) => Number(value) })}
          label="Harga"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          type="number"
          isInvalid={!!errors.price}
          errorMessage={errors.price?.message}
        />

        <Button color="primary" type="submit" className="mt-3">
          Tambah
        </Button>
      </form>
    </div>
  );
}
