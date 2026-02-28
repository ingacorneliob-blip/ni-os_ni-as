'use server'

import { prisma } from './db'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
    try {
        return await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export async function createProduct(formData) {
    try {
        const title = formData.get('title')
        const description = formData.get('description')
        const price = formData.get('price')
        const imageUrl = formData.get('imageUrl')
        const category = formData.get('category')
        const gender = formData.get('gender')
        const sizes = formData.get('sizes')?.split(',').map(s => s.trim()) || []

        await prisma.product.create({
            data: {
                title,
                description,
                price,
                imageUrl,
                category,
                gender,
                sizes
            }
        })

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Error creating product:', error)
        return { error: 'Failed to create product' }
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({
            where: { id }
        })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Error deleting product:', error)
        return { error: 'Failed to delete product' }
    }
}
