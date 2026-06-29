import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SaveButton({ visible, onPress }) {
  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Save Operation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#4A90D9',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90D9',
  },
});
