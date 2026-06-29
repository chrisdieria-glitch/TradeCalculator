# Fix Duplicate Back Button in History

## Problem
`OperationView` in `src/screens/HistoryScreen.js` has its own back button, duplicating the global one rendered by `HistoryScreen` at line 217. This creates two identical "← Back" buttons on the Saved Operation screen.

## Edits needed in `src/screens/HistoryScreen.js`

### Edit 1 — Remove `onBack` prop from OperationView call (line 203)
```
- return <OperationView operationId={current.id} onBack={pop} />;
+ return <OperationView operationId={current.id} />;
```

### Edit 2 — Remove `onBack` parameter from OperationView function (line 232)
```
- function OperationView({ operationId, onBack }) {
+ function OperationView({ operationId }) {
```

### Edit 3 — Remove back button JSX from OperationView return (lines 249-252)
Delete the entire `<Pressable>` block:
```
-      <Pressable style={styles.backBtn} onPress={onBack}>
-        <Text style={styles.backArrow}>←</Text>
-        <Text style={styles.backLabel}>Back</Text>
-      </Pressable>
```

## Verification
- Every History screen has exactly one back button
- Navigation always moves back one level at a time
- Build: `npx expo export --platform web` (259 modules, ~540 kB)
