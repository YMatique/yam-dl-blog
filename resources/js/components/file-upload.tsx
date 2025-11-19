import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { File as FileIcon, Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
    value?: File | string;
    onChange?: (file: File | null) => void;
    accept?: string;
    maxSize?: number; // em MB
    disabled?: boolean;
    className?: string;
    multiple?: boolean;
}

export default function FileUpload({
    value,
    onChange,
    accept = '*',
    maxSize = 10, // 10MB default
    disabled = false,
    className,
    multiple = false,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | string | undefined>(
        value,
    );
    const [error, setError] = useState<string>('');

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setError('');

            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];

            // Validar tamanho
            if (file.size > maxSize * 1024 * 1024) {
                setError(`Arquivo muito grande. Máximo ${maxSize}MB`);
                return;
            }

            setSelectedFile(file);
            onChange?.(file);
        },
        [maxSize, onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accept !== '*' ? { [accept]: [] } : undefined,
        maxFiles: multiple ? undefined : 1,
        disabled,
    });

    const removeFile = () => {
        setSelectedFile(undefined);
        setError('');
        onChange?.(null);
    };

    const getFileName = () => {
        if (typeof selectedFile === 'string') {
            return selectedFile.split('/').pop() || 'arquivo';
        }
        return selectedFile?.name || '';
    };

    const getFileSize = () => {
        if (typeof selectedFile === 'string') return '';
        if (!selectedFile) return '';

        const size = selectedFile.size;
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <div className={cn('space-y-2', className)}>
            {selectedFile ? (
                // Preview do arquivo
                <div className="flex items-center justify-between rounded-lg border bg-muted p-4">
                    <div className="flex items-center gap-3">
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">
                                {getFileName()}
                            </p>
                            {getFileSize() && (
                                <p className="text-xs text-muted-foreground">
                                    {getFileSize()}
                                </p>
                            )}
                        </div>
                    </div>
                    {!disabled && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
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
                        'flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                        isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-primary/50',
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                >
                    <input {...getInputProps()} />
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium">
                        {isDragActive
                            ? 'Solte o arquivo aqui'
                            : 'Arraste um arquivo ou clique para selecionar'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Até {maxSize}MB
                    </p>
                </div>
            )}

            {/* Mensagem de erro */}
            {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
            )}
        </div>
    );
}
