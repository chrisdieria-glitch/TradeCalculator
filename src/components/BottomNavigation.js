import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

const TABS = [
  { key: 'calculator', label: 'Calculator' },
  { key: 'history', label: 'History' },
];

export default function BottomNavigation({ activeTab, onTabChange }) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab.key)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderTopWidth: 1,
    borderTopColor: '#21262D',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
  },
  tabActive: {
    borderTopColor: '#26A69A',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#484F58',
    fontFamily: monoFont,
  },
  tabTextActive: {
    color: '#26A69A',
  },
});
