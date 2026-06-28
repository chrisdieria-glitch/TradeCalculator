export function getPreciseFontSize(amountStr, amountWrapWidth) {
  if (!amountWrapWidth) return 16;
  const charWidth = 9.6;
  const estTextWidth = amountStr.length * charWidth;
  const ratio = (amountWrapWidth - 4) / estTextWidth;
  return Math.max(11, Math.min(16, Math.floor(16 * ratio)));
}
