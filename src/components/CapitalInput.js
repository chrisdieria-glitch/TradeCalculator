import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CapitalInput({ capital, onChange, hasValidCapital, formattedCapital }) {
  return (
    <View style={styles.inputCard}>
      <Text style={styles.inputLabel}>Total Trading Capital</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your capital"
        placeholderTextColor="#9CA3AF"
        keyboardType="decimal-pad"
        value={capital}
        onChangeText={onChange}
      />
      {hasValidCapital && (
        <Text style={styles.totalValue}>
          = ${formattedCapital}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  totalValue: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
});
