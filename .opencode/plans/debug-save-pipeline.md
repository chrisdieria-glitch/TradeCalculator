# Debug Save Pipeline Plan

## Changes to make

### 1. `src/screens/CalculatorScreen.js`

**a.** Add Alert import (line 2):
```
import { ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
```

**b.** Replace handleSaveConfirm (lines 75-93) with:
```js
const handleSaveConfirm = async () => {
  setShowSaveConfirm(false);
  const now = new Date();
  const op = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    capital: capitalNum,
    trades: trades.map((t, i) => ({
      label: TRADES[i].label,
      percent: TRADES[i].percent,
      entryPrice: t.entryPrice !== '' ? parseFloat(t.entryPrice) : null,
      closePrice: t.closePrice !== '' && t.closePrice !== null ? parseFloat(t.closePrice) : null,
    })),
    entryWeightedAvg,
    closeWeightedAvg,
    totalProfit,
  };
  const result = await saveOperation(op);
  if (result === null) {
    Alert.alert('Save Failed', 'Could not save the operation. Check console for details.');
  }
};
```

### 2. `src/storage/journalStorage.js`

Add console.log at each pipeline step:

**a.** getOperations (before return):
```js
export async function getOperations() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('[journalStorage] getOperations: raw json =', json);
    if (!json) return [];
    const ops = JSON.parse(json);
    console.log('[journalStorage] getOperations: parsed ops =', ops.length, 'items');
    return ops.sort((a, b) => b.timestamp - a.timestamp);
  } catch (e) {
    console.log('[journalStorage] getOperations ERROR:', e);
    return [];
  }
}
```

**b.** saveOperation:
```js
export async function saveOperation(data) {
  try {
    const ops = await getOperations();
    const operation = {
      id: generateId(),
      timestamp: Date.now(),
      ...data,
    };
    ops.unshift(operation);
    const json = JSON.stringify(ops);
    console.log('[journalStorage] saveOperation: saving', ops.length, 'items, key:', STORAGE_KEY);
    await AsyncStorage.setItem(STORAGE_KEY, json);
    console.log('[journalStorage] saveOperation: SUCCESS');
    return operation;
  } catch (e) {
    console.log('[journalStorage] saveOperation ERROR:', e);
    return null;
  }
}
```

## How to test

1. Run `npx expo start --web`
2. Open browser dev tools (F12) → Console tab
3. Enter capital, add entry/close prices, save
4. Check console for `[journalStorage]` log messages
5. Before saving, run in console: `localStorage.getItem('@trading_calculator_journal')` → should be null
6. After saving, run same command → should show JSON data
7. Switch to History tab → should show "No saved operations yet" if save failed, or the grouped entry if it succeeded
