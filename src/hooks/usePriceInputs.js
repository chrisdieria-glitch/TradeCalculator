import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { MAX_TRADES } from '../constants/trades';
import { sanitizeDecimalInput } from '../utils/sanitize';

export function usePriceInputs() {
  const [prices, setPrices] = useState([]);
  const priceRefs = useRef([]);
  const prevPricesLength = useRef(0);
  const scrollPendingRef = useRef(false);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    if (prices.length > prevPricesLength.current) {
      const lastIdx = prices.length - 1;
      const inputRef = priceRefs.current[lastIdx];
      if (inputRef) {
        inputRef.focus();
        scrollPendingRef.current = true;
      }
    }
    prevPricesLength.current = prices.length;
  }, [prices.length]);

  useEffect(() => {
    const onKeyboardShow = () => {
      if (scrollPendingRef.current) {
        scrollPendingRef.current = false;
        scrollRef.current?.scrollToEnd({ animated: true });
      }
    };
    const sub = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    return () => sub.remove();
  }, []);

  const handleAddPrice = () => {
    if (prices.length < MAX_TRADES) {
      setPrices([...prices, '']);
    }
  };

  const handlePriceChange = (index, text) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned === null) return;
    const next = [...prices];
    next[index] = cleaned;
    setPrices(next);
  };

  const handleDeletePrice = (index) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  return {
    prices,
    priceRefs,
    scrollRef,
    handleAddPrice,
    handlePriceChange,
    handleDeletePrice,
  };
}
