import { cn } from '@/lib/utils';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import TiptapToolbar from './tiptap-toolbar';

interface TiptapEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
    className?: string;
    onImageUpload?: () => void;
}

export default function TiptapEditor({
    content = '',
    onChange,
    placeholder = 'Comece a escrever...',
    editable = true,
    className,
    onImageUpload,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        editable,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm sm:prose lg:prose-lg xl:prose-xl',
                    'max-w-none focus:outline-none',
                    'min-h-[300px] p-4',
                    className,
                ),
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
    });

    // Atualizar conteúdo quando prop mudar
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    // Cleanup
    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-background">
            <TiptapToolbar editor={editor} onImageUpload={onImageUpload} />
            <EditorContent editor={editor} />

            {/* Word count */}
            <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
                <span>
                    {editor.storage.characterCount?.characters() || 0}{' '}
                    caracteres
                </span>
                <span>
                    {editor.storage.characterCount?.words() || 0} palavras
                </span>
            </div>
        </div>
    );
}
