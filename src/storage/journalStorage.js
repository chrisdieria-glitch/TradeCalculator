import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@trading_calculator_journal';

/**
 * Generates a unique ID for each saved operation.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * Retrieves all saved operations, sorted by timestamp descending.
 */
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

/**
 * Retrieves a single operation by id.
 */
export async function getOperation(id) {
  const ops = await getOperations();
  return ops.find((op) => op.id === id) || null;
}

/**
 * Saves a new operation. Prepends it to the stored list.
 */
export async function saveOperation(data) {
  try {
    console.log('[journalStorage] saveOperation: key =', STORAGE_KEY);
    console.log('[journalStorage] saveOperation: data received =', JSON.stringify(data).slice(0, 200));
    const ops = await getOperations();
    const operation = {
      id: generateId(),
      timestamp: Date.now(),
      ...data,
    };
    ops.unshift(operation);
    const json = JSON.stringify(ops);
    console.log('[journalStorage] saveOperation: setItem with', ops.length, 'items');
    await AsyncStorage.setItem(STORAGE_KEY, json);
    console.log('[journalStorage] saveOperation: setItem succeeded');
    // Read back immediately to verify persistence
    const readBack = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('[journalStorage] saveOperation: readBack len =', readBack ? readBack.length : 0);
    const parsedBack = readBack ? JSON.parse(readBack) : [];
    console.log('[journalStorage] saveOperation: readBack items =', parsedBack.length);
    console.log('[journalStorage] saveOperation: readBack first id =', parsedBack[0]?.id);
    console.log('[journalStorage] saveOperation: returning id =', operation.id);
    return operation;
  } catch (e) {
    console.log('[journalStorage] saveOperation ERROR:', e);
    return null;
  }
}

/**
 * Reads and logs all operations for debugging purposes.
 */
export async function debugReadOperations() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  console.log('[journalStorage] debugRead: key =', STORAGE_KEY);
  console.log('[journalStorage] debugRead: raw =', raw);
  if (raw) {
    const parsed = JSON.parse(raw);
    console.log('[journalStorage] debugRead: parsed count =', parsed.length);
    console.log('[journalStorage] debugRead: ids =', parsed.map((o) => o.id).join(', '));
  } else {
    console.log('[journalStorage] debugRead: no data found');
  }
}

/**
 * Updates an existing operation by id.
 */
export async function updateOperation(id, updates) {
  try {
    const ops = await getOperations();
    const index = ops.findIndex((op) => op.id === id);
    if (index === -1) return null;
    ops[index] = { ...ops[index], ...updates };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ops));
    return ops[index];
  } catch {
    return null;
  }
}

/**
 * Deletes an operation by id.
 */
export async function deleteOperation(id) {
  try {
    const ops = await getOperations();
    const filtered = ops.filter((op) => op.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}
