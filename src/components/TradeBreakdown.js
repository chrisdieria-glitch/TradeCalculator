import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TRADES } from '../constants/trades';
import { formatCurrency } from '../utils/format';
import { getPreciseFontSize } from '../utils/font';
import { sharedStyles } from '../styles/shared';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function TradeBreakdown({ capitalNum, amountWrapWidth, onAmountLayout }) {
  return (
    <View style={styles.panel}>
      <Text style={sharedStyles.sectionTitle}>Allocations</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.colTrade, styles.headerText]}>Trade</Text>
        <Text style={[styles.colSize, styles.headerText]}>Size</Text>
        <Text style={[styles.colRisk, styles.headerText]}>Risk</Text>
        <Text style={[styles.colAmount, styles.headerText]}>Amount</Text>
      </View>

      {TRADES.map((trade) => {
        const amount = formatCurrency((capitalNum * trade.percent) / 100);
        return (
          <View key={trade.id} style={styles.row}>
            <View style={styles.colTrade}>
              <Text style={styles.tradeLabel}>{trade.label}</Text>
            </View>
            <View style={styles.colSize}>
              <Text style={styles.badgeText}>{trade.percent}%</Text>
            </View>
            <View style={styles.colRisk}>
              <Text style={styles.drawdownText}>{trade.bajada}%</Text>
            </View>
            <View style={styles.colAmount} onLayout={trade.id === 1 ? onAmountLayout : undefined}>
              <Text
                style={[
                  styles.amount,
                  { fontSize: getPreciseFontSize(amount, trade.id === 1 ? amountWrapWidth : amountWrapWidth) },
                ]}
              >
                ${amount}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
    marginBottom: 0,
  },
  headerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#484F58',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  colTrade: {
    width: 50,
    alignItems: 'center',
  },
  colSize: {
    minWidth: 40,
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  colRisk: {
    flex: 21,
    width: 44,
    alignItems: 'flex-start',
  },
  colAmount: {
    alignItems: 'flex-end',
    minWidth: 60,
    maxWidth: 130,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
  },
  tradeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#58A6FF',
    backgroundColor: 'rgba(74,144,217,0.08)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  drawdownText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F08784',
    backgroundColor: 'rgba(239,83,80,0.08)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
  },
});
