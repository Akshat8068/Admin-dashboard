import { z } from 'zod';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FormBuilder, type FieldConfig } from '@/components/common/FormBuilder';
import { FileUpload } from '@/components/common/FileUpload';
import { Label } from '@/components/UI/label';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '@/store/api/productsApi';
import type { Product } from '@/types';
import { useState } from 'react';

const productSchema = z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    price: z.string().min(1, 'Price is required').refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Enter a valid price'),
    stock: z.string().min(1, 'Stock is required').refine(v => !isNaN(Number(v)) && Number(v) >= 0, 'Enter a valid stock quantity'),
    status: z.string().min(1, 'Status is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const fields: FieldConfig<ProductFormData>[] = [
    { name: 'name', label: 'Product Name', type: 'text', placeholder: 'e.g. Wireless Headphones', required: true },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Describe your product...', required: true },
    {
        name: 'category', label: 'Category', type: 'select', placeholder: 'Select category', required: true,
        options: [
            { label: 'Electronics', value: 'electronics' },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Home & Kitchen', value: 'home_kitchen' },
            { label: 'Beauty & Personal Care', value: 'beauty' },
            { label: 'Sports', value: 'sports' },
        ],
    },
    { name: 'price', label: 'Price ($)', type: 'number', placeholder: '0.00', required: true },
    { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: '0', required: true },
    {
        name: 'status', label: 'Status', type: 'select', placeholder: 'Select status', required: true,
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
            { label: 'Out of Stock', value: 'out_of_stock' },
        ],
    },
];

const AddProduct = () => {
    const [addProduct, { isLoading }] = useAddProductMutation();
    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (data: ProductFormData) => {
        try {
            await addProduct({
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                status: data.status as Product['status'],
                images: images.map(file => URL.createObjectURL(file)),
            }).unwrap();
            setTimeout(() => navigate('/products'), 0);
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };
    return (
        <div className="max-w-2xl mx-auto space-y-5">
            <Card className="bg-white border border-gray-100">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <Package className="h-4 w-4 text-orange-500" />
                        Add New Product
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="border-t border-gray-100 pt-4">
                        <Label className="text-xs text-gray-500 mb-2 block">Product Images</Label>
                        <FileUpload maxFiles={5} maxFileSize={5 * 1024 * 1024} showPreview={true} onFilesChange={setImages} />
                    </div>
                    <FormBuilder<ProductFormData>
                        fields={fields}
                        validation={productSchema}
                        onSubmit={handleSubmit}
                        submitText="Save Product"
                        submitClassName="bg-orange-500 hover:bg-orange-600"
                    />
                   
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProduct;
