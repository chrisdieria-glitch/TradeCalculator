import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TRADES } from '../constants/trades';
import { sharedStyles } from '../styles/shared';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function TradePriceTable({
  trades, entryRefs, closeRefs,
  onEntryChange, onCloseChange,
  onDeleteEntry, onDeleteClose,
  profits,
}) {
  return (
    <View style={styles.panel}>
      <Text style={sharedStyles.sectionTitle}>Trade History</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.colTrade, styles.headerText]}>Trade</Text>
        <Text style={[styles.colPrices, styles.headerText]}>Prices</Text>
        <Text style={[styles.colProfit, styles.headerText]}>Profit</Text>
      </View>

      {trades.map((trade, index) => {
        const profitStr = profits[index];
        const isPositive = profitStr && profitStr.startsWith('+');
        const isNegative = profitStr && profitStr.startsWith('-');
        const hasEntry = trade.entryPrice !== null;

        return (
          <View key={index} style={styles.row}>
            <Text style={styles.colTrade}>{TRADES[index].label}</Text>

            <View style={styles.colPrices}>
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>Entry:</Text>
                <TextInput
                  ref={el => { entryRefs.current[index] = el; }}
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#484F58"
                  keyboardType="decimal-pad"
                  value={hasEntry ? trade.entryPrice : ''}
                  onChangeText={(text) => onEntryChange(index, text)}
                />
                <TouchableOpacity
                  onPress={() => onDeleteEntry(index)}
                  style={styles.deleteButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>Close:</Text>
                {trade.closePrice !== null ? (
                  <>
                    <TextInput
                      ref={el => { closeRefs.current[index] = el; }}
                      style={styles.input}
                      placeholder="0.00"
                      placeholderTextColor="#484F58"
                      keyboardType="decimal-pad"
                      value={trade.closePrice}
                      onChangeText={(text) => onCloseChange(index, text)}
                    />
                    <TouchableOpacity
                      onPress={() => onDeleteClose(index)}
                      style={styles.deleteButton}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.deleteIcon}>×</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.dash}>—</Text>
                )}
              </View>
            </View>

            <View style={styles.colProfit}>
              {profitStr ? (
                <Text
                  style={[
                    styles.profitText,
                    isPositive && styles.profitPositive,
                    isNegative && styles.profitNegative,
                  ]}
                >
                  {profitStr}
                </Text>
              ) : (
                <Text style={styles.profitEmpty}>—</Text>
              )}
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
  },
  headerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#484F58',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  colTrade: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
  },
  colPrices: {
    flex: 2,
  },
  colProfit: {
    width: 90,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    width: 44,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
    fontFamily: monoFont,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
    minWidth: 90,
    textAlign: 'right',
  },
  dash: {
    fontSize: 14,
    fontWeight: '600',
    color: '#484F58',
    fontFamily: monoFont,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  deleteButton: {
    paddingLeft: 4,
    paddingVertical: 2,
  },
  deleteIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#484F58',
    lineHeight: 18,
  },
  profitText: {
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
});
