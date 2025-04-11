import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  progress: number;
};

export const AnimatedProgressBar = ({ progress }: Props) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
      backgroundColor:
        width.value < 30
          ? '#2ecc71'
          : width.value < 60
          ? '#3498db'
          : width.value < 90
          ? '#f1c40f'
          : '#e74c3c',
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, animatedStyle]} />
      <Text style={styles.label}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: '90%',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 20,
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
