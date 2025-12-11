import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    value?: string;
    onChange?: (file: File | null) => void;
    onUrlChange?: (url: string) => void;
    accept?: string;
    maxSize?: number; // em MB
    disabled?: boolean;
    className?: string;
}

export default function ImageUpload({
    value,
    onChange,
    onUrlChange,
    accept = 'image/*',
    maxSize = 5, // 5MB default
    disabled = false,
    className,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | undefined>(value);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setPreview(value);
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setError('');

            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];

            // Validar tamanho
            if (file.size > maxSize * 1024 * 1024) {
                setError(`Imagem muito grande. Máximo ${maxSize}MB`);
                return;
            }

            // Criar preview
            // const reader = new FileReader();
            // reader.onload = () => {
            //     const url = reader.result as string;
            //     setPreview(url);
            //     onUrlChange?.(url);
            // };
            // reader.readAsDataURL(file);

            setPreview(URL.createObjectURL(file));
            // Chamar onChange com o arquivo
            onChange?.(file);
        },
        [maxSize, onChange],
        // [maxSize, onChange, onUrlChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { [accept]: [] },
        maxFiles: 1,
        disabled,
    });

    const removeImage = () => {
        setPreview(undefined);
        setError('');
        onChange?.(null);
        onUrlChange?.('');
    };

    return (
        <div className={cn('space-y-2', className)}>
            {preview ? (
                // Preview da imagem
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-64 w-full rounded-lg object-cover"
                    />
                    {!disabled && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ) : (
                // Área de upload
                <div
                    {...getRootProps()}
                    className={cn(
                        'flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                        isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-primary/50',
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                >
                    <input {...getInputProps()} />
                    <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">
                        {isDragActive
                            ? 'Solte a imagem aqui'
                            : 'Arraste uma imagem ou clique para selecionar'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP até {maxSize}MB
                    </p>
                </div>
            )}

            {/* Mensagem de erro */}
            {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            {/* Informação adicional */}
            {!preview && !error && (
                <p className="text-xs text-muted-foreground">
                    Recomendado: 1200x630px para melhor visualização
                </p>
            )}
        </div>
    );
}
