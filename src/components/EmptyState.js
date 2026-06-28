import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>No capital entered</Text>
      <Text style={styles.text}>
        Enter your trading capital above to see how it splits across 5 trades.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B949E',
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    color: '#484F58',
    textAlign: 'center',
    lineHeight: 20,
  },
});
