import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TRADES } from '../constants/trades';
import { sharedStyles } from '../styles/shared';
import { getPreciseFontSize } from '../utils/font';

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
  const [profitWidth, setProfitWidth] = useState(0);

  return (
    <View style={styles.panel}>
      
      <Text style={sharedStyles.sectionTitle}>Trade History</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.colTrade, styles.headerText]}>Trade</Text>
        <Text style={[styles.colPrices, styles.headerText]}>Prices</Text>
        <Text style={[styles.colProfit, styles.headerText]}>Profit</Text>
      </View>

      {trades.map((trade, index) => {
        const profitData = profits[index];
        const isPositive = profitData && profitData.amount.startsWith('+');
        const isNegative = profitData && profitData.amount.startsWith('-');
        const hasEntry = trade.entryPrice !== null;

        return (
          <View key={index} style={styles.row}>
            <View style={styles.colTrade}>
              <Text style={styles.tradeLabel}>{TRADES[index].label}</Text>
            </View>
            <View style={styles.colPrices}>
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>Entry:</Text>
                <TextInput
                  ref={el => { entryRefs.current[index] = el; }}
                  style={[styles.input, styles.entryInput]}
                  placeholder="0.00"
                  placeholderTextColor="#484F58"
                  keyboardType="decimal-pad"
                  value={hasEntry ? trade.entryPrice : ''}
                  onChangeText={(text) => onEntryChange(index, text)}
                />
              </View>
              <View style={styles.priceLine}>
                <Text style={styles.priceLabel}>Close:</Text>
                    <TextInput
                      ref={el => { closeRefs.current[index] = el; }}
                      style={[styles.input, styles.closeInput]}
                      placeholder="0.00"
                      placeholderTextColor="#484F58"
                      keyboardType="decimal-pad"
                      value={trade.closePrice}
                      onChangeText={(text) => onCloseChange(index, text)}
                    />
              </View>
            </View>
            <View style={styles.grid}>
              <View style={styles.colProfit}>
                {profitData ? (
                  <View style={styles.profitStack}>
                    <Text
                      style={[
                        styles.profitPercent,
                        isPositive && styles.profitPositive,
                        isNegative && styles.profitNegative,
                      ]}
                    >
                      {profitData.percent}
                    </Text>
                    <Text
                      onLayout={index === 0 ? (e) => setProfitWidth(e.nativeEvent.layout.width) : undefined}
                      style={[
                        styles.profitAmount,
                        isPositive && styles.profitPositive,
                        isNegative && styles.profitNegative,
                        { fontSize: getPreciseFontSize(profitData.amount, profitWidth || 80) },
                      ]}
                    >
                      {profitData.amount}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.profitEmpty}>—</Text>
                )}
              </View>
              <View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => onDeleteEntry(index)}>
                    
                  <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
              </View>
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
    width: 50,
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    marginRight: 20,
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
  input: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
    fontFamily: monoFont,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
    width: 80,
    marginRight: 5,
    textAlign: 'right',
  },
  entryInput: {
    color: '#26A69A'
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
    fontSize: 20,
    fontWeight: '600',
    color: '#484F58',
    lineHeight: 18,
  },
  profitStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profitPercent: {
    fontSize: 12,
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
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 5,
  }
});
