// components/StepIndicator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepIndicator = ({ step }) => {
  const steps = ['Select Date', 'Select Doctor', 'Doctor Availability', 'Patient Details'];
  
  return (
    <View style={styles.container}>
      {steps.map((label, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={[styles.circle, step === index + 1 ? styles.activeCircle : styles.inactiveCircle]}>
            <Text style={styles.circleText}>{index + 1}</Text>
          </View>
          <Text style={[styles.label, step === index + 1 ? styles.activeLabel : styles.inactiveLabel]}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeCircle: {
    backgroundColor: '#B71C1C',
  },
  inactiveCircle: {
    backgroundColor: '#ccc',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#B71C1C',
  },
  inactiveLabel: {
    color: '#ccc',
  },
});

export default StepIndicator;
