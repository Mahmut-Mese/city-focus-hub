import { getContentPagePublicData } from './content-pages.js';
import { getCollectionPublicData } from './collection-pages.js';
import { randomUUID } from 'node:crypto';
import { sequelize } from './database.js';
import { sendContactSubmissionEmail } from './mailer.js';

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

function normalizeSubmissionBody(body) {
  return {
    name: String(body?.name ?? '').trim(),
    phone: String(body?.phone ?? '').trim(),
    email: String(body?.email ?? '').trim(),
    message: String(body?.message ?? '').trim(),
    sourcePage: String(body?.sourcePage ?? 'contact').trim() || 'contact',
  };
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

  app.post('/api/contact-submissions', async (request, response) => {
    try {
      const submission = normalizeSubmissionBody(request.body);

      if (!submission.name) {
        response.status(400).json({ error: 'Name is required.' });
        return;
      }

      if (!submission.email) {
        response.status(400).json({ error: 'Email is required.' });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
        response.status(400).json({ error: 'Email is invalid.' });
        return;
      }

      if (!submission.message) {
        response.status(400).json({ error: 'Message is required.' });
        return;
      }

      const now = new Date();
      const [insertId, metadata] = await sequelize.query(
        `INSERT INTO contact_submissions
          (document_id, name, phone, email, message, source_page, created_at, updated_at)
         VALUES
          (:documentId, :name, :phone, :email, :message, :sourcePage, :createdAt, :updatedAt)`,
        {
          replacements: {
            documentId: randomUUID(),
            name: submission.name,
            phone: submission.phone || null,
            email: submission.email,
            message: submission.message,
            sourcePage: submission.sourcePage,
            createdAt: now,
            updatedAt: now,
          },
        },
      );

      await sendContactSubmissionEmail(submission);

      response.status(201).json({
        ok: true,
        id: typeof insertId === 'number' ? insertId : metadata?.insertId ?? null,
        message: 'Your request has been submitted.',
      });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });
}
