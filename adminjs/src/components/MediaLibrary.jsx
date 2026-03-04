import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Loader, MessageBox } from '@adminjs/design-system';

const STYLES = `
.admin-media-page {
  min-height: 100%;
  padding: 28px 40px 48px 88px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-media-page__inner {
  max-width: 1860px;
  margin: 0 auto;
}

.admin-media-page__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__title {
  margin: 0;
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: #32324d;
}

.admin-media-page__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__button,
.admin-media-page__button--primary,
.admin-media-page__icon-button {
  border-radius: 4px;
  min-height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-media-page__button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
}

.admin-media-page__button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
  padding: 0 1.25rem;
}

.admin-media-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__toolbar-left,
.admin-media-page__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__square,
.admin-media-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #666687;
  display: grid;
  place-items: center;
  border-radius: 4px;
}

.admin-media-page__select,
.admin-media-page__search {
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
  font-size: 1rem;
}

.admin-media-page__search {
  min-width: 280px;
}

.admin-media-page__select {
  min-width: 268px;
  appearance: none;
}

.admin-media-page__section-title {
  margin: 0 0 18px;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.admin-media-page__count {
  color: #666687;
}

.admin-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.admin-asset-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  cursor: pointer;
}

.admin-asset-card:hover {
  box-shadow: 0 4px 12px rgba(33, 33, 52, 0.08);
}

.admin-asset-card__preview {
  position: relative;
  min-height: 256px;
  padding: 16px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-asset-card__checkbox {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid #c0c0cf;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.92);
}

.admin-asset-card__image {
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;
}

.admin-asset-card__body {
  padding: 14px 18px 16px;
}

.admin-asset-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.admin-asset-card__title {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.admin-asset-card__type {
  flex: 0 0 auto;
  min-height: 2rem;
  padding: 0 0.75rem;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 700;
}

.admin-asset-card__meta {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__back {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;
}

.admin-media-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
}

.admin-media-detail__preview,
.admin-media-detail__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-media-detail__preview {
  padding: 24px;
}

.admin-media-detail__canvas {
  min-height: 620px;
  display: grid;
  place-items: center;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-media-detail__image {
  max-width: 100%;
  max-height: 580px;
  object-fit: contain;
}

.admin-media-detail__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-media-detail__card-head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.admin-media-detail__card-body {
  padding: 0 16px 16px;
}

.admin-media-detail__field + .admin-media-detail__field {
  margin-top: 16px;
}

.admin-media-detail__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
}

.admin-media-detail__input,
.admin-media-detail__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 2.5rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__textarea {
  min-height: 6rem;
  resize: none;
}

.admin-media-detail__meta-list {
  display: grid;
  gap: 12px;
}

.admin-media-detail__meta-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__meta-key {
  color: #666687;
  font-weight: 600;
}

.admin-media-detail__meta-value {
  color: #32324d;
  text-align: right;
  overflow-wrap: anywhere;
}

@media (max-width: 1080px) {
  .admin-media-detail__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .admin-media-page {
    padding: 20px 16px 40px 72px;
  }

  .admin-media-page__top,
  .admin-media-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-media-page__toolbar-left,
  .admin-media-page__toolbar-right,
  .admin-media-page__actions {
    flex-wrap: wrap;
  }

  .admin-media-page__search,
  .admin-media-page__select {
    min-width: 0;
    width: 100%;
  }
}
`;

function buildPagePath(pathname, params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return `${pathname}${queryString ? `?${queryString}` : ''}`;
}

