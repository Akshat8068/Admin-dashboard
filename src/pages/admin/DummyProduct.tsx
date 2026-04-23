import { useState, useEffect, useRef, useCallback } from 'react';
import {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
} from '@/store/api/productApi';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Star } from 'lucide-react';
import { NetworkErrorBanner } from '@/components/common/ErrorBanner';

const CATEGORIES = [
    'beauty', 'fragrances', 'furniture', 'groceries',
    'home-decoration', 'kitchen-accessories', 'laptops',
    'mens-shirts', 'mens-shoes', 'mens-watches',
    'mobile-accessories', 'motorcycle', 'skin-care',
    'smartphones', 'sports-accessories', 'sunglasses',
    'tablets', 'tops', 'vehicle', 'womens-bags',
    'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches',
];

const LIMIT = 12;

type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    brand?: string;
    availabilityStatus: string;
};

function StarRating({ rating }: { rating: number }) {
    return (
        <span className="flex items-center gap-1 text-sm">
            <span className="text-yellow-400"><Star /></span>
            <span>{rating.toFixed(1)}</span>
        </span>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden bg-gray-50">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-2">
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="capitalize bg-secondary px-2 py-0.5 rounded-full">{product.category}</span>
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
    );
}



function InfiniteProductList({ search }: { search: string }) {
    const [skip, setSkip] = useState(0);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const { data, isFetching } = useGetProductsQuery(
        { limit: LIMIT, skip, search: search || undefined },
        { skip: false }
    );

    useEffect(() => {
        setAllProducts([]);
        setSkip(0);
        setHasMore(true);
    }, [search]);
// Accumalte ke liye h 
    useEffect(() => {
        if (!data) return;
        setAllProducts((prev) => {
            // duplicates re-render nhi 
            const ids = new Set(prev.map((p) => p.id));
            const fresh = data.products.filter((p: Product) => !ids.has(p.id));
            return [...prev, ...fresh];
        });
        if (skip + LIMIT >= data.total) setHasMore(false);
    }, [data]);

    // Intersection observer 
    const setupObserver = useCallback(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && hasMore) {
                    setSkip((prev) => prev + LIMIT);
                }
            },
            { threshold: 0.1 }
        );
        if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
    }, [isFetching, hasMore]);

    useEffect(() => {
        setupObserver();
        return () => observerRef.current?.disconnect();
    }, [setupObserver]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div ref={sentinelRef} className="h-10 flex items-center justify-center mt-4">
                {isFetching && <span className="text-sm text-muted-foreground">Loading...</span>}
                {!hasMore && allProducts.length > 0 && (
                    <span className="text-sm text-muted-foreground">All {allProducts.length} products loaded</span>
                )}
            </div>
        </>
    );
}


function CategoryProductList({ category }: { category: string }) {
    // category empty string ho toh query skip 
    // skip: !category → category select nahi hui toh API call nahi hogi
    const { data, isFetching, isError, refetch } = useGetProductsByCategoryQuery(category, {
        skip: !category,
    });

    if (isFetching) return <p className="text-sm text-muted-foreground">Loading...</p>;
    if (isError) return <NetworkErrorBanner onRetry={refetch} />;
    if (!data?.products?.length) return <p className="text-sm text-muted-foreground">No products found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.products.map((p: Product) => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}

const DummyProduct = () => {
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSelectedCategory('');
        setSearch(searchInput);
    };

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setSearch('');
        setSearchInput('');
    };

    const clearFilters = () => {
        setSearch('');
        setSearchInput('');
        setSelectedCategory('');
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search products..."
                        className="border rounded-md px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm"
                    >
                        Search
                    </button>
                    {(search || selectedCategory) && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="px-3 py-1.5 border rounded-md text-sm"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-1 rounded-full text-xs capitalize border transition-colors ${selectedCategory === cat
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background hover:bg-secondary'
                            }`}
                    >
                        {cat.replace(/-/g, ' ')}
                    </button>
                ))}
            </div>

            {/* Active filter label */}
            {(search || selectedCategory) && (
                <p className="text-sm text-muted-foreground">
                    {search ? `Search: "${search}"` : `Category: ${selectedCategory.replace(/-/g, ' ')}`}
                </p>
            )}

            {/* Product list */}
            {selectedCategory
                ? <CategoryProductList category={selectedCategory} />
                : <InfiniteProductList search={search} />
            }
        </div>
    );
};

export default DummyProduct;
