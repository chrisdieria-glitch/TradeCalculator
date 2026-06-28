import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { sanitizeDecimalInput } from '../utils/sanitize';
import { formatCurrency } from '../utils/format';
import { TRADES } from '../constants/trades';
import { usePriceInputs } from '../hooks/usePriceInputs';
import { sharedStyles } from '../styles/shared';
import Header from '../components/Header';
import CapitalInput from '../components/CapitalInput';
import EmptyState from '../components/EmptyState';
import TradeBreakdown from '../components/TradeBreakdown';
import DividerBar from '../components/DividerBar';
import PriceEntries from '../components/PriceEntries';

export default function CalculatorScreen() {
  const [capital, setCapital] = useState('');
  const [amountWrapWidth, setAmountWrapWidth] = useState(0);

  const {
    prices,
    priceRefs,
    scrollRef,
    handleAddPrice,
    handlePriceChange,
    handleDeletePrice,
  } = usePriceInputs();

  const handleCapitalChange = (text) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned === null) return;
    setCapital(cleaned);
  };

  const capitalNum = parseFloat(capital);
  const hasValidCapital = !isNaN(capitalNum) && capitalNum > 0;
  const formattedCapital = hasValidCapital ? formatCurrency(capitalNum) : '';

  const weightedAvg = (() => {
    let sum = 0;
    let totalWeight = 0;
    for (let i = 0; i < prices.length; i++) {
      const price = parseFloat(prices[i]);
      if (!isNaN(price) && price > 0) {
        sum += price * TRADES[i].percent;
        totalWeight += TRADES[i].percent;
      }
    }
    return totalWeight > 0 ? sum / totalWeight : 0;
  })();

  const formattedAvg = weightedAvg > 0 ? formatCurrency(weightedAvg) : '';

  return (
    <KeyboardAvoidingView
      style={sharedStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
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
          formattedCapital={formattedCapital}
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

        <DividerBar
          pricesLength={prices.length}
          onAddPress={handleAddPrice}
          showAvg={prices.length > 0}
          formattedAvg={formattedAvg}
        />

        {prices.length > 0 && (
          <PriceEntries
            prices={prices}
            priceRefs={priceRefs}
            onChangePrice={handlePriceChange}
            onDeletePrice={handleDeletePrice}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
