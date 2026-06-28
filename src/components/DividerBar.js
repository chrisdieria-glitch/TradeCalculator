import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function DividerBar({ pricesLength, onAddPress, showAvg, formattedAvg }) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity
        style={[styles.addButton, pricesLength >= 5 && styles.addButtonDisabled]}
        onPress={onAddPress}
      >
        <Text style={[styles.addButtonText, pricesLength >= 5 && styles.addButtonTextDisabled]}>
          + Add Entry Price
        </Text>
      </TouchableOpacity>
      {showAvg && (
        <Text style={styles.avgLabel}>
          Avg{' '}
          <Text style={styles.avgValue}>${formattedAvg}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#4A90D9',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonDisabled: {
    borderColor: '#30363D',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90D9',
  },
  addButtonTextDisabled: {
    color: '#484F58',
  },
  avgLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
  },
  avgValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
  },
});
