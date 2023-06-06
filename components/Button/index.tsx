import React from 'react';
import Colors from '../../constants/Colors';
import { Button as NativeButton, useColorScheme } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
  const colorScheme = useColorScheme();

  return (
    <NativeButton title={title} onPress={onPress} color={Colors[colorScheme ?? 'light'].tint} />
  );
};

export default Button;
