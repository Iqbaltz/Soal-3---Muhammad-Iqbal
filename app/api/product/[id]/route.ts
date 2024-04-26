import prisma from "@/prisma";

export async function DELETE(
  req: Request,
  { params: { id: id } }: { params: { id: string } }
) {
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json("ok");
}
