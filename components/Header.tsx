import React from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-remix-icon';
import {useSelector} from 'react-redux';
import {Colors} from '../constants/Colors.ts';

interface HeaderProps {
  left?: {
    icon: string;
    onPress: () => void;
  };
  leftsecond?: {
    icon: string;
    onPress: () => void;
  };
  title?: string;
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
  variant?: 'default' | 'primary' | 'special';
}
const {height, width} = Dimensions.get('window');
const Header = ({
  left,
  title,
  right,
  dark,
  variant,
  leftsecond,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const {isDarkMode, theme} = useSelector((state: any) => state.themeReducer);
  const color = isDarkMode ? Colors.white : 'black';
  const headerStyle =
    variant === 'primary'
      ? {
          backgroundColor: theme.SECONDARY_BACKGROUND_COLOR,
          paddingTop: insets.top + 10,
        }
      : {marginTop: insets.top + 10};
  return (
    <>
      <View
        style={{
          ...headerStyle,
          borderBottomColor: variant === 'primary' && theme.SECONDARY_BACKGROUND_COLOR,
          borderBottomWidth: variant === 'primary' ? 1 : 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingBottom: 3,
        }}
        {...(Platform.OS === 'android' && {paddingTop: 'm'})}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {right ? (
            <Icon
              name={right.icon}
              iconRatio={0.4}
              onPress={right.onPress}
              size={25}
              align="center"
              {...{
                color:
                  variant === 'primary'
                    ? 'white'
                    : variant === 'default'
                    ? isDarkMode
                      ? 'white'
                      : 'black'
                    : color,
              }}
            />
          ) : undefined}
          {title && (
            <Text
              style={{
                color:
                  variant === 'primary'
                    ? 'white'
                    : variant === 'default'
                    ? isDarkMode
                      ? 'white'
                      : 'black'
                    : color,
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: 10,
              }}>
              {title.toUpperCase()}
            </Text>
          )}
        </View>

        {left ? (
          <View style={{flexDirection: 'row'}}>
            <View style={{marginHorizontal: 15}}>
              <Icon
                name={left.icon}
                iconRatio={0.4}
                onPress={left.onPress}
                size={25}
                align="center"
                {...{
                  color: color,
                }}
              />
            </View>
            {leftsecond && (
              <View>
                <Icon
                  name={leftsecond.icon}
                  iconRatio={0.4}
                  onPress={leftsecond.onPress}
                  size={25}
                  align="center"
                  {...{
                    color: color,
                  }}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={{width: 25}} />
        )}
      </View>
    </>
  );
};

Header.defaultProps = {dark: false};

export default Header;
