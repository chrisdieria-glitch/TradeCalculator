import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HistoryRow from './HistoryRow';
import { sharedStyles } from '../styles/shared';

/**
 * Renders a list of history items at a given hierarchy level.
 *
 * @param {object} props
 * @param {Array} props.items - Array of items to display.
 *   Each item should have at least a `label` and optionally a `profit`.
 *   Items at the 'days' level should have an `operations` array for drill-down.
 * @param {string} props.level - 'years', 'months', or 'days'
 * @param {function} props.onSelect - Called with the selected item.
 * @param {string} props.title - Section title (e.g. "History").
 */
export default function HistoryList({ items, level, onSelect, title }) {
  return (
    <View style={styles.container}>
      <Text style={sharedStyles.sectionTitle}>{title}</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>No saved operations</Text>
      ) : (
        items.map((item, index) => (
          <HistoryRow
            key={level === 'years' ? item.year : level === 'months' ? item.month : item.day}
            label={item.label}
            profit={item.profit}
            onPress={() => onSelect(item)}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 16,
  },
  empty: {
    fontSize: 14,
    color: '#484F58',
    textAlign: 'center',
    paddingVertical: 24,
  },
});
