import type { Product, ApiResponse } from '@/types';

let mockProducts: Product[] = [];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockProductService = {

    async getProducts(): Promise<ApiResponse<Product[]>> {
        await delay(500);
        return {
            success: true,
            message: 'Products fetched',
            data: mockProducts,
        };
    },

    async addProduct(product: Partial<Product>): Promise<ApiResponse<Product>> {
        await delay(500);

        const newProduct: Product = {
            id: Date.now().toString(),
            name: product.name || '',
            description: product.description || '',
            category: product.category || '',
            price: Number(product.price) || 0,
            stock: Number(product.stock) || 0,
            status: product.status || 'draft',
            images: product.images || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockProducts = [...mockProducts, newProduct];

        return {
            success: true,
            message: 'Product added',
            data: newProduct,
        };
    },
};