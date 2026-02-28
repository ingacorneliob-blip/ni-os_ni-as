import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Error fetching products" },
            { status: 500 }
        );
    }
}

// POST a new product
export async function POST(request) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.title || !data.price || !data.category || !data.gender || !data.sizes) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create product
        const product = await prisma.product.create({
            data: {
                title: data.title,
                description: data.description || null,
                price: data.price,
                imageUrl: data.imageUrl || null,
                category: data.category,
                gender: data.gender,
                sizes: Array.isArray(data.sizes) ? data.sizes : [data.sizes],
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Error creating product" },
            { status: 500 }
        );
    }
}
