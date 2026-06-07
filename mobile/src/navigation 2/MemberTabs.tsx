import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import { DashboardScreen } from '../screens/member/DashboardScreen';
import { BookingsScreen } from '../screens/member/BookingsScreen';
import { BookRoomScreen } from '../screens/member/BookRoomScreen';
import { MembershipScreen } from '../screens/member/MembershipScreen';
import { InvoicesScreen } from '../screens/member/InvoicesScreen';
import { ProfileScreen } from '../screens/member/ProfileScreen';
import { SettingsScreen } from '../screens/member/SettingsScreen';
import { NotificationPreferencesScreen } from '../screens/member/NotificationPreferencesScreen';
import { AccountDeletionScreen } from '../screens/member/AccountDeletionScreen';
import { rootNavigationRef } from './RootNavigator';
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

function HomeHeaderButton(): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => rootNavigationRef.navigate('Public', { screen: 'Home' })}
      style={{ marginLeft: spacing.md }}
    >
      <Text style={{ color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '700' }}>Home</Text>
    </Pressable>
  );
}

export function MemberTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerLeft: () => <HomeHeaderButton />,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="Bookings" component={BookingsScreen} options={{ title: 'My Bookings' }} />
      <Tabs.Screen name="BookRoom" component={BookRoomScreen} options={{ title: 'Book Room', tabBarButton: () => null }} />
      <Tabs.Screen name="Membership" component={MembershipScreen} />
      <Tabs.Screen name="Invoices" component={InvoicesScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} options={{ title: 'Notifications', tabBarButton: () => null }} />
      <Tabs.Screen name="AccessStatus" options={{ title: 'Access', tabBarButton: () => null }}>{() => <PlaceholderScreen title="Access Status" />}</Tabs.Screen>
      <Tabs.Screen name="AccountDeletion" component={AccountDeletionScreen} options={{ title: 'Delete Account', tabBarButton: () => null }} />
    </Tabs.Navigator>
  );
}
