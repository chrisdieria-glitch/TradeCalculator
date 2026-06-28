import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { sanitizeDecimalInput } from '../utils/sanitize';
import { formatCurrency } from '../utils/format';
import { TRADES } from '../constants/trades';
import { useTradeState } from '../hooks/useTradeState';
import { sharedStyles } from '../styles/shared';
import Header from '../components/Header';
import CapitalInput from '../components/CapitalInput';
import EmptyState from '../components/EmptyState';
import TradeBreakdown from '../components/TradeBreakdown';
import DividerBar from '../components/DividerBar';
import TradePriceTable from '../components/TradePriceTable';
import TradeSummary from '../components/TradeSummary';

export default function CalculatorScreen() {
  const [capital, setCapital] = useState('');
  const [amountWrapWidth, setAmountWrapWidth] = useState(0);

  const {
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
    canAddRow,
  } = useTradeState();

  const handleCapitalChange = (text) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned === null) return;
    setCapital(cleaned);
  };

  const capitalNum = parseFloat(capital);
  const hasValidCapital = !isNaN(capitalNum) && capitalNum > 0;

  const profits = trades.map((trade, i) => {
    const entry = parseFloat(trade.entryPrice);
    const close = parseFloat(trade.closePrice);
    if (isNaN(entry) || entry <= 0 || isNaN(close) || close <= 0) return null;
    const allocated = (capitalNum * TRADES[i].percent) / 100;
    const quantity = allocated / entry;
    const profit = (close - entry) * quantity;
    if (profit === 0) return '$0.00';
    return profit > 0 ? `+$${formatCurrency(profit)}` : `-$${formatCurrency(Math.abs(profit))}`;
  });

  const entryWeightedAvg = (() => {
    let sum = 0;
    let totalWeight = 0;
    for (let i = 0; i < trades.length; i++) {
      const price = parseFloat(trades[i].entryPrice);
      if (!isNaN(price) && price > 0) {
        sum += price * TRADES[i].percent;
        totalWeight += TRADES[i].percent;
      }
    }
    return totalWeight > 0 ? sum / totalWeight : 0;
  })();

  const closeWeightedAvg = (() => {
    let sum = 0;
    let totalWeight = 0;
    for (let i = 0; i < trades.length; i++) {
      const price = parseFloat(trades[i].closePrice);
      if (!isNaN(price) && price > 0) {
        sum += price * TRADES[i].percent;
        totalWeight += TRADES[i].percent;
      }
    }
    return totalWeight > 0 ? sum / totalWeight : 0;
  })();

  const totalProfit = (() => {
    let total = 0;
    let hasAny = false;
    for (let i = 0; i < trades.length; i++) {
      const entry = parseFloat(trades[i].entryPrice);
      const close = parseFloat(trades[i].closePrice);
      if (isNaN(entry) || entry <= 0 || isNaN(close) || close <= 0) continue;
      const allocated = (capitalNum * TRADES[i].percent) / 100;
      const quantity = allocated / entry;
      total += (close - entry) * quantity;
      hasAny = true;
    }
    return hasAny ? total : null;
  })();

  const formattedEntryAvg = entryWeightedAvg > 0 ? formatCurrency(entryWeightedAvg) : '0.00';
  const formattedCloseAvg = closeWeightedAvg > 0 ? formatCurrency(closeWeightedAvg) : '0.00';

  const formattedTotalProfit = (() => {
    if (totalProfit === null) return '$0.00';
    if (totalProfit === 0) return '$0.00';
    return totalProfit > 0
      ? `+$${formatCurrency(totalProfit)}`
      : `-$${formatCurrency(Math.abs(totalProfit))}`;
  })();

  return (
    <KeyboardAvoidingView
      style={sharedStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={sharedStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header />

        <CapitalInput
          capital={capital}
          onChange={handleCapitalChange}
          hasValidCapital={hasValidCapital}
          formattedCapital={hasValidCapital ? formatCurrency(capitalNum) : ''}
        />

        {!hasValidCapital ? (
          <EmptyState />
        ) : (
          <TradeBreakdown
            capitalNum={capitalNum}
            amountWrapWidth={amountWrapWidth}
            onAmountLayout={(e) => { setAmountWrapWidth(e.nativeEvent.layout.width); }}
          />
        )}

        {hasValidCapital && (
          <DividerBar
            canAddRow={canAddRow}
            onAddRow={handleAddRow}
          />
        )}

        {hasValidCapital && trades.length > 0 && (
          <TradePriceTable
            trades={trades}
            entryRefs={entryRefs}
            closeRefs={closeRefs}
            onEntryChange={handleEntryChange}
            onCloseChange={handleCloseChange}
            onDeleteEntry={handleDeleteEntry}
            onDeleteClose={handleDeleteClose}
            profits={profits}
          />
        )}

        {hasValidCapital && trades.length > 0 && (
          <TradeSummary
            entryAvg={formattedEntryAvg}
            closeAvg={formattedCloseAvg}
            totalProfit={formattedTotalProfit}
            showClose={closeCount > 0}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
