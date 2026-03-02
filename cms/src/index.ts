import type { Core } from '@strapi/strapi';

const EDITOR_ROLE_CODE = 'strapi-editor';
const CLIENT_ROLE_CODE = 'client-editor';
const CLIENT_ROLE_NAME = 'Client Editor';
const DEFAULT_CLIENT_EMAIL = 'client@leadenhallworks.com';
const DEFAULT_CLIENT_PASSWORD = 'Client123!';
const PUBLIC_CONTENT_ACTIONS = [
  'api::about-page.about-page.find',
  'api::blog-post.blog-post.find',
  'api::blog-post.blog-post.findOne',
  'api::blog-page.blog-page.find',
  'api::contact-page.contact-page.find',
  'api::faq-item.faq-item.find',
  'api::faq-item.faq-item.findOne',
  'api::faq-page.faq-page.find',
  'api::homepage.homepage.find',
  'api::meeting-rooms-page.meeting-rooms-page.find',
  'api::pricing-plan.pricing-plan.find',
  'api::pricing-plan.pricing-plan.findOne',
  'api::pricing-page.pricing-page.find',
  'api::privacy-policy-page.privacy-policy-page.find',
  'api::meeting-room.meeting-room.find',
  'api::meeting-room.meeting-room.findOne',
  'api::site-setting.site-setting.find',
  'api::terms-page.terms-page.find',
  'api::virtual-office-page.virtual-office-page.find',
];

interface AdminPermissionShape {
  action: string;
  actionParameters?: Record<string, unknown>;
  conditions?: string[];
  properties?: Record<string, unknown>;
  subject?: string | null;
}

interface AdminRoleShape {
  id: number;
  name: string;
  code: string;
  permissions?: AdminPermissionShape[];
}

interface AdminActionShape {
  actionId: string;
  section: string;
  pluginName?: string;
  subjects?: string[];
  options?: {
    applyToProperties?: string[] | null;
  };
}

interface ContentManagerLayoutField {
  name: string;
  size: number;
}

interface ContentManagerFieldMetadata {
  edit?: {
    visible?: boolean;
    editable?: boolean;
    label?: string;
    description?: string | null;
    placeholder?: string | null;
  };
  list?: {
    label?: string;
    searchable?: boolean;
    sortable?: boolean;
  };
}

interface ContentManagerConfiguration {
  uid: string;
  settings?: Record<string, unknown>;
  layouts?: {
    list?: string[];
    edit?: ContentManagerLayoutField[][];
  };
  metadatas?: Record<string, ContentManagerFieldMetadata>;
}

interface ContentManagerModel {
  uid: string;
  attributes: Record<string, { type?: string; customField?: string }>;
}

function clonePermission(permission: AdminPermissionShape): AdminPermissionShape {
  return {
    action: permission.action,
    actionParameters: permission.actionParameters ?? {},
    conditions: permission.conditions ?? [],
    properties: permission.properties ?? {},
    subject: permission.subject ?? null,
  };
}

const EXACT_CLIENT_LABELS: Record<string, string> = {
  ctaLabel: 'CTA Label',
  ctaPath: 'CTA Link',
  defaultSeoDescription: 'Default SEO Description',
  defaultSeoTitle: 'Default SEO Title',
  documentId: 'Document ID',
  faqPage: 'FAQ Page',
  featured: 'Featured',
  faqHeroImage: 'FAQ Hero Image',
  homeHeroImage: 'Home Hero Image',
  href: 'Link URL',
  id: 'ID',
  imageUrl: 'Image URL',
  isFeatured: 'Featured',
  isPopular: 'Popular',
  meetingRoomsHeroImage: 'Meeting Rooms Hero Image',
  meetingRoomsPage: 'Meeting Rooms Page',
  path: 'Link Path',
  planType: 'Plan Type',
  pricingHeroImage: 'Pricing Hero Image',
  primaryCtaLabel: 'Primary CTA Label',
  primaryCtaPath: 'Primary CTA Link',
  proTipText: 'Pro Tip Text',
  proTipTitle: 'Pro Tip Title',
  publishedDate: 'Published Date',
  readTime: 'Read Time',
  secondaryCtaLabel: 'Secondary CTA Label',
  secondaryCtaPath: 'Secondary CTA Link',
  seoDescription: 'SEO Description',
  seoTitle: 'SEO Title',
  slug: 'URL Slug',
  sortOrder: 'Display Order',
  valueType: 'Value Type',
  virtualOfficePage: 'Virtual Office Page',
};

