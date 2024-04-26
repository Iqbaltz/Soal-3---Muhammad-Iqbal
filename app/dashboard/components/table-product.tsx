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

const columns = [
  { name: "Gambar", uid: "image" },
  { name: "Kode Barnag", uid: "code" },
  { name: "Nama", uid: "name" },
  { name: "Kategori", uid: "category" },
  { name: "Harga", uid: "price" },
  { name: "Stok", uid: "stock" },
  { name: "Aksi", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    code: "CEO",
    price: "20000",
    category: "Kategori 1",
    stock: "29",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    code: "Technical Lead",
    price: "30000",
    category: "Kategori 2",
    stock: "25",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    code: "Senior Developer",
    price: "40000",
    category: "Kategori 3",
    stock: "22",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

type Props = {};

export default function TableProduct({}: Props) {
  const renderCell = React.useCallback((product: any, columnKey: any) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "image":
        return <Avatar src={product.image} radius="none" />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Product">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <BiEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Product">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <BiTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
