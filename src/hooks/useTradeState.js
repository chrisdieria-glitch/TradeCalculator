import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { MAX_TRADES } from '../constants/trades';
import { sanitizeDecimalInput } from '../utils/sanitize';

export function useTradeState() {
  const [trades, setTrades] = useState([]);
  const entryRefs = useRef([]);
  const closeRefs = useRef([]);
  const scrollPendingRef = useRef(false);
  const scrollRef = useRef(null);
  const prevTradesLen = useRef(0);
  const prevCloseCount = useRef(0);

  useLayoutEffect(() => {
    if (trades.length > prevTradesLen.current) {
      entryRefs.current[trades.length - 1]?.focus();
      scrollPendingRef.current = true;
    }
    prevTradesLen.current = trades.length;
  }, [trades.length]);

  useLayoutEffect(() => {
    const closeCount = trades.filter(t => t.closePrice !== null && t.closePrice !== '').length;
    if (closeCount > prevCloseCount.current) {
      for (let i = 0; i < trades.length; i++) {
        if (trades[i].closePrice === '') {
          closeRefs.current[i]?.focus();
          break;
        }
      }
      scrollPendingRef.current = true;
    }
    prevCloseCount.current = closeCount;
  }, [trades]);

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

  const handleAddRow = () => {
    if (trades.length < MAX_TRADES) {
      setTrades([...trades, { entryPrice: '', closePrice: '' }]);
    }
  };

  const handleEntryChange = (index, text) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned === null) return;
    setTrades(prev => {
      const next = [...prev];
      next[index] = { ...next[index], entryPrice: cleaned };
      return next;
    });
  };

  const handleCloseChange = (index, text) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned === null) return;
    setTrades(prev => {
      const next = [...prev];
      next[index] = { ...next[index], closePrice: cleaned };
      return next;
    });
  };

  const handleDeleteEntry = (index) => {
    setTrades(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteClose = (index) => {
    setTrades(prev => {
      const next = [...prev];
      next[index] = { ...next[index], closePrice: null };
      return next;
    });
  };

  const entryCount = trades.length;
  const closeCount = trades.filter(t => t.closePrice !== null && t.closePrice !== '').length;

  return {
    trades,
    entryCount,
    closeCount,
    entryRefs,
    closeRefs,
    scrollRef,
    handleAddRow,
    handleEntryChange,
    handleCloseChange,
    handleDeleteEntry,
    handleDeleteClose,
    canAddRow: entryCount < MAX_TRADES,
    canAddClose: entryCount < MAX_TRADES,
  };
}
