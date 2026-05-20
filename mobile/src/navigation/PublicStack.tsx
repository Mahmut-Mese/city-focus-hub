import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { HomeScreen } from '../screens/public/HomeScreen';
import { AboutScreen } from '../screens/public/AboutScreen';
import { PricingScreen } from '../screens/public/PricingScreen';
import { MeetingRoomsScreen } from '../screens/public/MeetingRoomsScreen';
import { MeetingRoomBookingScreen } from '../screens/public/MeetingRoomBookingScreen';
import { VirtualOfficeScreen } from '../screens/public/VirtualOfficeScreen';
import { ContactScreen } from '../screens/public/ContactScreen';
import { FaqScreen } from '../screens/public/FaqScreen';
import { BlogListScreen } from '../screens/public/BlogListScreen';
import { BlogDetailScreen } from '../screens/public/BlogDetailScreen';
import { PrivacyScreen } from '../screens/public/PrivacyScreen';
import { TermsScreen } from '../screens/public/TermsScreen';

export type PublicStackParamList = {
  Home: undefined;
  Pricing: undefined;
  MeetingRooms: undefined;
  MeetingRoomBooking: { roomId?: string } | undefined;
  VirtualOffice: undefined;
  About: undefined;
  FAQ: undefined;
  BlogList: undefined;
  BlogDetail: { id: string };
  Contact: undefined;
  Privacy: undefined;
  Terms: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

function _PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: spacing.xl, backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground, fontSize: typography.fontSize.xl, fontWeight: '600' }}>{title}</Text>
      <Text style={{ marginTop: spacing.sm, color: colors.mutedForeground }}>Native screen placeholder.</Text>
    </View>
  );
}

export function PublicStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'The Leadenhall Works' }} />
      <Stack.Screen name="Pricing" component={PricingScreen} options={{ title: 'Membership' }} />
      <Stack.Screen name="MeetingRooms" component={MeetingRoomsScreen} options={{ title: 'Meeting Rooms' }} />
      <Stack.Screen name="MeetingRoomBooking" component={MeetingRoomBookingScreen} options={{ title: 'Book Meeting Room' }} />
      <Stack.Screen name="VirtualOffice" component={VirtualOfficeScreen} options={{ title: 'Virtual Office' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      <Stack.Screen name="FAQ" component={FaqScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen name="BlogList" component={BlogListScreen} options={{ title: 'Blog' }} />
      <Stack.Screen name="BlogDetail" component={BlogDetailScreen} options={{ title: 'Blog Detail' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms' }} />
    </Stack.Navigator>
  );
}