const UPPERCASE_WORDS: Record<string, string> = {
  api: 'API',
  cta: 'CTA',
  faq: 'FAQ',
  id: 'ID',
  seo: 'SEO',
  url: 'URL',
};

function toClientFriendlyLabel(fieldName: string) {
  const exactMatch = EXACT_CLIENT_LABELS[fieldName];

  if (exactMatch) {
    return exactMatch;
  }

  const words = fieldName
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => UPPERCASE_WORDS[word.toLowerCase()] ?? `${word[0]?.toUpperCase() ?? ''}${word.slice(1)}`);

  if (words[0]?.toLowerCase() === 'is' && words.length > 1) {
    return words.slice(1).join(' ');
  }

  return words.join(' ');
}

function buildClientFriendlyMetadatas(
  configuration: ContentManagerConfiguration,
  model: ContentManagerModel,
) {
  const nextMetadatas = { ...(configuration.metadatas ?? {}) };
  let didChange = false;

  Object.keys(model.attributes).forEach((fieldName) => {
    const label = toClientFriendlyLabel(fieldName);
    const currentMetadata = nextMetadatas[fieldName] ?? {};
    const nextMetadata: ContentManagerFieldMetadata = {
      ...currentMetadata,
      edit: {
        ...currentMetadata.edit,
        label,
      },
      list: {
        ...currentMetadata.list,
        label,
      },
    };

    if (JSON.stringify(nextMetadata) !== JSON.stringify(currentMetadata)) {
      nextMetadatas[fieldName] = nextMetadata;
      didChange = true;
    }
  });

  return didChange ? nextMetadatas : null;
}

function getSeededClientCredentials() {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const email = process.env.CLIENT_ADMIN_EMAIL || (isDevelopment ? DEFAULT_CLIENT_EMAIL : '');
  const password = process.env.CLIENT_ADMIN_PASSWORD || (isDevelopment ? DEFAULT_CLIENT_PASSWORD : '');

  if (!email || !password) {
    return null;
  }

  return {
    email,
    password,
    firstname: process.env.CLIENT_ADMIN_FIRSTNAME || 'Client',
    lastname: process.env.CLIENT_ADMIN_LASTNAME || 'User',
  };
}

async function ensureClientRole(strapi: Core.Strapi) {
  const roleService = strapi.service('admin::role');
  const permissionService = strapi.service('admin::permission') as {
    actionProvider: {
      values: () => AdminActionShape[];
    };
  };
  const contentTypeService = strapi.service('admin::content-type') as {
    getPermissionsWithNestedFields: (
      actions: AdminActionShape[],
      options?: { restrictedSubjects?: string[] },
    ) => AdminPermissionShape[];
  };

  await roleService.createRolesIfNoneExist();

  const editorRole = (await roleService.findOne({ code: EDITOR_ROLE_CODE }, ['permissions'])) as
    | AdminRoleShape
    | null;

  if (!editorRole) {
    strapi.log.warn('Unable to find the built-in Editor role. Skipping client role setup.');
    return null;
  }

  let clientRole = (await roleService.findOne(
    { code: CLIENT_ROLE_CODE },
    ['permissions'],
  )) as AdminRoleShape | null;

  if (!clientRole) {
    clientRole = (await roleService.create({
      code: CLIENT_ROLE_CODE,
      name: CLIENT_ROLE_NAME,
      description: 'Restricted Strapi access for clients to manage content only.',
    })) as AdminRoleShape;
  }

  const contentManagerActions = permissionService.actionProvider
    .values()
    .filter(
      (action) =>
        action.pluginName === 'content-manager'
        && action.section === 'contentTypes'
        && action.actionId.startsWith('plugin::content-manager.explorer.'),
    );

  const contentPermissions = contentTypeService.getPermissionsWithNestedFields(
    contentManagerActions,
    {
      restrictedSubjects: ['plugin::users-permissions.user'],
    },
  );

  const uploadPermissions: AdminPermissionShape[] = [
    { action: 'plugin::upload.read' },
    { action: 'plugin::upload.configure-view' },
    { action: 'plugin::upload.assets.create' },
    { action: 'plugin::upload.assets.update' },
    { action: 'plugin::upload.assets.download' },
    { action: 'plugin::upload.assets.copy-link' },
  ];

  const permissions = [...contentPermissions, ...uploadPermissions].map(clonePermission);
  await roleService.assignPermissions(clientRole.id, permissions);

  return clientRole;
}

