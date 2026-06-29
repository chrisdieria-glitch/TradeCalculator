# PositionLab

## IMPORTANT

Read the exact versioned Expo documentation before writing any code:

https://docs.expo.dev/versions/v54.0.0/

---

# Description

PositionLab is a simple mobile platform built with React, React Native, Expo and Vite.

The purpose of the app is to help traders divide a trading capital into predefined allocations before opening positions. The user enters a total capital amount, and the application automatically calculates how much money should be allocated to each trade.

The project is intentionally simple and focuses on a single workflow:

**Enter capital → Calculate allocations → Add entry prices → Display weighted average**

---

# Core Functionality

The user enters a capital amount.

The application automatically calculates five allocations using the following percentages:

* Trade 1 → 5%
* Trade 2 → 10%
* Trade 3 → 20%
* Trade 4 → 40%
* Trade 5 → 25%

The five allocations should always add up to 100% of the entered capital.

The user can optionally add Entry Prices for each trade.

When one or more Entry Prices are entered, the application automatically calculates the weighted average entry price using the predefined trade percentages.

---

# Technologies

* JavaScript
* React Native
* Expo SDK v54

---

# Guidelines

* Keep the project simple and easy to understand.
* Comment the code, then I can understand it 
* Use modern React Native practices and functional components.
* Prioritize readability and maintainability over unnecessary complexity.
* Calculations should update automatically whenever the capital or entry prices change.
* Don't change anything unless I ask you.
* Before starting any task, check if there are installed skills relevant to the task using `npx skills find`.
* When you need up-to-date documentation for a library or framework, use the `context7` MCP tools.

## UX Principles

This application is designed for speed and simplicity.

Every interaction should require the fewest possible taps while keeping the interface clean.

When implementing new features:

* Prioritize a smooth mobile experience.
* Automatically focus newly created inputs whenever appropriate.
* Ensure the keyboard never hides the active input.
* Avoid cluttering the UI with unnecessary buttons or controls.
* Keep related data synchronized to prevent orphaned values.
* Prefer subtle interactions over permanently visible controls whenever possible.

---

# Goal

The goal of TradingCalculator is to provide a quick and convenient tool for traders to calculate how much capital should be allocated to each operation according to a fixed risk management strategy while providing the fastest possible workflow for entering trade information.

---

# Change Log

## 2026-06-26

- Initial project scaffolded with Expo SDK 54
- `App.js` implements the core trading calculator with:
  - 5 predefined trade allocations: 5%, 10%, 20%, 40%, 25%
  - Capital input with decimal validation (single `.` only, digits only)
  - Real-time per-trade amount calculation
  - Dashboard UI with trade breakdown, percentage badges, and drawdown indicators
  - Empty-state messaging when no capital is entered

## 2026-06-26

- Added trade price tracking feature:
  - "Add Trade Price" button on bottom left adds up to 5 price entry rows
  - Each row corresponds to a trade (Trade 1 Entry through Trade 5 Entry) with a styled text input
  - Weighted average entry price calculated automatically using trade allocation weights (5%, 10%, 20%, 40%, 25%)
  - Average displayed on bottom right, updates in real-time as prices are entered/modified
  - Empty/invalid price inputs are excluded from the calculation

## 2026-06-26

- Restructured layout: divider bar (Add Trade Price button + Weighted Avg) moved outside the capital ternary so it stays in a fixed position between trade breakdown and entry prices
  - Divider bar styled with top/bottom borders and light background
  - Add Trade Price button restyled with blue background and white text; turns gray when disabled (5 entries reached)
  - Weighted Avg only appears when at least one price entry exists
  - Entry prices section moved below the divider bar

## 2026-06-26

- Added UX improvements for entry price management:
  - New price inputs are automatically focused and keyboard opens automatically
  - ScrollView wrapped in KeyboardAvoidingView with `keyboardShouldPersistTaps` so keyboard never hides active input
  - Each price row has a small "×" delete button (subtle gray, no permanent clutter)
  - Deleting a price removes it from the array; remaining prices shift to stay synchronized with trades
  - `useRef`, `useEffect`, and `prevPricesLength` tracking for reliable auto-focus on add

## 2026-06-26

- Refined Trade Breakdown layout: amount text now has `flexShrink: 1` and `numberOfLines={1}` to prevent overflow with large capital values
- Improved focus speed: replaced `useEffect` with `useLayoutEffect` so newly added price inputs receive focus before the browser paints
- Improved scroll: `Keyboard` listener + `scrollToEnd` on `keyboardDidShow` ensures the active input scrolls into view after the keyboard height is accounted for
- Increased `scrollContent.paddingBottom` from 40 to 120 so inputs never sit behind the keyboard

## 2026-06-26

- All dollar amounts now formatted with thousands separators (e.g., $1,250,000.00) using `toLocaleString('en-US')`
  - Trade breakdown amounts
  - Total capital display
  - Weighted average entry price

## 2026-06-26

- Dynamic amount font sizing: replaced `flexShrink: 1` + `numberOfLines={1}` truncation with `getAmountFontSize` function that scales font from 20px down to 12px based on text length, ensuring full amounts are always visible without layout breaks

## 2026-06-26

- Replaced hardcoded font breakpoints with responsive `onLayout`-based font sizing: measures the actual available width for the amount text and calculates proportional font size, ensuring every value is fully visible on any screen width

## 2026-06-26

- Fixed amount text wrapping: removed `flexShrink: 1` from amount style so the Text never wraps to a second line
- Made font calculation reliably conservative: `* 12` char estimate, `- 8` safety margin, `Math.floor` rounding
- Added `paddingLeft: 8` to amount wrap for consistent gap between trade labels and amount values

