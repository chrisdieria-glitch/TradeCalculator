import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { sharedStyles } from '../styles/shared';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function CapitalInput({ capital, onChange, hasValidCapital, formattedCapital, isLocked, onRequestEdit }) {
  return (
    <Pressable onPress={isLocked ? onRequestEdit : undefined}>
      <View style={styles.panel}>
        <Text style={sharedStyles.sectionTitle}>Total Capital</Text>
        <TextInput
          style={[styles.input, isLocked && styles.inputLocked]}
          placeholder="0.00"
          placeholderTextColor="#484F58"
          keyboardType="decimal-pad"
          value={capital}
          onChangeText={onChange}
          editable={!isLocked}
          pointerEvents={isLocked ? 'none' : undefined}
        />
        {hasValidCapital && (
          <View style={styles.totalRow}>
            <Text style={styles.totalValue}>${formattedCapital}</Text>
            {isLocked && <Text style={styles.lockedBadge}>Locked</Text>}
          </View>
        )}
      </View>
    </Pressable>
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
  inputLocked: {
    color: '#484F58',
  },
  totalRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#26A69A',
    fontFamily: monoFont,
  },
  lockedBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: monoFont,
  },
});
