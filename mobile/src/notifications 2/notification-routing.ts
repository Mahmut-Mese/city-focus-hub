import * as Notifications from 'expo-notifications';
import type { NavigationContainerRef } from '@react-navigation/native';

import type { RootStackParamList } from '../navigation/RootNavigator';
import type { MemberTabsParamList } from '../navigation/MemberTabs';

export type NotificationRouteTarget = {
  root: keyof RootStackParamList;
  screen?: keyof MemberTabsParamList;
};

const MEMBER_TAB_ROUTES: ReadonlyArray<keyof MemberTabsParamList> = [
  'Dashboard',
  'Bookings',
  'BookRoom',
  'Membership',
  'Invoices',
  'Profile',
  'Settings',
  'NotificationPreferences',
  'AccessStatus',
  'AccountDeletion',
];

function isMemberTabRoute(value: unknown): value is keyof MemberTabsParamList {
  return typeof value === 'string'
    && (MEMBER_TAB_ROUTES as ReadonlyArray<string>).includes(value);
}

function readString(record: Record<string, unknown> | null | undefined, key: string): string | undefined {
  if (!record) return undefined;
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

function classifyByEventType(eventType: string | undefined): keyof MemberTabsParamList {
  if (!eventType) {
    return 'Dashboard';
  }

  const normalized = eventType.toLowerCase();

  if (normalized.startsWith('booking.')) {
    return 'Bookings';
  }
  if (normalized.startsWith('membership.')) {
    return 'Membership';
  }
  if (normalized.startsWith('payment.') || normalized.startsWith('invoice.')) {
    return 'Invoices';
  }
  if (normalized.startsWith('access.')) {
    return 'AccessStatus';
  }

  return 'Dashboard';
}

export function resolveNotificationRoute(
  data: Record<string, unknown> | null | undefined,
): NotificationRouteTarget {
  const record = (data && typeof data === 'object') ? data : null;

  const explicitScreen = readString(record, 'screen');
  if (isMemberTabRoute(explicitScreen)) {
    return { root: 'Member', screen: explicitScreen };
  }

  const eventType = readString(record, 'eventType') ?? readString(record, 'type');
  const screen = classifyByEventType(eventType);

  return { root: 'Member', screen };
}

export function navigateToNotificationTarget(
  navigationRef:
    | NavigationContainerRef<RootStackParamList>
    | { isReady: () => boolean; navigate: (...args: unknown[]) => void }
    | null
    | undefined,
  target: NotificationRouteTarget,
): void {
  if (!navigationRef) {
    return;
  }

  try {
    if (typeof navigationRef.isReady === 'function' && !navigationRef.isReady()) {
      return;
    }
  } catch {
    return;
  }

  const navigate = navigationRef.navigate as unknown as (
    name: string,
    params?: Record<string, unknown>,
  ) => void;

  try {
    if (target.root === 'Member' && target.screen) {
      navigate('Member', { screen: target.screen });
      return;
    }
    navigate(target.root);
  } catch {
    // Swallow navigation errors so a malformed payload never crashes the app.
  }
}

export function handleNotificationResponse(
  response: Notifications.NotificationResponse | null | undefined,
  navigationRef:
    | NavigationContainerRef<RootStackParamList>
    | { isReady: () => boolean; navigate: (...args: unknown[]) => void }
    | null
    | undefined,
): NotificationRouteTarget | null {
  if (!response) {
    return null;
  }

  const data = response.notification?.request?.content?.data as
    | Record<string, unknown>
    | null
    | undefined;

  const target = resolveNotificationRoute(data);
  navigateToNotificationTarget(navigationRef, target);
  return target;
}

export function addNotificationResponseHandler(
  navigationRef:
    | NavigationContainerRef<RootStackParamList>
    | { isReady: () => boolean; navigate: (...args: unknown[]) => void }
    | null
    | undefined,
): { remove: () => void } {
  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    handleNotificationResponse(response, navigationRef);
  });

  return {
    remove: () => {
      try {
        subscription.remove();
      } catch {
        // ignore
      }
    },
  };
}
