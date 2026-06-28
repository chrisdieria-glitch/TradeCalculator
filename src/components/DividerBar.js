import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DividerBar({ pricesLength, onAddPress, showAvg, formattedAvg }) {
  return (
    <View style={styles.dividerBar}>
      <TouchableOpacity
        style={[styles.addButton, pricesLength >= 5 && styles.addButtonDisabled]}
        onPress={onAddPress}
      >
        <Text style={styles.addButtonText}>Add Trade Price</Text>
      </TouchableOpacity>
      {showAvg && (
        <Text style={styles.avgText}>
          Weighted Avg: <Text style={styles.avgValue}>${formattedAvg}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dividerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  addButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avgText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  avgValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
});
