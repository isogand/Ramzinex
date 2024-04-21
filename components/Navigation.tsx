import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type HomeNavigationProps<RouteName extends keyof HomeRoutes> = {
  navigation: StackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
};

export type AppRoutes = {
  Home: undefined;
};
export type HomeRoutes = {
  MarketListPage: undefined;
  MarketDetailPage: undefined;
};
