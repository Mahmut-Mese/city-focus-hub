import React from 'react';
import { Text, View } from 'react-native';

export function BookingStatusScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text>Booking status pending</Text>
      <Text>The server webhook remains the source of truth for booking payment status.</Text>
    </View>
  );
}
