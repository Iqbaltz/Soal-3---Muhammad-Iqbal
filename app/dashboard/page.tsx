import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BasicNavbar from "../components/navbar";
import TableProduct from "./components/table-product";
import prisma from "@/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const products = await prisma.product.findMany();

  return (
    <div>
      <BasicNavbar isLoggedIn={!!session} />
      <div className="flex justify-center">
        <div className="w-[90%] mt-8">
          <TableProduct products={products} />
        </div>
      </div>
    </div>
  );
}
