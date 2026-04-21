import { useCallback, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Progress } from '@/components/UI/progress';
import { cn } from '@/utils';

interface FileUploadProps {
    onFilesChange?: (files: File[]) => void;
    maxFiles?: number;
    maxFileSize?: number;
    className?: string;
    disabled?: boolean;
    showPreview?: boolean;
}

interface UploadedFile {
    file: File;
    id: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    preview?: string;
}

export function FileUpload({
    onFilesChange,
    maxFiles = 5,
    maxFileSize = 5 * 1024 * 1024,
    className,
    disabled = false,
    showPreview = true,
}: FileUploadProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);

    const processFiles = useCallback((files: File[]) => {
        const valid = files.filter(f => {
            if (!f.type.startsWith('image/')) return false;
            if (f.size > maxFileSize) return false;
            return true;
        }).slice(0, maxFiles);

        const newFiles: UploadedFile[] = valid.map(file => ({
            file,
            id: Math.random().toString(36).slice(2),
            progress: 0,
            status: 'uploading',
            preview: URL.createObjectURL(file),
        }));

        setUploadedFiles(prev => {
            const updated = [...prev, ...newFiles];
            onFilesChange?.(updated.map(f => f.file));
            return updated;
        });

        newFiles.forEach(uf => {
            const interval = setInterval(() => {
                setUploadedFiles(prev => prev.map(f => {
                    if (f.id !== uf.id) return f;
                    const next = Math.min(f.progress + Math.random() * 40, 100);
                    if (next >= 100) { clearInterval(interval); return { ...f, progress: 100, status: 'completed' }; }
                    return { ...f, progress: next };
                }));
            }, 120);
        });
    }, [maxFiles, maxFileSize, onFilesChange]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        if (disabled) return;
        processFiles(Array.from(e.dataTransfer.files));
    }, [disabled, processFiles]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(Array.from(e.target.files));
    };

    const removeFile = (id: string) => {
        setUploadedFiles(prev => {
            const updated = prev.filter(f => f.id !== id);
            onFilesChange?.(updated.map(f => f.file));
            return updated;
        });
    };

    return (
        <div className={cn('space-y-3', className)}>
            <div
                onDrop={onDrop}
                onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
                onDragLeave={() => setIsDragActive(false)}
                onClick={() => !disabled && document.getElementById('file-input')?.click()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                    isDragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50',
                    disabled && 'cursor-not-allowed opacity-50'
                )}
            >
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    multiple={maxFiles > 1}
                    className="hidden"
                    onChange={onInputChange}
                    disabled={disabled}
                />
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                    {isDragActive ? 'Drop images here...' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP up to {maxFileSize / 1024 / 1024}MB
                </p>
            </div>

            {showPreview && uploadedFiles.length > 0 && (
                <div className="space-y-2">
                    {uploadedFiles.map(uf => (
                        <div key={uf.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="shrink-0">
                                {uf.preview
                                    ? <img src={uf.preview} alt={uf.file.name} className="w-10 h-10 object-cover rounded" />
                                    : <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center"><Image className="h-4 w-4 text-gray-400" /></div>
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-700 truncate">{uf.file.name}</p>
                                <p className="text-xs text-gray-400">{(uf.file.size / 1024).toFixed(0)} KB</p>
                                {uf.status === 'uploading' && (
                                    <Progress value={uf.progress} className="h-1 mt-1 bg-orange-100 [&>div]:bg-orange-500" />
                                )}
                                {uf.status === 'completed' && (
                                    <p className="text-xs text-green-600 mt-0.5">Ready</p>
                                )}
                            </div>
                            <button onClick={() => removeFile(uf.id)} className="shrink-0 p-1 text-gray-400 hover:text-red-500">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
