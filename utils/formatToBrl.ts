export function formatToBrl (amount : (string|number)) {
  return Number(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}