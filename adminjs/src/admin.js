import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AdminJS, { ComponentLoader } from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { config } from './config.js';
import { getContentPageDefinitions, handleContentPage } from './content-pages.js';
import { getCollectionPageDefinitions, handleCollectionPage } from './collection-pages.js';
import { getMediaPageDefinitions, handleMediaPage } from './media-pages.js';
import { getOperationsPageDefinitions, handleOperationsPage } from './operations-pages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter({
  Database: AdminJSSequelize.Database,
  Resource: AdminJSSequelize.Resource,
});

const componentLoader = new ComponentLoader();
const dashboardComponent = componentLoader.add(
  'Dashboard',
  path.join(__dirname, 'components', 'Dashboard.jsx'),
);
const collectionManagerComponent = componentLoader.add(
  'CollectionManager',
  path.join(__dirname, 'components', 'CollectionManager.jsx'),
);
const contentPageEditorComponent = componentLoader.add(
  'ContentPageEditor',
  path.join(__dirname, 'components', 'ContentPageEditor.jsx'),
);
const mediaLibraryComponent = componentLoader.add(
  'MediaLibrary',
  path.join(__dirname, 'components', 'MediaLibrary.jsx'),
);
const accountSettingsComponent = componentLoader.add(
  'AccountSettings',
  path.join(__dirname, 'components', 'AccountSettings.jsx'),
);
const refundRequestsComponent = componentLoader.add(
  'RefundRequests',
  path.join(__dirname, 'components', 'RefundRequests.jsx'),
);

componentLoader.override(
  'Sidebar',
  path.join(__dirname, 'components', 'Sidebar.jsx'),
);
componentLoader.override(
  'Login',
  path.join(__dirname, 'components', 'Login.jsx'),
);
componentLoader.override(
  'TopBar',
  path.join(__dirname, 'components', 'TopBar.jsx'),
);

const contentPages = Object.fromEntries(
  getContentPageDefinitions().map((definition) => [
    definition.name,
    {
      label: definition.label,
      icon: definition.icon,
      component: contentPageEditorComponent,
      handler: async (request) => handleContentPage(definition.name, request),
    },
  ]),
);

const pageTranslations = Object.fromEntries(
  [...getContentPageDefinitions(), ...getCollectionPageDefinitions(), ...getMediaPageDefinitions(), ...getOperationsPageDefinitions()]
    .map((definition) => [definition.name, definition.pluralLabel ?? definition.label]),
);

const collectionPages = Object.fromEntries(
  getCollectionPageDefinitions().map((definition) => [
    definition.name,
    {
      label: definition.pluralLabel,
      icon: definition.icon,
      component: collectionManagerComponent,
      handler: async (request) => handleCollectionPage(definition.name, request),
    },
  ]),
);

const mediaPages = Object.fromEntries(
  getMediaPageDefinitions().map((definition) => [
    definition.name,
    {
      label: definition.label,
      icon: 'Media',
      component: mediaLibraryComponent,
      handler: async (request) => handleMediaPage(definition.name, request),
    },
  ]),
);

const operationsPages = Object.fromEntries(
  getOperationsPageDefinitions().map((definition) => [
    definition.name,
    {
      label: definition.pluralLabel,
      icon: definition.icon,
      component: collectionManagerComponent,
      handler: async (request) => handleOperationsPage(definition.name, request),
    },
  ]),
);

const accountPages = {
  account: {
    label: 'Account',
    icon: 'User',
    component: accountSettingsComponent,
    handler: async (request) => {
      const { handleAdminAccountPage } = await import('./account-page.js');
      return handleAdminAccountPage(request);
    },
  },
};

const refundRequestsPages = {
  'refund-requests': {
    label: 'Refund Requests',
    icon: 'DollarSign',
    component: refundRequestsComponent,
    handler: async () => ({}),
  },
};

export function createAdmin(resources) {
  return new AdminJS({
    rootPath: config.rootPath,
    componentLoader,
    branding: {
      companyName: 'The Leadenhall Works Admin',
      logo: '/admin-assets/logo.svg',
      withMadeWithLove: false,
    },
    resources: [
      ...resources,
    ],
    pages: {
      ...contentPages,
      ...collectionPages,
      ...operationsPages,
      ...mediaPages,
      ...accountPages,
      ...refundRequestsPages,
    },
    locale: {
      translations: {
        labels: {
          navigation: 'Content',
          pages: 'Pages',
        },
        pages: pageTranslations,
      },
    },
    dashboard: {
      handler: async () => {
        const { getRecentContactSubmissions } = await import('./contact-submissions.js');
        const recentSubmissions = await getRecentContactSubmissions(50);

        return {
          recentSubmissions,
        };
      },
      component: dashboardComponent,
    },
  });
}