async function requestMedia(query = {}) {
  const searchParams = new URLSearchParams(query);
  const response = await fetch(`/admin/api/pages/media-library${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, {
    credentials: 'same-origin',
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? 'Failed to load media.');
  }

  return payload;
}

async function uploadAdminImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/admin/api/media/upload', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin',
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Failed to upload image.');
  }

  return payload;
}

function AssetCard({ item, onOpen }) {
  return (
    <article className="admin-asset-card" onClick={() => onOpen(item.id)}>
      <div className="admin-asset-card__preview">
        <div className="admin-asset-card__checkbox" />
        <img className="admin-asset-card__image" src={item.thumbnailUrl || item.url} alt={item.alternativeText || item.name} />
      </div>
      <div className="admin-asset-card__body">
        <div className="admin-asset-card__title-row">
          <div className="admin-asset-card__title">{item.name}</div>
          <div className="admin-asset-card__type">{item.mime.startsWith('image/') ? 'IMAGE' : item.ext.replace('.', '').toUpperCase()}</div>
        </div>
        <div className="admin-asset-card__meta">
          {item.ext.replace('.', '').toUpperCase()} - {item.width}×{item.height}
        </div>
      </div>
    </article>
  );
}

function DetailView({ item, onBack }) {
  return (
    <div>
      <button className="admin-media-detail__back" type="button" onClick={onBack}>
        ← Back
      </button>

      <div className="admin-media-page__top" style={{ marginBottom: 24 }}>
        <h1 className="admin-media-page__title" style={{ fontSize: '2.25rem', lineHeight: '2.75rem' }}>{item.name}</h1>
        <div className="admin-media-page__actions">
          <button className="admin-media-page__button" type="button" onClick={() => navigator.clipboard?.writeText(item.url || '')}>
            Copy URL
          </button>
          <button className="admin-media-page__button--primary" type="button" onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}>
            Open asset
          </button>
        </div>
      </div>

      <div className="admin-media-detail__layout">
        <section className="admin-media-detail__preview">
          <div className="admin-media-detail__canvas">
            <img className="admin-media-detail__image" src={item.url} alt={item.alternativeText || item.name} />
          </div>
        </section>

        <aside className="admin-media-detail__side">
          <div className="admin-media-detail__card">
            <div className="admin-media-detail__card-head">Details</div>
            <div className="admin-media-detail__card-body">
              <div className="admin-media-detail__field">
                <label className="admin-media-detail__label">File name</label>
                <input className="admin-media-detail__input" value={item.name || ''} disabled readOnly />
              </div>
              <div className="admin-media-detail__field">
                <label className="admin-media-detail__label">Alternative text</label>
                <input className="admin-media-detail__input" value={item.alternativeText || ''} disabled readOnly />
              </div>
              <div className="admin-media-detail__field">
                <label className="admin-media-detail__label">Caption</label>
                <textarea className="admin-media-detail__textarea" value={item.caption || ''} disabled readOnly />
              </div>
            </div>
          </div>

          <div className="admin-media-detail__card">
            <div className="admin-media-detail__card-head">Metadata</div>
            <div className="admin-media-detail__card-body">
              <div className="admin-media-detail__meta-list">
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Dimensions</span>
                  <span className="admin-media-detail__meta-value">{item.width} × {item.height}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Size</span>
                  <span className="admin-media-detail__meta-value">{item.sizeLabel}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Type</span>
                  <span className="admin-media-detail__meta-value">{item.mime}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Provider</span>
                  <span className="admin-media-detail__meta-value">{item.provider || 'local'}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Folder</span>
                  <span className="admin-media-detail__meta-value">{item.folderPath || '/'}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Updated</span>
                  <span className="admin-media-detail__meta-value">{item.updatedAtLabel}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Created</span>
                  <span className="admin-media-detail__meta-value">{item.createdAtLabel}</span>
                </div>
                <div className="admin-media-detail__meta-item">
                  <span className="admin-media-detail__meta-key">Document ID</span>
                  <span className="admin-media-detail__meta-value">{item.documentId}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function MediaLibrary() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const search = query.get('search') || '';
  const fileId = query.get('fileId') || '';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const payload = await requestMedia(fileId ? { fileId } : { search });

        if (!active) {
          return;
        }

        setItems(payload.items ?? []);
        setCount(payload.count ?? 0);
        setItem(payload.item ?? null);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [fileId, search]);

  const openList = (nextSearch = search) => {
    navigate(buildPagePath('/admin/pages/media-library', nextSearch ? { search: nextSearch } : {}));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="admin-media-page">
        <div className="admin-media-page__inner">
          {error ? <MessageBox variant="danger">{error}</MessageBox> : null}

          {fileId && item ? (
            <DetailView item={item} onBack={() => openList()} />
          ) : (
            <>
              <div className="admin-media-page__top">
                <h1 className="admin-media-page__title">Media Library</h1>
                <div className="admin-media-page__actions">
                  <button className="admin-media-page__button" type="button">+ Add new folder</button>
                  <button
                    className="admin-media-page__button--primary"
                    type="button"
                    disabled={uploading}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.multiple = true;
                      input.onchange = async () => {
                        const files = Array.from(input.files ?? []);
                        if (!files.length) {
                          return;
                        }

                        setUploading(true);
                        setError('');

                        try {
                          for (const file of files) {
                            await uploadAdminImage(file);
                          }

                          const refreshedPayload = await requestMedia(search ? { search } : {});
                          setItems(refreshedPayload.items ?? []);
                          setCount(refreshedPayload.count ?? 0);
                        } catch (uploadError) {
                          setError(uploadError.message);
                        } finally {
                          setUploading(false);
                        }
                      };
                      input.click();
                    }}
                  >
                    {uploading ? 'Uploading...' : '+ Add new assets'}
                  </button>
                </div>
              </div>

              <div className="admin-media-page__toolbar">
                <div className="admin-media-page__toolbar-left">
                  <div className="admin-media-page__square" />
                  <select className="admin-media-page__select" defaultValue="recent">
                    <option value="recent">Most recent uploads</option>
                  </select>
                  <button className="admin-media-page__button" type="button">Filters</button>
                </div>
                <div className="admin-media-page__toolbar-right">
                  <button className="admin-media-page__icon-button" type="button">⚙</button>
                  <button className="admin-media-page__icon-button" type="button">☰</button>
                  <input
                    className="admin-media-page__search"
                    value={search}
                    onChange={(event) => openList(event.target.value)}
                    placeholder="Search assets"
                  />
                </div>
              </div>

              <h2 className="admin-media-page__section-title">
                Assets <span className="admin-media-page__count">({count})</span>
              </h2>

              <div className="admin-media-grid">
                {items.map((mediaItem) => (
                  <AssetCard key={mediaItem.id} item={mediaItem} onOpen={(nextId) => navigate(buildPagePath('/admin/pages/media-library', { fileId: nextId }))} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
