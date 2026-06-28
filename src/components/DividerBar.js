import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DividerBar({ canAddEntry, canAddClose, onAddEntry, onAddClose, showClose }) {
  return (
    <View style={styles.bar}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, !canAddEntry && styles.buttonDisabled]}
          onPress={onAddEntry}
        >
          <Text style={[styles.buttonText, !canAddEntry && styles.buttonTextDisabled]}>
            + Add Entry Price
          </Text>
        </TouchableOpacity>
        {showClose && (
          <TouchableOpacity
            style={[styles.button, !canAddClose && styles.buttonDisabled]}
            onPress={onAddClose}
          >
            <Text style={[styles.buttonText, !canAddClose && styles.buttonTextDisabled]}>
              + Add Close Price
            </Text>
          </TouchableOpacity>
        )}
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
