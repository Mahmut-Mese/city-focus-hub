import { getAdminAccountProfile, updateAdminAccount } from './admin-account.js';

export async function handleAdminAccountPage(request) {
  const method = request.method?.toLowerCase?.() ?? 'get';

  if (method === 'post') {
    const payload = request.payload ?? {};

    const updated = await updateAdminAccount({
      currentPassword: payload.currentPassword,
      email: payload.email,
      newPassword: payload.newPassword,
    });

    return {
      ok: true,
      email: updated.email,
      message: 'Account updated. Sign in again with the new credentials.',
    };
  }

  const profile = await getAdminAccountProfile();

  return {
    ok: true,
    email: profile.email,
  };
}