async function ensureClientAdminUser(strapi: Core.Strapi, clientRole: AdminRoleShape) {
  const credentials = getSeededClientCredentials();

  if (!credentials) {
    strapi.log.info(
      'Client role is ready. Set CLIENT_ADMIN_EMAIL and CLIENT_ADMIN_PASSWORD to seed a client admin user.',
    );
    return;
  }

  const userService = strapi.service('admin::user');
  const existingUser = await userService.findOneByEmail(credentials.email, ['roles']);

  if (!existingUser) {
    await userService.create({
      email: credentials.email,
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      username: credentials.email,
      password: credentials.password,
      isActive: true,
      roles: [clientRole.id],
    });
    strapi.log.info(`Seeded client admin user: ${credentials.email}`);
    return;
  }

  const hasClientRole = Array.isArray(existingUser.roles)
    && existingUser.roles.some((role: { id: number }) => role.id === clientRole.id);

  if (!hasClientRole) {
    await userService.updateById(existingUser.id, {
      roles: [clientRole.id],
      isActive: true,
    });
  }
}

async function ensurePublicContentPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' }, populate: ['permissions'] });

  if (!publicRole) {
    return;
  }

  const existingActions = new Set(
    Array.isArray(publicRole.permissions)
      ? publicRole.permissions.map((permission: { action: string }) => permission.action)
      : [],
  );

  const missingActions = PUBLIC_CONTENT_ACTIONS.filter((action) => !existingActions.has(action));

  await Promise.all(
    missingActions.map((action) =>
      strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      })),
  );
}

async function ensureOneBasedSortOrder(strapi: Core.Strapi) {
  const targets = [
    'api::faq-item.faq-item',
    'api::meeting-room.meeting-room',
    'api::pricing-plan.pricing-plan',
  ] as const;

  await Promise.all(
    targets.map((uid) =>
      strapi.db.query(uid).updateMany({
        where: {
          sortOrder: {
            $lt: 1,
          },
        },
        data: {
          sortOrder: 1,
        },
      })),
  );
}

async function removeUnusedFaqCategory(strapi: Core.Strapi) {
  const hasCategoryColumn = await strapi.db.connection.schema.hasColumn('faq_items', 'category');

  if (!hasCategoryColumn) {
    return;
  }

  await strapi.db.connection.schema.alterTable('faq_items', (table) => {
    table.dropColumn('category');
  });
}

async function removeUnusedPricingCurrency(strapi: Core.Strapi) {
  const hasCurrencyColumn = await strapi.db.connection.schema.hasColumn('pricing_plans', 'currency');

  if (!hasCurrencyColumn) {
    return;
  }

  await strapi.db.connection.schema.alterTable('pricing_plans', (table) => {
    table.dropColumn('currency');
  });
}

async function ensureClientFriendlyFieldLabels(strapi: Core.Strapi) {
  const contentTypeService = strapi.plugin('content-manager')?.service('content-types') as
    | {
        findAllContentTypes: () => ContentManagerModel[];
        findConfiguration: (contentType: ContentManagerModel) => Promise<ContentManagerConfiguration>;
        updateConfiguration: (
          contentType: ContentManagerModel,
          config: ContentManagerConfiguration,
        ) => Promise<ContentManagerConfiguration>;
      }
    | undefined;
  const componentService = strapi.plugin('content-manager')?.service('components') as
    | {
        findAllComponents: () => ContentManagerModel[];
        findConfiguration: (component: ContentManagerModel) => Promise<ContentManagerConfiguration>;
        updateConfiguration: (
          component: ContentManagerModel,
          config: ContentManagerConfiguration,
        ) => Promise<ContentManagerConfiguration>;
      }
    | undefined;

  if (!contentTypeService || !componentService) {
    strapi.log.warn('Unable to access content-manager services. Skipping client-friendly label sync.');
    return;
  }

  const contentTypes = contentTypeService.findAllContentTypes();
  const components = componentService.findAllComponents();

  await Promise.all(
    contentTypes.map(async (contentType) => {
      const configuration = await contentTypeService.findConfiguration(contentType);
      const nextMetadatas = buildClientFriendlyMetadatas(configuration, contentType);

      if (!nextMetadatas) {
        return;
      }

      await contentTypeService.updateConfiguration(contentType, {
        ...configuration,
        metadatas: nextMetadatas,
      });
    }),
  );

  await Promise.all(
    components.map(async (component) => {
      const configuration = await componentService.findConfiguration(component);
      const nextMetadatas = buildClientFriendlyMetadatas(configuration, component);

      if (!nextMetadatas) {
        return;
      }

      await componentService.updateConfiguration(component, {
        ...configuration,
        metadatas: nextMetadatas,
      });
    }),
  );
}