## 2026-06-26

- Refactored monolithic `App.js` (443 lines) into modular architecture:
  - `src/constants/trades.js` — TRADES config array
  - `src/utils/format.js` — `formatCurrency()` utility
  - `src/utils/sanitize.js` — `sanitizeDecimalInput()` utility
  - `src/utils/font.js` — `getPreciseFontSize()` utility
  - `src/styles/shared.js` — shared StyleSheet styles
  - `src/hooks/usePriceInputs.js` — prices state, refs, auto-focus, keyboard scroll
  - `src/components/Header.js` — app title/subtitle
  - `src/components/CapitalInput.js` — capital input card
  - `src/components/EmptyState.js` — no-capital message
  - `src/components/TradeBreakdown.js` — 5-trade allocation breakdown
  - `src/components/DividerBar.js` — Add Trade Price button + weighted avg
  - `src/components/PriceEntries.js` — entry price input rows
  - `src/screens/CalculatorScreen.js` — orchestrator composing all components
  - `App.js` reduced to 3 lines (import + render CalculatorScreen)
  - No UI, behavior, or functionality changes

## 2026-06-26

- Complete UI redesign to professional trading platform aesthetic:
  - Dark navy background (`#0B111A`) with deep blue-gray surface panels (`#161B22`) and subtle panel borders (`#21262D`)
  - All shadows and rounded card styles removed; replaced with flat bordered panels
  - Monospace font (Menlo on iOS, monospace on Android) for all numeric values
  - Capital input: monospace 22px, single-line border underline, green total on right
  - Trade breakdown: table layout with column headers (Trade / Size / Risk / Amount), thin row separators (`#2D333B`), right-aligned monospace amounts
  - Percentage and drawdown badges: smaller padding, lower-contrast semi-transparent backgrounds
  - "Add Entry Price" button changed from filled blue to outlined style (border only, transparent bg, compact padding)
  - Weighted average in monospace green text
  - Entry prices: table layout with monospace inputs, subtle delete buttons, matching row separators
  - 8px spacing system throughout (8/16/24/32 scale)
  - Typography hierarchy: title 20px, labels 14px, monospace amounts default 16px (auto-scales to fit)
  - Green (`#26A69A`) reserved for positive financial values
  - Red (`#EF5350`) reserved for drawdown/risk indicators
  - Blue (`#4A90D9`) as accent for outlines and focus indicators
  - StatusBar set to light mode for dark background
  - All existing functionality and calculations preserved unchanged

## 2026-06-28

- Added capital input auto-lock with confirmation:
  - `src/components/ConfirmModal.js` — new dark-themed confirmation modal (semi-opaque overlay, teal confirm button)
  - `src/components/CapitalInput.js` — accepts `isLocked` and `onRequestEdit` props; when locked: input dims, `editable={false}`, `pointerEvents="none"`, "Locked" badge appears, tapping any part of the panel triggers unlock confirmation
  - `src/screens/CalculatorScreen.js` — 5-second inactivity timer locks capital input when `capital > 0`; confirmation modal asks "Are you sure?" before allowing edits; timer resets on each keystroke; cleanup on unmount

- Redesigned profit column in TradePriceTable:
  - Profit column now displays two vertically stacked lines: percentage return on top (11px), dollar amount below (dynamically sized via `getPreciseFontSize`)
  - Percentage calculated as `((close - entry) / entry) * 100`, formatted to 2 decimals with sign
  - Both lines share the same green/red color based on P&L direction
  - Column width increased from 90 to 105 for comfortable two-line layout

- Added complete Journal / History system:
  - `src/storage/journalStorage.js` — AsyncStorage abstraction layer with save, get, update, delete operations
  - `src/utils/historyGrouping.js` — hierarchy grouping (year/month/day) with aggregate profit calculation
  - `src/components/BottomNavigation.js` — persistent bottom tab bar (Calculator / History) with teal active indicator
  - `src/components/SaveButton.js` — outlined "Save Operation" button, visible only when profit exists
  - `src/components/HistoryRow.js` — pressable row with day/month/year label + signed profit display
  - `src/components/HistoryList.js` — scrollable list container for any hierarchy level
  - `src/components/JournalViewer.js` — read-only snapshot component mirroring calculator layout (capital, allocations, prices, summary)
  - `src/screens/HistoryScreen.js` — state-based hierarchical navigation: Root → Year → Month → Day → Operation
  - `App.js` — converted to navigation shell with animated horizontal slide between Calculator and History
  - `src/screens/CalculatorScreen.js` — added save handler that captures complete state and persists to AsyncStorage
  - `src/components/ConfirmModal.js` — added `cancelLabel` prop for generic use
- New dependency: `@react-native-async-storage/async-storage` with Expo config plugin
- All saved operations display read-only with the same layout and formatting as the active calculator

## 2026-06-28

- Debugged save pipeline:
  - Fixed `handleSaveConfirm` in `src/screens/CalculatorScreen.js`: replaced 3 separate `new Date()` calls with a single `const now = new Date()` for calendar consistency
  - Added return value check: `handleSaveConfirm` now checks if `saveOperation()` returned `null` and shows an `Alert` on failure
  - Added `console.log` tracing at each pipeline step in `src/storage/journalStorage.js`: `getOperations` (raw json read, parsed ops count, errors) and `saveOperation` (save start with key, success, errors)
  - Imported `Alert` from `react-native`
