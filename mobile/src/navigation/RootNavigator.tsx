import { NavigationContainer, DefaultTheme, createNavigationContainerRef, type LinkingOptions, type NavigatorScreenParams, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Pressable } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { MemberTabs, type MemberTabsParamList } from './MemberTabs';
import { PublicStack, type PublicStackParamList } from './PublicStack';
import { useAuth } from '../auth/AuthProvider';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token?: string } | undefined;
};

export type RootStackParamList = {
  Public: NavigatorScreenParams<PublicStackParamList> | undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Member: NavigatorScreenParams<MemberTabsParamList> | undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.foreground,
    border: colors.border,
    notification: colors.destructive,
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['leadenhallworks://'],
  config: {
    screens: {
      Public: {
        screens: {
          Home: '',
          Pricing: {
            path: 'pricing',
            exact: false,
          },
          MeetingRooms: 'meeting-rooms',
          MeetingRoomBooking: 'meeting-rooms/book',
          VirtualOffice: 'virtual-office',
          About: 'about',
          FAQ: 'faq',
          BlogList: 'blog',
          Contact: 'contact',
          Privacy: 'privacy',
          Terms: 'terms',
        },
      },
      Auth: {
        screens: {
          ResetPassword: 'reset-password',
        },
      },
      Member: {
        screens: {
          Dashboard: 'dashboard',
          Bookings: 'bookings',
          BookRoom: 'book-room',
          Membership: 'membership',
          Invoices: 'invoices',
          Profile: 'profile',
          Settings: 'settings',
          NotificationPreferences: 'notifications',
          AccountDeletion: 'account-deletion',
        },
      },
    },
  },
};

function _AuthPlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: spacing.xl, backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground, fontSize: typography.fontSize.xl, fontWeight: '600' }}>{title}</Text>
      <Text style={{ marginTop: spacing.sm, color: colors.mutedForeground }}>Auth screen placeholder.</Text>
    </View>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        contentStyle: { backgroundColor: colors.background },
        headerLeft: () => (
          <Pressable
            accessibilityRole="button"
            onPress={() => rootNavigationRef.navigate('Public', { screen: 'Home' })}
            style={{ marginLeft: spacing.sm }}
          >
            <Text style={{ color: colors.foreground, fontWeight: '700' }}>Home</Text>
          </Pressable>
        ),
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Reset Password' }} />
    </AuthStack.Navigator>
  );
}

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer ref={rootNavigationRef} theme={navigationTheme} linking={linking}>
      <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Public">
        {isAuthenticated ? (
          <RootStack.Group>
            <RootStack.Screen name="Public" component={PublicStack} />
            <RootStack.Screen name="Member" component={MemberTabs} />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen name="Public" component={PublicStack} />
            <RootStack.Screen name="Auth" component={AuthStackNavigator} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
