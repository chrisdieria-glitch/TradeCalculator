import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>PositionLab</Text>
      <Text style={styles.subtitle}>Capital allocation tool</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E6EDF3',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#8B949E',
    lineHeight: 18,
  },
});
