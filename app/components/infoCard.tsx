import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InfoCardProps {
  Icon: React.ElementType;
  label: string;
  value: string;
}

const InfoCard = ({ Icon, label, value }: InfoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon size={20} color="#00ff99" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  )
}

export default InfoCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1a1a1a', // Subtle dark border
    backgroundColor: '#0a0a0a',
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#8a8a8a',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  value: {
    color: '#00ff99',
    fontSize: 14,
    fontWeight: '600',
  },
})