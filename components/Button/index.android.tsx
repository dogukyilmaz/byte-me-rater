import React from 'react';
import Colors from '../../constants/Colors';
import { Pressable, Text, useColorScheme } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
  const colorScheme = useColorScheme();

  return (
    <Pressable>
      {({ pressed }) => (
        <Text
          onPress={onPress}
          style={{
            marginRight: 15,
            opacity: pressed ? 0.5 : 1,
            color: Colors[colorScheme ?? 'light'].tint,
          }}
        >
          {title}
        </Text>
        // <FontAwesome
        //   name='info-circle'
        //   size={25}
        //   color={Colors[colorScheme ?? 'light'].text}
        //   style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        // />
      )}
    </Pressable>
  );
};

export default Button;
