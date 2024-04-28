"use client";
import React from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import Link from "next/link";
import type { Product } from "@prisma/client";
import prisma from "@/prisma";
import { useRouter } from "next/navigation";

const columns = [
  { name: "Gambar", uid: "image" },
  { name: "Kode Barnag", uid: "code" },
  { name: "Nama", uid: "name" },
  { name: "Kategori", uid: "category" },
  { name: "Harga", uid: "price" },
  { name: "Stok", uid: "stock" },
  { name: "Aksi", uid: "actions" },
];

type Props = {
  products: Product[];
};

export default function TableProduct({ products }: Props) {
  const router = useRouter();
  const handleRemoveProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCell = React.useCallback(
    (product: Product, columnKey: keyof Product & "actions") => {
      const cellValue = product[columnKey];

      switch (columnKey) {
        case "image":
          return <Avatar src={product.image} radius="none" />;
        case "price":
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(cellValue);
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Product">
                <Link
                  href={`/dashboard/edit-product/${product.id}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <BiEdit />
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Delete Product">
                <span
                  onClick={() => handleRemoveProduct(product.id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <BiTrash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div>
      <Button
        as={Link}
        href="/dashboard/add-product"
        color="primary"
        className="mb-4"
        endContent={<BiPlus />}
      >
        Tambah barang
      </Button>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={products} emptyContent={"No Data"}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof Product & "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
