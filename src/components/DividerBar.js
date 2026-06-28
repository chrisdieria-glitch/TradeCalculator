import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DividerBar({ canAddRow, onAddRow}) {
  return (
    <View style={styles.bar}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, !canAddRow && styles.buttonDisabled]}
          onPress={onAddRow}
        >
          <Text style={[styles.buttonText, !canAddRow && styles.buttonTextDisabled]}>
            + Add entry and close price
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4A90D9',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    borderColor: '#30363D',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90D9',
  },
  buttonTextDisabled: {
    color: '#484F58',
  },
});
