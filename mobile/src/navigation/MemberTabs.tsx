import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/member/DashboardScreen';
import { BookingsScreen } from '../screens/member/BookingsScreen';
import { BookRoomScreen } from '../screens/member/BookRoomScreen';
import { MembershipScreen } from '../screens/member/MembershipScreen';
import { InvoicesScreen } from '../screens/member/InvoicesScreen';
import { ProfileScreen } from '../screens/member/ProfileScreen';
import { SettingsScreen } from '../screens/member/SettingsScreen';
import { NotificationPreferencesScreen } from '../screens/member/NotificationPreferencesScreen';
import { AccountDeletionScreen } from '../screens/member/AccountDeletionScreen';
import { Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export type MemberTabsParamList = {
  Dashboard: undefined;
  Bookings: undefined;
  BookRoom: undefined;
  Membership: undefined;
  Invoices: undefined;
  Profile: undefined;
  Settings: undefined;
  NotificationPreferences: undefined;
  AccessStatus: undefined;
  AccountDeletion: undefined;
};

const Tabs = createBottomTabNavigator<MemberTabsParamList>();

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: spacing.xl, backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground, fontSize: typography.fontSize.xl, fontWeight: '600' }}>{title}</Text>
      <Text style={{ marginTop: spacing.sm, color: colors.mutedForeground }}>Member screen placeholder.</Text>
    </View>
  );
}

export function MemberTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="Bookings" component={BookingsScreen} />
      <Tabs.Screen name="BookRoom" component={BookRoomScreen} options={{ title: 'Book Room' }} />
      <Tabs.Screen name="Membership" component={MembershipScreen} />
      <Tabs.Screen name="Invoices" component={InvoicesScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
      <Tabs.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} options={{ title: 'Notifications' }} />
      <Tabs.Screen name="AccessStatus" options={{ title: 'Access' }}>{() => <PlaceholderScreen title="Access Status" />}</Tabs.Screen>
      <Tabs.Screen name="AccountDeletion" component={AccountDeletionScreen} options={{ title: 'Delete Account' }} />
    </Tabs.Navigator>
  );
}
