import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TRADES } from '../constants/trades';
import { sharedStyles } from '../styles/shared';

export default function PriceEntries({ prices, priceRefs, onChangePrice, onDeletePrice }) {
  return (
    <View>
      <Text style={sharedStyles.sectionTitle}>Entry Prices</Text>
      {prices.map((price, index) => (
        <View key={index} style={sharedStyles.tradeCard}>
          <View style={sharedStyles.tradeLeft}>
            <Text style={sharedStyles.tradeLabel}>{TRADES[index].label} Entry</Text>
          </View>
          <View style={styles.priceRight}>
            <TextInput
              ref={el => { priceRefs.current[index] = el; }}
              style={styles.priceInput}
              placeholder="Enter price"
              placeholderTextColor="#9CA3AF"
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
  priceInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    minWidth: 120,
    textAlign: 'right',
  },
  priceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  deleteIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9CA3AF',
    lineHeight: 22,
  },
});
