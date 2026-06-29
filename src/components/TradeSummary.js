import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function TradeSummary({ entryAvg, closeAvg, totalProfit, showClose }) {
  const isPositive = totalProfit && totalProfit.startsWith('+');
  const isNegative = totalProfit && totalProfit.startsWith('-');

  return (
    <View style={styles.bar}>
      <View style={styles.colLeft}>
        <Text style={styles.label}>Entry Average</Text>
        <Text style={styles.value}>${entryAvg}</Text>
      </View>
      {showClose && (
        <View style={styles.colCenter}>
          <Text style={styles.label}>Close Average</Text>
          <Text style={styles.value}>${closeAvg}</Text>
        </View>
      )}
      <View style={[styles.colRight, !showClose && styles.colRightAlone]}>
        <Text style={styles.label}>Total Profit</Text>
        <Text
          style={[
            styles.profitValue,
            isPositive && styles.profitPositive,
            isNegative && styles.profitNegative,
          ]}
        >
          {totalProfit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  colLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  colCenter: {
    flex: 1,
    alignItems: 'flex-start',
  },
  colRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  colRightAlone: {
    flex: 2,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 7,
    fontWeight: '600',
    color: '#484F58',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
  },
  profitValue: {
    fontSize: 14,
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