async function hideFieldsInContentManager(
  strapi: Core.Strapi,
  contentTypeUid: string,
  hiddenFieldNames: string[],
) {
  const contentManagerService = strapi.plugin('content-manager')?.service('content-types') as
    | {
        findContentType: (uid: string) => { uid: string } | undefined;
        findConfiguration: (contentType: { uid: string }) => Promise<ContentManagerConfiguration>;
        updateConfiguration: (
          contentType: { uid: string },
          config: ContentManagerConfiguration,
        ) => Promise<ContentManagerConfiguration>;
      }
    | undefined;

  if (!contentManagerService) {
    strapi.log.warn(`Unable to access the content-manager service. Skipping layout cleanup for ${contentTypeUid}.`);
    return;
  }

  const contentType = contentManagerService.findContentType(contentTypeUid);

  if (!contentType) {
    strapi.log.warn(`Unable to find the content type ${contentTypeUid}. Skipping layout cleanup.`);
    return;
  }

  const configuration = await contentManagerService.findConfiguration(contentType);
  const nextEditLayout = (configuration.layouts?.edit ?? [])
    .map((row) => row.filter((field) => !hiddenFieldNames.includes(field.name)))
    .filter((row) => row.length > 0);

  const nextMetadatas = { ...(configuration.metadatas ?? {}) };

  hiddenFieldNames.forEach((fieldName) => {
    const currentMetadata = nextMetadatas[fieldName] ?? {};
    nextMetadatas[fieldName] = {
      ...currentMetadata,
      edit: {
        ...currentMetadata.edit,
        editable: false,
        visible: false,
      },
    };
  });

  await contentManagerService.updateConfiguration(contentType, {
    ...configuration,
    layouts: {
      ...(configuration.layouts ?? {}),
      edit: nextEditLayout,
    },
    metadatas: nextMetadatas,
  });
}

async function ensureFieldsInContentManagerList(
  strapi: Core.Strapi,
  contentTypeUid: string,
  fieldNames: string[],
) {
  const contentManagerService = strapi.plugin('content-manager')?.service('content-types') as
    | {
        findContentType: (uid: string) => { uid: string } | undefined;
        findConfiguration: (contentType: { uid: string }) => Promise<ContentManagerConfiguration>;
        updateConfiguration: (
          contentType: { uid: string },
          config: ContentManagerConfiguration,
        ) => Promise<ContentManagerConfiguration>;
      }
    | undefined;

  if (!contentManagerService) {
    strapi.log.warn(`Unable to access the content-manager service. Skipping list update for ${contentTypeUid}.`);
    return;
  }

  const contentType = contentManagerService.findContentType(contentTypeUid);

  if (!contentType) {
    strapi.log.warn(`Unable to find the content type ${contentTypeUid}. Skipping list update.`);
    return;
  }

  const configuration = await contentManagerService.findConfiguration(contentType);
  const nextListLayout = [...(configuration.layouts?.list ?? [])];
  const nextMetadatas = { ...(configuration.metadatas ?? {}) };
  let didChange = false;

  fieldNames.forEach((fieldName) => {
    if (!nextListLayout.includes(fieldName)) {
      nextListLayout.push(fieldName);
      didChange = true;
    }

    const currentMetadata = nextMetadatas[fieldName] ?? {};
    const nextMetadata: ContentManagerFieldMetadata = {
      ...currentMetadata,
      list: {
        ...currentMetadata.list,
        sortable: true,
      },
    };

    if (JSON.stringify(nextMetadata) !== JSON.stringify(currentMetadata)) {
      nextMetadatas[fieldName] = nextMetadata;
      didChange = true;
    }
  });

  if (!didChange) {
    return;
  }

  await contentManagerService.updateConfiguration(contentType, {
    ...configuration,
    layouts: {
      ...(configuration.layouts ?? {}),
      list: nextListLayout,
    },
    metadatas: nextMetadatas,
  });
}

async function ensureEditLayoutInContentManager(
  strapi: Core.Strapi,
  contentTypeUid: string,
  editLayout: ContentManagerLayoutField[][],
) {
  const contentManagerService = strapi.plugin('content-manager')?.service('content-types') as
    | {
        findContentType: (uid: string) => { uid: string } | undefined;
        findConfiguration: (contentType: { uid: string }) => Promise<ContentManagerConfiguration>;
        updateConfiguration: (
          contentType: { uid: string },
          config: ContentManagerConfiguration,
        ) => Promise<ContentManagerConfiguration>;
      }
    | undefined;

  if (!contentManagerService) {
    strapi.log.warn(`Unable to access the content-manager service. Skipping edit layout update for ${contentTypeUid}.`);
    return;
  }

  const contentType = contentManagerService.findContentType(contentTypeUid);

  if (!contentType) {
    strapi.log.warn(`Unable to find the content type ${contentTypeUid}. Skipping edit layout update.`);
    return;
  }

  const configuration = await contentManagerService.findConfiguration(contentType);

  if (JSON.stringify(configuration.layouts?.edit ?? []) === JSON.stringify(editLayout)) {
    return;
  }

  await contentManagerService.updateConfiguration(contentType, {
    ...configuration,
    layouts: {
      ...(configuration.layouts ?? {}),
      edit: editLayout,
    },
  });
}

