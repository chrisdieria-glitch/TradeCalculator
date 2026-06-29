# 📊 PositionLab MobileApp

The purpose of the app is to help traders divide a total trading capital into predefined allocations before opening positions and calculate weighted averages based on entry prices.

---

## ⚙️ Core Purpose

The application focuses on a single workflow:

**Enter capital → Calculate allocations → Add entry prices → Display weighted average**

---

## 🧮 Core Functionality

### Capital Allocation

The user inputs a total capital amount.

The app automatically splits it into five predefined allocations:

- Trade 1 → 5%
- Trade 2 → 10%
- Trade 3 → 20%
- Trade 4 → 40%
- Trade 5 → 25%

These allocations always sum to **100% of the entered capital**.

---

### Entry Price Handling

The user can optionally add entry prices for each trade.

When entry prices are provided, the application calculates a **weighted average entry price** based on:

- The predefined trade allocations
- The entered prices per trade

---

## 🧱 Tech Stack

- JavaScript
- React Native
- Expo 

---

## 📁 Project Architecture

```
 .
├──  AGENTS.md
├──  App.js
├──  app.json
├──  assets
├──  eslint.config.js
├──  LICENSE
├──  node_modules
├──  package-lock.json
├──  package.json
├── 󰂺 README.md
└── 󰣞 src
    ├──  components
    │   ├──  CapitalInput.js
    │   ├──  DividerBar.js
    │   ├──  EmptyState.js
    │   ├──  Header.js
    │   ├──  PriceEntries.js
    │   └──  TradeBreakdown.js
    ├──  constants
    │   └──  trades.js
    ├──  hooks
    │   └──  usePriceInputs.js
    ├──  screens
    │   └──  CalculatorScreen.js
    ├──  styles
    │   └──  shared.js
    └──  utils
        ├──  font.js
        ├──  format.js
        └──  sanitize.js


```

## 📱 UX / Design Principles

The application is designed for speed and simplicity in a mobile context.

Key principles:

- Minimize the number of taps required for each action
- Keep the interface clean and uncluttered
- Ensure calculations update automatically when capital or entry prices change
- Keep inputs responsive and easy to interact with on mobile
- Maintain synchronization between all trade-related data

---

## 🎯 Goal

TradingCalculator is designed to provide a fast and convenient tool for traders to:

- Allocate capital based on a fixed risk distribution strategy
- Quickly input trade data
- Obtain accurate weighted average entry prices
- Maintain a clean and efficient trading workflow
