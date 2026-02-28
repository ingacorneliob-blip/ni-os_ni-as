import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PUT (update) an existing product
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
                category: data.category,
                gender: data.gender,
                sizes: data.sizes ? (Array.isArray(data.sizes) ? data.sizes : [data.sizes]) : undefined,
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Error updating product" },
            { status: 500 }
        );
    }
}

// DELETE a product
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Error deleting product" },
            { status: 500 }
        );
    }
}
