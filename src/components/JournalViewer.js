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

/**
 * Read-only display of a saved operation.
 * Mirrors the Calculator's layout without editable inputs.
 */
export default function JournalViewer({ operation }) {
  const { capital, trades, entryWeightedAvg, closeWeightedAvg, totalProfit } = operation;

  const hasClose = trades && trades.some((t) => t.closePrice !== null);
  const hasEntry = trades && trades.some((t) => t.entryPrice !== null);

  const formattedEntryAvg = entryWeightedAvg > 0 ? formatCurrency(entryWeightedAvg) : '0.00';
  const formattedCloseAvg = closeWeightedAvg > 0 ? formatCurrency(closeWeightedAvg) : '0.00';

  const formattedTotalProfit = (() => {
    if (totalProfit === null) return '$0.00';
    if (totalProfit === 0) return '$0.00';
    return totalProfit > 0
      ? `+$${formatCurrency(totalProfit)}`
      : `-$${formatCurrency(Math.abs(totalProfit))}`;
  })();

  const isProfitPositive = formattedTotalProfit.startsWith('+');
  const isProfitNegative = formattedTotalProfit.startsWith('-');

  return (
    <View>
      {/* Capital panel (read-only) */}
      <View style={styles.panel}>
        <Text style={sharedStyles.sectionTitle}>Total Capital</Text>
        <View style={styles.capitalRow}>
          <Text style={styles.capitalValue}>${formatCurrency(capital)}</Text>
        </View>
      </View>

      {/* Allocations table */}
      <View style={styles.panel}>
        <Text style={sharedStyles.sectionTitle}>Allocations</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.colTrade, styles.headerText]}>Trade</Text>
          <Text style={[styles.colSize, styles.headerText]}>Size</Text>
          <Text style={[styles.colRisk, styles.headerText]}>Risk</Text>
          <Text style={[styles.colAmount, styles.headerText]}>Amount</Text>
        </View>
        {TRADES.map((trade) => {
          const amount = formatCurrency((capital * trade.percent) / 100);
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
              <View style={styles.colAmount}>
                <Text style={styles.amount}>${amount}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Price entries table (read-only) */}
      {hasEntry && (
        <View style={styles.panel}>
          <Text style={sharedStyles.sectionTitle}>Trade History</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.colTrade, styles.headerText]}>Trade</Text>
            <Text style={[styles.colPrices, styles.headerText]}>Prices</Text>
            <Text style={[styles.colProfit, styles.headerText]}>Profit</Text>
          </View>
          {trades.map((trade, index) => {
            const entry = trade.entryPrice;
            const close = trade.closePrice;
            const profitCalc = (() => {
              if (entry && close) {
                const allocated = (capital * TRADES[index].percent) / 100;
                const quantity = allocated / entry;
                const p = (close - entry) * quantity;
                const pct = ((close - entry) / entry) * 100;
                return {
                  amount: p === 0 ? '$0.00' : p > 0 ? `+$${formatCurrency(p)}` : `-$${formatCurrency(Math.abs(p))}`,
                  percent: pct === 0 ? '0.00%' : `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`,
                };
              }
              return null;
            })();
            const isPos = profitCalc && profitCalc.amount.startsWith('+');
            const isNeg = profitCalc && profitCalc.amount.startsWith('-');

            return (
              <View key={index} style={styles.row}>
                <View style={styles.colTrade}>
                  <Text style={styles.tradeLabel}>{TRADES[index].label}</Text>
                </View>
                <View style={styles.colPrices}>
                  <View style={styles.priceLine}>
                    <Text style={styles.priceLabel}>Entry:</Text>
                    <Text style={styles.priceValue}>
                      {entry ? entry.toFixed(2) : '—'}
                    </Text>
                  </View>
                  <View style={styles.priceLine}>
                    <Text style={styles.priceLabel}>Close:</Text>
                    <Text style={styles.priceValue}>
                      {close ? close.toFixed(2) : '—'}
                    </Text>
                  </View>
                </View>
                <View style={styles.colProfit}>
                  {profitCalc ? (
                    <View style={styles.profitStack}>
                      <Text style={[styles.profitPercent, isPos && styles.profitPositive, isNeg && styles.profitNegative]}>
                        {profitCalc.percent}
                      </Text>
                      <Text style={[styles.profitAmount, isPos && styles.profitPositive, isNeg && styles.profitNegative]}>
                        {profitCalc.amount}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.profitEmpty}>—</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Summary */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryCol}>
          <Text style={styles.summaryLabel}>Entry Average</Text>
          <Text style={styles.summaryValue}>${formattedEntryAvg}</Text>
        </View>
        {hasClose && (
          <View style={styles.summaryCol}>
            <Text style={styles.summaryLabel}>Close Average</Text>
            <Text style={styles.summaryValue}>${formattedCloseAvg}</Text>
          </View>
        )}
        <View style={[styles.summaryCol, styles.summaryColRight]}>
          <Text style={styles.summaryLabel}>Total Profit</Text>
          <Text
            style={[
              styles.summaryProfit,
              isProfitPositive && styles.profitPositive,
              isProfitNegative && styles.profitNegative,
            ]}
          >
            {formattedTotalProfit}
          </Text>
        </View>
      </View>
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
  capitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  capitalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
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
    marginRight: 20,
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
  colPrices: {
    flex: 2,
  },
  colProfit: {
    width: 105,
    alignItems: 'flex-end',
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
    color: '#E6EDF3',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#484F58',
    paddingHorizontal: 20,
    paddingVertical: 5,
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
  priceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B949E',
    width: 38,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
    fontFamily: monoFont,
    paddingVertical: 2,
    paddingHorizontal: 6,
    textAlign: 'right',
  },
  profitStack: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  profitPercent: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: monoFont,
    lineHeight: 14,
  },
  profitAmount: {
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
  profitEmpty: {
    fontSize: 14,
    fontWeight: '600',
    color: '#484F58',
    fontFamily: monoFont,
  },
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  summaryColRight: {
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#484F58',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
  },
  summaryProfit: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: monoFont,
  },
});
