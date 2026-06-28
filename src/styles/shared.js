import { StyleSheet, Platform } from 'react-native';

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B111A',
  },
  scrollContent: {
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  sectionContainer: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  tradeCard: {
    backgroundColor: '#161B22',
    borderRadius: 0,
    padding: 0,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#2D333B',
    paddingVertical: 8,
  },
  tradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tradeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
  },
  monoText: {
    fontFamily: monoFont,
  },
});
