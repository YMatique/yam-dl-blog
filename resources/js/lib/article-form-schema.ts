import * as z from 'zod';

export const articleFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Título deve ter pelo menos 3 caracteres')
        .max(255, 'Título muito longo'),

    slug: z
        .string()
        .min(3, 'Slug deve ter pelo menos 3 caracteres')
        .max(255, 'Slug muito longo')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug deve conter apenas letras minúsculas, números e hífens',
        ),

    content: z.string().min(50, 'Conteúdo deve ter pelo menos 50 caracteres'),

    excerpt: z.string().max(500, 'Resumo muito longo').optional(),

    featured_image: z
        .string()
        .url('URL de imagem inválida')
        .optional()
        .or(z.literal('')),

    category_id: z.string().min(1, 'Selecione uma categoria').or(z.number()),

    series_id: z.string().optional().or(z.number().optional()),

    status: z.enum(['draft', 'published', 'scheduled'], {
        required_error: 'Selecione um status',
    }),

    published_at: z.string().optional().or(z.date().optional()),

    // SEO Fields
    meta_title: z
        .string()
        .max(60, 'Meta título muito longo (máx 60 caracteres)')
        .optional(),

    meta_description: z
        .string()
        .max(160, 'Meta descrição muito longa (máx 160 caracteres)')
        .optional(),

    meta_keywords: z.string().max(255, 'Meta keywords muito longo').optional(),

    // Tags (array de IDs)
    tags: z.array(z.number()).optional(),
});

export type ArticleFormData = z.infer<typeof articleFormSchema>;
