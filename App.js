import React, { useState, useRef, useCallback } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CalculatorScreen from './src/screens/CalculatorScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BottomNavigation from './src/components/BottomNavigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const switchTab = useCallback((tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === 'calculator' ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    if (tab === 'history') {
      setReloadTrigger((n) => n + 1);
    }
  }, [activeTab, slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.slideContainer, { transform: [{ translateX }] }]}>
        <View style={{ width: SCREEN_WIDTH }}>
          <CalculatorScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH }}>
          <HistoryScreen reloadTrigger={reloadTrigger} />
        </View>
      </Animated.View>
      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B111A',
  },
  slideContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
