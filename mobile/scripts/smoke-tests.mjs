import { readFileSync } from 'node:fs';

function assertContains(file, text) {
  const content = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  if (!content.includes(text)) {
    throw new Error(`${file} missing ${text}`);
  }
  console.log(`PASS ${file} contains ${text}`);
}

assertContains('src/auth/secure-storage.ts', 'getStoredSession');
assertContains('src/auth/AuthProvider.tsx', 'export function AuthProvider');
assertContains('src/auth/AuthProvider.tsx', 'export function useAuth');
assertContains('src/api/client.ts', 'Authorization');
assertContains('src/api/member-api.ts', 'fetchAccountDeletionStatus');
assertContains('src/navigation/RootNavigator.tsx', 'leadenhallworks://');
assertContains('src/navigation/RootNavigator.tsx', 'reset-password');
assertContains('src/navigation/MemberTabs.tsx', 'AccountDeletionScreen');
assertContains('App.tsx', 'version-policy');
assertContains('App.tsx', 'addNotificationResponseHandler');
console.log('PASS mobile smoke tests');
