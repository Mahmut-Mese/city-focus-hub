import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

type VisibleTabName = 'Dashboard' | 'Bookings' | 'Membership' | 'Invoices' | 'Profile';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

const visibleTabs: VisibleTabName[] = ['Dashboard', 'Bookings', 'Membership', 'Invoices', 'Profile'];

const tabLabels: Record<VisibleTabName, string> = {
  Dashboard: 'Home',
  Bookings: 'Bookings',
  Membership: 'Plan',
  Invoices: 'Invoices',
  Profile: 'Profile',
};

const tabIcons: Record<VisibleTabName, { active: IconName; inactive: IconName }> = {
  Dashboard: { active: 'grid', inactive: 'grid-outline' },
  Bookings: { active: 'calendar', inactive: 'calendar-outline' },
  Membership: { active: 'card', inactive: 'card-outline' },
  Invoices: { active: 'receipt', inactive: 'receipt-outline' },
  Profile: { active: 'person-circle', inactive: 'person-circle-outline' },
};

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
      accessibilityLabel="Go to public home"
      hitSlop={8}
      onPress={() => rootNavigationRef.navigate('Public', { screen: 'Home' })}
      style={{ width: 44, height: 44, marginLeft: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
    >
      <Ionicons name="home-outline" size={22} color={colors.foreground} />
    </Pressable>
  );
}

function MemberTabBar({ state, navigation }: BottomTabBarProps): JSX.Element {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);
  const visibleRoutes = visibleTabs
    .map((name) => state.routes.find((route) => route.name === name))
    .filter((route): route is (typeof state.routes)[number] => Boolean(route));

  return (
    <View style={[styles.tabBar, { height: 64 + bottomInset, paddingBottom: bottomInset }]}>
      {visibleRoutes.map((route) => {
        const tabName = route.name as VisibleTabName;
        const routeIndex = state.routes.findIndex((candidate) => candidate.key === route.key);
        const focused = state.index === routeIndex;
        const color = focused ? colors.primary : colors.mutedForeground;
        const icon = tabIcons[tabName];

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(tabName);
          }
        };

        const handleLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : undefined}
            accessibilityLabel={tabLabels[tabName]}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={styles.tabItem}
          >
            <Ionicons name={focused ? icon.active : icon.inactive} size={24} color={color} />
            <Text allowFontScaling={false} numberOfLines={1} style={[styles.tabLabel, { color }]}>
              {tabLabels[tabName]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function MemberTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <MemberTabBar {...props} />}
      screenOptions={{
        headerLeft: () => <HomeHeaderButton />,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontSize: typography.fontSize.xl, fontWeight: '700' },
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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    shadowColor: colors.foreground,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    minWidth: 0,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    width: '100%',
    paddingHorizontal: 2,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
    textAlign: 'center',
  },
});
