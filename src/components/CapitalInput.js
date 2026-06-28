import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { sharedStyles } from '../styles/shared';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function CapitalInput({ capital, onChange, hasValidCapital, formattedCapital }) {
  return (
    <View style={styles.panel}>
      <Text style={sharedStyles.sectionTitle}>Total Capital</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#484F58"
        keyboardType="decimal-pad"
        value={capital}
        onChangeText={onChange}
      />
      {hasValidCapital && (
        <Text style={styles.totalValue}>${formattedCapital}</Text>
      )}
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
  input: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E6EDF3',
    fontFamily: monoFont,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
  },
  totalValue: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
    textAlign: 'right',
  },
});
