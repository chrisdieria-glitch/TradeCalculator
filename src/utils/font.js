export function getPreciseFontSize(amountStr, amountWrapWidth) {
  if (!amountWrapWidth) return 20;
  const estTextWidthAt20 = amountStr.length * 12;
  const ratio = (amountWrapWidth - 8) / estTextWidthAt20;
  return Math.max(12, Math.min(20, Math.floor(20 * ratio)));
}
