import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Article {
    id: number;
    title: string;
    status: string;
    series_order?: number;
}

interface SeriesArticlesManagerProps {
    seriesId: number;
}

export default function SeriesArticlesManager({
    seriesId,
}: SeriesArticlesManagerProps) {
    const [seriesArticles, setSeriesArticles] = useState<Article[]>([]);
    const [availableArticles, setAvailableArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [addDialog, setAddDialog] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<string>('');
    const [draggedItem, setDraggedItem] = useState<number | null>(null);

    // Carregar artigos
    useEffect(() => {
        fetchArticles();
    }, [seriesId]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/scm/series/${seriesId}/articles`);
            const data = await response.json();
            setSeriesArticles(data.seriesArticles || []);
            setAvailableArticles(data.availableArticles || []);
        } catch (error) {
            console.error('Erro ao carregar artigos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Adicionar artigo
    const handleAddArticle = async () => {
        if (!selectedArticle) return;

        try {
            const response = await fetch(`/scm/series/${seriesId}/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
                body: JSON.stringify({ article_id: selectedArticle }),
            });

            const data = await response.json();

            if (data.success) {
                await fetchArticles();
                setAddDialog(false);
                setSelectedArticle('');
            }
        } catch (error) {
            console.error('Erro ao adicionar artigo:', error);
        }
    };

    // Remover artigo
    const handleRemoveArticle = async (articleId: number) => {
        if (!confirm('Remover este artigo da série?')) return;

        try {
            await fetch(`/scm/series/${seriesId}/articles/${articleId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });

            await fetchArticles();
        } catch (error) {
            console.error('Erro ao remover artigo:', error);
        }
    };

    // Drag and Drop
    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();

        if (draggedItem === null || draggedItem === index) return;

        const newArticles = [...seriesArticles];
        const draggedArticle = newArticles[draggedItem];

        // Remove do índice antigo
        newArticles.splice(draggedItem, 1);

        // Insere no novo índice
        newArticles.splice(index, 0, draggedArticle);

        setSeriesArticles(newArticles);
        setDraggedItem(index);
    };

    const handleDragEnd = async () => {
        setDraggedItem(null);

        // Atualizar ordem no backend
        const articlesWithOrder = seriesArticles.map((article, index) => ({
            id: article.id,
            order: index + 1,
        }));

        try {
            await fetch(`/scm/series/${seriesId}/articles/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
                body: JSON.stringify({ articles: articlesWithOrder }),
            });
        } catch (error) {
            console.error('Erro ao atualizar ordem:', error);
            // Recarregar em caso de erro
            fetchArticles();
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            published: 'default',
            draft: 'secondary',
            scheduled: 'outline',
        };

        const labels: Record<string, string> = {
            published: 'Publicado',
            draft: 'Rascunho',
            scheduled: 'Agendado',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {labels[status] || status}
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="text-center text-muted-foreground">
                Carregando...
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Lista de Artigos */}
            {seriesArticles.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-muted-foreground">
                        Nenhum artigo nesta série ainda
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {seriesArticles.map((article, index) => (
                        <div
                            key={article.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`flex items-center gap-3 rounded-lg border bg-card p-3 transition-all ${
                                draggedItem === index
                                    ? 'opacity-50'
                                    : 'cursor-move hover:bg-accent'
                            }`}
                        >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {index + 1}
                            </span>

                            <div className="flex-1">
                                <p className="font-medium">{article.title}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                {getStatusBadge(article.status)}

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        handleRemoveArticle(article.id)
                                    }
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Botão Adicionar */}
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setAddDialog(true)}
                disabled={availableArticles.length === 0}
            >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Artigo
            </Button>

            {availableArticles.length === 0 && seriesArticles.length > 0 && (
                <p className="text-center text-sm text-muted-foreground">
                    Todos os artigos disponíveis já estão nesta série
                </p>
            )}

            {/* Dialog de Adicionar */}
            <Dialog open={addDialog} onOpenChange={setAddDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Artigo à Série</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Select
                            value={selectedArticle}
                            onValueChange={setSelectedArticle}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um artigo" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableArticles
                                    .filter(
                                        (a) =>
                                            !seriesArticles.find(
                                                (sa) => sa.id === a.id,
                                            ),
                                    )
                                    .map((article) => (
                                        <SelectItem
                                            key={article.id}
                                            value={article.id.toString()}
                                        >
                                            {article.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setAddDialog(false);
                                setSelectedArticle('');
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleAddArticle}
                            disabled={!selectedArticle}
                        >
                            Adicionar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
