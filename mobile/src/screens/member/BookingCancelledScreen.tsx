import React from 'react';
import { Text, View } from 'react-native';

export function BookingCancelledScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text>Booking payment cancelled</Text>
      <Text>The app does not change booking status here. Refresh bookings for server status.</Text>
    </View>
  );
}
