export default function getSomenteNumero(valor: any): string {
  if (valor === null) return '';
  const valorFormatado = valor.replace(/[^0-9]/g, '');
  return valorFormatado;
}
