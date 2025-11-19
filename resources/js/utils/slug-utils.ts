/**
 * Gera um slug a partir de um texto
 * Remove acentos, converte para lowercase e substitui espaços por hífens
 */
export function generateSlug(text: string): string {
    return text
        .toString()
        .normalize('NFD') // Normaliza caracteres Unicode
        .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos (acentos)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '') // Remove caracteres especiais
        .replace(/\-\-+/g, '-') // Substitui múltiplos hífens por um único
        .replace(/^-+/, '') // Remove hífen do início
        .replace(/-+$/, ''); // Remove hífen do final
}

/**
 * Valida se um slug é válido
 */
export function isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
