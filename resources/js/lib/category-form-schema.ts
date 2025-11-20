import * as z from 'zod';

export const categoryFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(255, 'Nome muito longo'),

    slug: z
        .string()
        .min(2, 'Slug deve ter pelo menos 2 caracteres')
        .max(255, 'Slug muito longo')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug deve conter apenas letras minúsculas, números e hífens',
        ),

    description: z.string().optional().or(z.literal('')),

    image: z.string().optional().nullable().or(z.literal('')),

    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve estar no formato #RRGGBB')
        .optional()
        .or(z.literal('')),

    order: z
        .number()
        .int()
        .min(0, 'Ordem deve ser maior ou igual a 0')
        .optional()
        .or(z.literal(0)),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
