import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function HistoryRow({ label, profit, onPress }) {
  const isPositive = profit > 0;
  const isNegative = profit < 0;

  const formattedProfit = (() => {
    if (profit === 0) return '$0.00';
    const abs = Math.abs(profit).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return profit > 0 ? `+$${abs}` : `-$${abs}`;
  })();

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      {profit !== undefined && (
        <Text
          style={[
            styles.profit,
            isPositive && styles.profitPositive,
            isNegative && styles.profitNegative,
          ]}
        >
          {formattedProfit}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E6EDF3',
  },
  profit: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: monoFont,
  },
  profitPositive: {
    color: '#26A69A',
  },
  profitNegative: {
    color: '#EF5350',
  },
});
