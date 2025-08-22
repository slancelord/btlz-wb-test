export function parseDecimal(value: string | undefined | null): number {
    if (!value) return 0;
    
    return parseFloat(value.replace(",", ".")) || 0;
}