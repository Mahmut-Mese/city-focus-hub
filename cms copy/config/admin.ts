import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [new URL(env('FRONTEND_URL', 'http://localhost:8080')).origin],
      handler: (uid, { documentId, status }) => {
        const frontendUrl = env('FRONTEND_URL', 'http://localhost:8080').replace(/\/$/, '');
        const previewQuery = `preview=1&status=${status}`;

        const staticRoutes: Record<string, string> = {
          'api::homepage.homepage': '/',
          'api::site-setting.site-setting': '/',
          'api::about-page.about-page': '/about',
          'api::blog-page.blog-page': '/blog',
          'api::pricing-page.pricing-page': '/pricing',
          'api::faq-page.faq-page': '/faq',
          'api::meeting-rooms-page.meeting-rooms-page': '/meeting-rooms',
          'api::virtual-office-page.virtual-office-page': '/virtual-office',
          'api::contact-page.contact-page': '/contact',
          'api::privacy-policy-page.privacy-policy-page': '/privacy',
          'api::terms-page.terms-page': '/terms',
          'api::faq-item.faq-item': '/faq',
          'api::meeting-room.meeting-room': '/meeting-rooms',
          'api::pricing-plan.pricing-plan': '/pricing',
        };

        if (uid === 'api::blog-post.blog-post' && documentId) {
          return `${frontendUrl}/blog/${documentId}?${previewQuery}`;
        }

        const route = staticRoutes[uid];
        return route ? `${frontendUrl}${route}?${previewQuery}` : undefined;
      },
    },
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});

export default config;
