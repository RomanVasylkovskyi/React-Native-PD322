import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View, Button, StyleSheet } from 'react-native';
import { AnimatedProgressBar } from '../../components/ui/AnimatedProgressBar';

export default function ProgressScreen() {
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setProgress((prev: number) => (prev + 25) % 125)
  };

  return (
    <View style={styles.container}>
      <AnimatedProgressBar progress={progress} />
    <TouchableOpacity onPress={handleNext} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
