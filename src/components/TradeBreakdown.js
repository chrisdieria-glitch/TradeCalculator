import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TRADES } from '../constants/trades';
import { formatCurrency } from '../utils/format';
import { getPreciseFontSize } from '../utils/font';
import { sharedStyles } from '../styles/shared';

export default function TradeBreakdown({ capitalNum, amountWrapWidth, onAmountLayout }) {
  return (
    <View style={styles.dashboard}>
      <Text style={sharedStyles.sectionTitle}>Trade Breakdown</Text>
      <View style={styles.tableHeader}>
        <View style={styles.tableHeaderLeft}>
          <Text style={styles.tableHeaderText}>Trade</Text>
          <Text style={styles.tableHeaderText}>Percent</Text>
          <Text style={styles.tableHeaderText}>Drop</Text>
        </View>
        <Text style={styles.tableHeaderText}>Amount</Text>
      </View>
      {TRADES.map((trade) => {
        const amount = formatCurrency((capitalNum * trade.percent) / 100);
        return (
          <View key={trade.id} style={sharedStyles.tradeCard}>
            <View style={sharedStyles.tradeLeft}>
              <Text style={sharedStyles.tradeLabel}>{trade.label}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{trade.percent}%</Text>
              </View>
              <View style={styles.drawdownBadge}>
                <Text style={styles.drawdownText}>{trade.bajada}% ↓</Text>
              </View>
            </View>
            <View style={styles.amountWrap} onLayout={onAmountLayout}>
              <Text style={[styles.amount, { fontSize: getPreciseFontSize(amount, amountWrapWidth) }]}>
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
  dashboard: {
    gap: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 4,
  },
  tableHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 0,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B82F6',
  },
  drawdownBadge: {
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  drawdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  amountWrap: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 8,
  },
});
