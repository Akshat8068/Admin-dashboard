import { Link } from 'react-router-dom';
import { Plus, Package, Trash2, Star } from 'lucide-react';
import {
    Card, CardHeader, CardTitle, CardDescription,
    CardContent, CardFooter,
} from '@/components/ui/card';
import { NetworkErrorBanner } from '@/components/common/ErrorBanner';
import {
    useGetProductsQuery,
    useDeleteDummyProductMutation,
} from '@/store/api/productApi';
import type { DummyProduct } from '@/store/api/productApi';

function StarRating({ rating }: { rating: number }) {
    return (
        <span className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
        </span>
    );
}

const AdminProducts = () => {
    const { data, isLoading, isError, refetch } = useGetProductsQuery({ limit: 12, skip: 0 });
    const [deleteProduct] = useDeleteDummyProductMutation();

    const products: DummyProduct[] = data?.products ?? [];

    if (isLoading) return <div className="text-sm text-gray-400 text-center py-10">Loading...</div>;
    if (isError) return <NetworkErrorBanner onRetry={refetch} />;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">All Products</h2>
                <Link
                    to="/add"
                    className="flex items-center gap-2 bg-[#ff6900] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <Package className="h-12 w-12 mb-3" />
                    <p className="text-sm font-medium">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Card key={product.id} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-44 overflow-hidden bg-gray-50">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-base line-clamp-1">{product.title}</CardTitle>
                                    {/* Optimistic delete — UI se turant hatega, API baad mein */}
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        title="Delete product"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-2">
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    <span className="capitalize bg-orange-50 text-[#ff6900] px-2 py-0.5 rounded-full">
                                        {product.category}
                                    </span>
                                    {product.brand && <span>{product.brand}</span>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center border-t pt-3">
                                <div>
                                    <p className="font-semibold text-base">${product.price.toFixed(2)}</p>
                                    <p className="text-xs text-green-600">{product.discountPercentage}% off</p>
                                </div>
                                <div className="text-right">
                                    <StarRating rating={product.rating} />
                                    <p className={`text-xs mt-0.5 ${product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.availabilityStatus}
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
