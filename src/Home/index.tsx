import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeRoutes} from '../../components/Navigation.tsx';
import MarketListPage from './MarketsListPage.tsx';
import MarketDetailPage from './MarketDetailPage.tsx';

const Drawer = createStackNavigator<HomeRoutes>();
// export const assets = [...welcomeAssets];
export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="MarketListPage" component={MarketListPage} />
      <Drawer.Screen name="MarketDetailPage" component={MarketDetailPage} />
    </Drawer.Navigator>
  );
};