async function ensureClientFriendlyAdminLayouts(strapi: Core.Strapi) {
  await ensureEditLayoutInContentManager(strapi, 'api::faq-item.faq-item', [
    [{ name: 'question', size: 12 }],
    [{ name: 'answer', size: 12 }],
    [
      { name: 'sortOrder', size: 6 },
      { name: 'isFeatured', size: 6 },
    ],
  ]);

  await ensureEditLayoutInContentManager(strapi, 'api::meeting-room.meeting-room', [
    [
      { name: 'name', size: 6 },
      { name: 'slug', size: 6 },
    ],
    [{ name: 'description', size: 12 }],
    [
      { name: 'capacity', size: 6 },
      { name: 'sortOrder', size: 6 },
    ],
    [{ name: 'features', size: 12 }],
    [{ name: 'badges', size: 12 }],
    [{ name: 'isFeatured', size: 12 }],
    [{ name: 'image', size: 12 }],
  ]);

  await hideFieldsInContentManager(strapi, 'api::meeting-room.meeting-room', [
    'imageUrl',
  ]);

  await ensureEditLayoutInContentManager(strapi, 'api::pricing-plan.pricing-plan', [
    [
      { name: 'name', size: 6 },
      { name: 'slug', size: 6 },
    ],
    [
      { name: 'planType', size: 6 },
      { name: 'price', size: 6 },
    ],
    [
      { name: 'period', size: 6 },
      { name: 'sortOrder', size: 6 },
    ],
    [{ name: 'description', size: 12 }],
    [{ name: 'features', size: 12 }],
    [{ name: 'isPopular', size: 12 }],
  ]);

  await ensureEditLayoutInContentManager(strapi, 'api::blog-post.blog-post', [
    [
      { name: 'title', size: 6 },
      { name: 'slug', size: 6 },
    ],
    [{ name: 'excerpt', size: 12 }],
    [{ name: 'content', size: 12 }],
    [{ name: 'contentImages', size: 12 }],
    [
      { name: 'proTipTitle', size: 6 },
      { name: 'proTipText', size: 6 },
    ],
    [
      { name: 'category', size: 6 },
      { name: 'publishedDate', size: 6 },
    ],
    [
      { name: 'readTime', size: 6 },
      { name: 'author', size: 6 },
    ],
    [{ name: 'tags', size: 12 }],
    [{ name: 'featured', size: 12 }],
    [{ name: 'coverImage', size: 12 }],
  ]);

  await hideFieldsInContentManager(strapi, 'api::blog-post.blog-post', [
    'coverImageUrl',
    'contentImageUrls',
    'seoTitle',
    'seoDescription',
  ]);

  await hideFieldsInContentManager(strapi, 'api::site-setting.site-setting', [
    'homePage',
    'homeHeroImage',
    'aboutPage',
    'blogPage',
    'pricingPage',
    'faqPage',
    'meetingRoomsPage',
    'virtualOfficePage',
    'contactPage',
    'defaultSeoTitle',
    'defaultSeoDescription',
    'blogHeroImage',
    'pricingHeroImage',
    'meetingRoomsHeroImage',
    'faqHeroImage',
  ]);

  await ensureFieldsInContentManagerList(strapi, 'api::faq-item.faq-item', [
    'isFeatured',
  ]);

  await ensureFieldsInContentManagerList(strapi, 'api::meeting-room.meeting-room', [
    'isFeatured',
  ]);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await removeUnusedFaqCategory(strapi);
    await removeUnusedPricingCurrency(strapi);
    await ensureOneBasedSortOrder(strapi);
    await ensureClientFriendlyFieldLabels(strapi);
    await ensurePublicContentPermissions(strapi);
    await ensureClientFriendlyAdminLayouts(strapi);

    const clientRole = await ensureClientRole(strapi);

    if (!clientRole) {
      return;
    }

    await ensureClientAdminUser(strapi, clientRole);
  },
};
