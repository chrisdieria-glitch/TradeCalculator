import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { getOperations, getOperation } from '../storage/journalStorage';
import {
  getHierarchyLevel,
  groupByYear,
  groupByMonth,
  groupByDay,
} from '../utils/historyGrouping';
import { sharedStyles } from '../styles/shared';
import HistoryList from '../components/HistoryList';
import HistoryRow from '../components/HistoryRow';
import JournalViewer from '../components/JournalViewer';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * History screen with hierarchical navigation:
 * Root → Years → Months → Days → Saved Operation
 */
export default function HistoryScreen({ reloadTrigger }) {
  const [operations, setOperations] = useState([]);
  const [navStack, setNavStack] = useState([{ level: 'root' }]);

  const current = navStack[navStack.length - 1];

  /**
   * Loads all operations from storage.
   */
  const loadOperations = useCallback(async () => {
    console.log('[HistoryScreen] loadOperations triggered, reloadTrigger =', reloadTrigger);
    const ops = await getOperations();
    console.log('[HistoryScreen] loadOperations returned', ops.length, 'items');
    if (ops.length > 0) {
      console.log('[HistoryScreen] first operation id =', ops[0].id, 'year =', ops[0].year, 'month =', ops[0].month, 'day =', ops[0].day);
    }
    setOperations(ops);
  }, [reloadTrigger]);

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  /**
   * Pushes a new level onto the navigation stack.
   */
  const push = (screen) => {
    setNavStack((prev) => [...prev, screen]);
  };

  /**
   * Pops the last level from the navigation stack.
   */
  const pop = () => {
    if (navStack.length > 1) {
      setNavStack((prev) => prev.slice(0, -1));
    }
  };

  /**
   * Renders the appropriate content based on current nav level.
   */
  const renderContent = () => {
    if (operations.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No saved operations yet</Text>
        </View>
      );
    }

    switch (current.level) {
      case 'root': {
        const level = getHierarchyLevel(operations);
        if (level === 'years') {
          const years = groupByYear(operations);
          return (
            <HistoryList
              title="History"
              items={years.map((y) => ({
                label: String(y.year),
                profit: y.profit,
                year: y.year,
              }))}
              level="years"
              onSelect={(item) => push({ level: 'year', year: item.year })}
            />
          );
        } else if (level === 'months') {
          const months = groupByMonth(operations);
          return (
            <HistoryList
              title="History"
              items={months.map((m) => ({
                label: m.monthLabel,
                profit: m.profit,
                month: m.month,
                year: operations[0].year,
              }))}
              level="months"
              onSelect={(item) => push({ level: 'month', year: item.year, month: item.month })}
            />
          );
        } else {
          const days = groupByDay(operations, operations[0].year, operations[0].month);
          return (
            <HistoryList
              title="History"
              items={days.map((d) => ({
                label: String(d.day),
                profit: d.profit,
                day: d.day,
                year: operations[0].year,
                month: operations[0].month,
                operations: d.operations,
              }))}
              level="days"
              onSelect={(item) => {
                if (item.operations && item.operations.length === 1) {
                  push({ level: 'operation', id: item.operations[0].id });
                } else {
                  push({ level: 'day', year: item.year, month: item.month, day: item.day });
                }
              }}
            />
          );
        }
      }

      case 'year': {
        const months = groupByMonth(operations, current.year);
        return (
          <HistoryList
            title={`${current.year}`}
            items={months.map((m) => ({
              label: m.monthLabel,
              profit: m.profit,
              month: m.month,
              year: current.year,
            }))}
            level="months"
            onSelect={(item) =>
              push({ level: 'month', year: item.year, month: item.month })
            }
          />
        );
      }

      case 'month': {
        const days = groupByDay(operations, current.year, current.month);
        return (
          <HistoryList
            title={`${MONTH_NAMES[current.month]} ${current.year}`}
            items={days.map((d) => ({
              label: String(d.day),
              profit: d.profit,
              day: d.day,
              operations: d.operations,
            }))}
            level="days"
            onSelect={(item) => {
              if (item.operations && item.operations.length === 1) {
                push({ level: 'operation', id: item.operations[0].id });
              } else {
                push({ level: 'day', year: current.year, month: current.month, day: item.day });
              }
            }}
          />
        );
      }

      case 'day': {
        const days = groupByDay(operations, current.year, current.month);
        const dayData = days.find((d) => d.day === current.day);
        if (!dayData) return null;
        return (
          <View style={styles.panel}>
            <Text style={sharedStyles.sectionTitle}>
              {MONTH_NAMES[current.month]} {current.day}, {current.year}
            </Text>
            {dayData.operations.map((op) => (
              <HistoryRow
                key={op.id}
                label={op.trades && op.trades.length > 0 ? `Strategy` : 'Operation'}
                profit={op.totalProfit}
                onPress={() => push({ level: 'operation', id: op.id })}
              />
            ))}
          </View>
        );
      }

      case 'operation': {
        return <OperationView operationId={current.id} onBack={pop} />;
      }

      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={sharedStyles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Back button */}
      {navStack.length > 1 && (
        <Pressable style={styles.backBtn} onPress={pop}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      )}

      {renderContent()}
    </ScrollView>
  );
}

/**
 * Displays a single saved operation in read-only mode.
 */
function OperationView({ operationId, onBack }) {
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    getOperation(operationId).then(setOperation);
  }, [operationId]);

  if (!operation) return null;

  const dateStr = new Date(operation.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View>
      <Pressable style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backLabel}>Back</Text>
      </Pressable>

      <Text style={styles.dateLabel}>{dateStr}</Text>
      <JournalViewer operation={operation} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 20,
    color: '#4A90D9',
    marginRight: 6,
    fontFamily: monoFont,
  },
  backLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90D9',
  },
  dateLabel: {
    fontSize: 12,
    color: '#8B949E',
    marginBottom: 16,
    fontFamily: monoFont,
  },
  panel: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#484F58',
  },
});
