import { Link } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/UI/card';
import { useGetProductsQuery } from '@/store/api/productsApi';
import type { Product } from '@/types';



const statusStyles: Record<Product['status'], string> = {
    active: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-600',
    out_of_stock: 'bg-red-100 text-red-600',
};

const statusLabels: Record<Product['status'], string> = {
    active: 'Active',
    draft: 'Draft',
    out_of_stock: 'Out of Stock',
};

const categoryColors: Record<string, string> = {
    Electronics: 'bg-blue-50 text-blue-600',
    Fashion: 'bg-pink-50 text-pink-600',
    'Home & Kitchen': 'bg-yellow-50 text-yellow-600',
    Beauty: 'bg-purple-50 text-purple-600',
    Sports: 'bg-green-50 text-green-600',
};

const Products = () => {
    const { data, isLoading, isError } = useGetProductsQuery();

    const products = data?.data || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong</div>;
    }
    return (
        <div className="space-y-5 min-h-screen px-5 py-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">All Products</h2>
                </div>
               
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <Package className="h-12 w-12 mb-3" />
                    <p className="text-sm font-medium">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map(product => (
                        <Card key={product.id} className="bg-white border border-gray-100 hover:shadow-md transition-shadow">
                            {/* Image placeholder */}
                            <div className="h-40 bg-gradient-to-br from-orange-50 to-orange-100 rounded-t-lg flex items-center justify-center">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="h-12 w-12 text-orange-300" />
                                )}                            </div>
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{product.name}</h3>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusStyles[product.status]}`}>
                                        {statusLabels[product.status]}
                                    </span>
                                </div>

                                <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[product.category] ?? 'bg-gray-100 text-gray-600'}`}>
                                    {product.category}
                                </span>

                                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                                    <span className="text-base font-bold text-gray-900">${product.price}</span>
                                    <span className="text-xs text-gray-500">
                                        {product.stock > 0 ? `${product.stock} in stock` : 'No stock'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
