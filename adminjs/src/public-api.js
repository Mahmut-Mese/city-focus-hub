import { getContentPagePublicData } from './content-pages.js';
import { getCollectionPublicData } from './collection-pages.js';

function parseStatus(searchParams) {
  const status = searchParams.get('status');
  return status === 'draft' ? 'draft' : 'published';
}

function parseSort(searchParams) {
  const raw = searchParams.get('sort') || '';
  if (!raw.includes(':')) {
    return { sortBy: '', sortOrder: 'desc' };
  }

  const [sortBy, sortOrder] = raw.split(':');
  return {
    sortBy,
    sortOrder: sortOrder === 'asc' ? 'asc' : 'desc',
  };
}

function toMediaObject(value) {
  if (typeof value !== 'string' || !value.length) {
    return null;
  }

  return { url: value };
}

function normalizePageData(pageName, data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (pageName === 'about-page') {
    return {
      ...data,
      heroBackgroundImage: toMediaObject(data.heroBackgroundImage),
      storyImage: toMediaObject(data.storyImage),
      amenitiesImage: toMediaObject(data.amenitiesImage),
    };
  }

  return data;
}

export function registerPublicApi(app) {
  app.get('/api/site-setting', async (request, response) => {
    try {
      const url = new URL(request.originalUrl, 'http://localhost');
      const data = await getContentPagePublicData('site-settings', parseStatus(url.searchParams));
      response.json({ data });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/:pageName(homepage|about-page|blog-page|pricing-page|faq-page|meeting-rooms-page|virtual-office-page|contact-page|privacy-policy-page|terms-page)', async (request, response) => {
    try {
      const url = new URL(request.originalUrl, 'http://localhost');
      const data = await getContentPagePublicData(request.params.pageName, parseStatus(url.searchParams));
      response.json({ data: normalizePageData(request.params.pageName, data) });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  app.get('/api/:collectionName(blog-posts|faq-items|pricing-plans|meeting-rooms)', async (request, response) => {
    try {
      const url = new URL(request.originalUrl, 'http://localhost');
      const params = url.searchParams;
      const { sortBy, sortOrder } = parseSort(params);

      const data = await getCollectionPublicData(request.params.collectionName, {
        status: parseStatus(params),
        sortBy,
        sortOrder,
        slug: params.get('filters[$or][0][slug][$eq]') ?? '',
        documentId: params.get('filters[$or][1][documentId][$eq]') ?? '',
        isFeatured: params.get('filters[isFeatured][$eq]') ?? '',
        planType: params.get('filters[planType][$eq]') ?? '',
      });

      response.json({ data });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });
}
