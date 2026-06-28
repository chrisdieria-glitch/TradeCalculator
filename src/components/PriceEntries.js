import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TRADES } from '../constants/trades';
import { sharedStyles } from '../styles/shared';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function PriceEntries({ prices, priceRefs, onChangePrice, onDeletePrice }) {
  return (
    <View style={styles.panel}>
      <Text style={sharedStyles.sectionTitle}>Entry Prices</Text>
      {prices.map((price, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.tradeLabel}>{TRADES[index].label} Entry</Text>
          <View style={styles.right}>
            <TextInput
              ref={el => { priceRefs.current[index] = el; }}
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#484F58"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(text) => onChangePrice(index, text)}
            />
            <TouchableOpacity
              onPress={() => onDeletePrice(index)}
              style={styles.deleteButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.deleteIcon}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
  },
  tradeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E6EDF3',
    fontFamily: monoFont,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
    minWidth: 110,
    textAlign: 'right',
  },
  deleteButton: {
    paddingLeft: 6,
    paddingVertical: 4,
  },
  deleteIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: '#484F58',
    lineHeight: 20,
  },
});
