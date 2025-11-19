import * as z from 'zod';

export const seriesFormSchema = z.object({
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

    description: z.string().optional().or(z.literal('')),

    cover_image: z.string().optional().nullable().or(z.literal('')),

    is_complete: z.boolean().default(false),
});

export type SeriesFormData = z.infer<typeof seriesFormSchema>;
