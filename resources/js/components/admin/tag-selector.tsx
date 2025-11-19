// resources/js/components/tag-selector.tsx

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';

interface Tag {
    id: number;
    name: string;
}

interface TagSelectorProps {
    tags: Tag[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
    disabled?: boolean;
}

export default function TagSelector({
    tags,
    selectedIds,
    onChange,
    disabled = false,
}: TagSelectorProps) {
    const [open, setOpen] = useState(false);

    const selectedTags = tags.filter((tag) => selectedIds.includes(tag.id));

    const toggleTag = (tagId: number) => {
        if (selectedIds.includes(tagId)) {
            onChange(selectedIds.filter((id) => id !== tagId));
        } else {
            onChange([...selectedIds, tagId]);
        }
    };

    const removeTag = (tagId: number) => {
        onChange(selectedIds.filter((id) => id !== tagId));
    };

    return (
        <div className="space-y-2">
            {/* Tags Selecionadas */}
            {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                        <Badge
                            key={tag.id}
                            variant="secondary"
                            className="gap-1"
                        >
                            {tag.name}
                            <button
                                type="button"
                                onClick={() => removeTag(tag.id)}
                                disabled={disabled}
                                className="ml-1 rounded-full hover:bg-muted"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Selector */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={disabled}
                    >
                        {selectedTags.length > 0
                            ? `${selectedTags.length} tag(s) selecionada(s)`
                            : 'Selecione tags...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Buscar tag..." />
                        <CommandEmpty>Nenhuma tag encontrada.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {tags.map((tag) => (
                                <CommandItem
                                    key={tag.id}
                                    onSelect={() => {
                                        toggleTag(tag.id);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedIds.includes(tag.id)
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
