import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Animated,
  ActivityIndicator,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Icon from 'react-native-remix-icon';

interface GradientButtonProps {
  title?: string | any;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle | TextStyle[];
  width?: number;
  height?: number;
  borderRadius?: number;
  padding?: number;
  iconName?: string;
  iconSecondName?: string;
  iconSize?: number;
  iconColor?: string;
  variant?: 'default' | 'primary';
  disabled?: boolean;
  svg?: boolean;
  svgname?: string;
  showLoading?: boolean; // Added prop to control loading indicator visibility
  backgroundColor?: string;
}

const Button: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  width,
  height,
  borderRadius,
  padding,
  iconName,
  iconSize,
  iconColor,
  iconSecondName,
  variant,
  disabled = false,
  svg = false,
  svgname,
  showLoading = false, // Default is false
  backgroundColor,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false);

  const handlePressIn = () => {
    if (!disabled && !loading) {
      // Spring animation when pressed
      Animated.spring(scaleValue, {
        toValue: 0.8,
        useNativeDriver: true,
        speed: 200, // Adjust the speed for pressing
      }).start();
    }
  };

  const handlePressOut = async () => {
    if (!disabled && !loading) {
      if (showLoading) {
        setLoading(true);
      }

      // Reset to the original size after the animation is complete
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200, // Adjust the speed for releasing
      }).start(async () => {
        await onPress();
        if (showLoading) {
          // Introduce a delay before hiding the loading indicator
          await new Promise(resolve => setTimeout(resolve, 800)); // Adjust the duration as needed
          setLoading(false);
        }
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.button,
        style,
        {
          width: width !== undefined ? width : undefined,
          height: height !== undefined ? height : undefined,
          borderRadius: borderRadius !== undefined ? borderRadius : undefined,
          opacity: disabled || loading ? 0.75 : undefined,
          padding: padding !== undefined ? padding : undefined,
          backgroundColor:
            backgroundColor !== undefined ? backgroundColor : undefined,
          transform: [{scale: scaleValue}],
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}>
      {showLoading && loading ? (
        <View
          style={[
            styles.button,
            style,
            {
              backgroundColor:
                backgroundColor !== undefined ? backgroundColor : undefined,
              width: width !== undefined ? width : undefined,
              height: height !== undefined ? height : undefined,
              borderRadius:
                borderRadius !== undefined ? borderRadius : undefined,
              opacity: disabled || loading ? 0.75 : undefined,
              padding: padding !== undefined ? padding : undefined,
            },
          ]}>
          <ActivityIndicator color="white" style={styles.loadingIndicator} />
        </View>
      ) : (
        <>
          {svg === true && svgname !== undefined && (
            <SvgXml xml={svgname} width={25} height={25} />
          )}

          {iconName !== undefined && (
            <Icon
              name={iconName}
              size={iconSize !== undefined ? iconSize : 16}
              color={iconColor !== undefined ? iconColor : 'white'}
            />
          )}
          {iconSecondName !== undefined && (
            <Icon
              name={iconSecondName}
              size={iconSize !== undefined ? iconSize : 16}
              color={iconColor !== undefined ? iconColor : 'white'}
            />
          )}

          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
    backgroundColor: '#2196F3',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});

export default Button;
