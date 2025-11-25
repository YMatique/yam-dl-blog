import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Plus, Edit, Trash2, GripHorizontal } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

interface FeaturedItem {
  id: number;
  type: 'hero_article' | 'featured_article' | 'featured_series';
  position: number;
  featuredable: { id: number; title: string; __typename: string } | null;
}

interface ArticleOption {
  id: number;
  title: string;
}

interface SeriesOption {
  id: number;
  title: string;
}

interface Props {
  items: FeaturedItem[];
  articles: ArticleOption[];
  series: SeriesOption[];
}

export default function FeaturedItems({ items, articles, series }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FeaturedItem | null>(null);
  const [type, setType] = useState<'hero_article' | 'featured_article' | 'featured_series'>('hero_article');
  const [featuredableId, setFeaturedableId] = useState('');
  const [position, setPosition] = useState(0);

  const resetForm = () => {
    setEditing(null);
    setType('hero_article');
    setFeaturedableId('');
    setPosition(0);
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (item: FeaturedItem) => {
    setEditing(item);
    setType(item.type);
    setFeaturedableId(item.featuredable?.id.toString() ?? '');
    setPosition(item.position);
    setOpen(true);
  };

  const handleSubmit = () => {
    const payload = {
      type,
      featuredable_type:
        editing?.featuredable?.__typename ||
        (type.includes('article') ? 'App\\Models\\Article' : 'App\\Models\\Series'),
      featuredable_id: Number(featuredableId),
      position,
    };
    if (editing) {
      router.put(`/admin/featured-items/${editing.id}`, payload, { onSuccess: () => setOpen(false) });
    } else {
      router.post('/admin/featured-items', payload, { onSuccess: () => setOpen(false) });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Excluir este item em destaque?')) {
      router.delete(`/admin/featured-items/${id}`);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    const payload = reordered.map((it, idx) => ({ id: it.id, position: idx }));
    router.post('/admin/featured-items/reorder', { items: payload });
  };

  const renderFeaturedableSelect = () => {
    if (type.includes('article')) {
      return (
        <Select value={featuredableId} onValueChange={setFeaturedableId}>
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="Selecione o artigo" />
          </SelectTrigger>
          <SelectContent>
            {articles.map((a) => (
              <SelectItem key={a.id} value={a.id.toString()}>{a.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    // series
    return (
      <Select value={featuredableId} onValueChange={setFeaturedableId}>
        <SelectTrigger className="col-span-2">
          <SelectValue placeholder="Selecione a série" />
        </SelectTrigger>
        <SelectContent>
          {series.map((s) => (
            <SelectItem key={s.id} value={s.id.toString()}>{s.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <AdminLayout title="Itens em Destaque" breadcrumbs={[{ label: 'Itens em Destaque' }]}> 
      <Head title="Itens em Destaque - Admin" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Itens em Destaque</h1>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Novo
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="featured-items" isDropDisabled={false}>
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Posição</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="w-32"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                    {(provided) => (
                      <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TableCell><GripHorizontal className="h-4 w-4 text-muted-foreground" /></TableCell>
                        <TableCell>{item.type.replace('_', ' ')}</TableCell>
                        <TableCell>{item.position}</TableCell>
                        <TableCell>{item.featuredable?.title ?? '—'}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar' : 'Criar'} Item em Destaque</DialogTitle>
            <DialogDescription>Selecione o tipo, o item relacionado e a posição.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right">Tipo</label>
              <Select value={type} onValueChange={(value) => setType(value as any)}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero_article">Hero Article</SelectItem>
                  <SelectItem value="featured_article">Featured Article</SelectItem>
                  <SelectItem value="featured_series">Featured Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right">Item</label>
              {renderFeaturedableSelect()}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right">Posição</label>
              <Input type="number" className="col-span-2" value={position} onChange={e => setPosition(Number(e.target.value))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit}>{editing ? 'Salvar' : 'Criar'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
