import { useEffect } from 'react';
import { useField } from '@strapi/admin/strapi-admin';

const PRICING_PLAN_MODEL = 'api::pricing-plan.pricing-plan';
const HIDDEN_FIELD_NAMES = ['description', 'features'] as const;

function isHTMLElement(value: Element | null): value is HTMLElement {
  return value instanceof HTMLElement;
}

function syncFieldVisibility(shouldHide: boolean) {
  const rows = new Set<HTMLElement>();

  HIDDEN_FIELD_NAMES.forEach((fieldName) => {
    const fieldRoots = Array.from(document.querySelectorAll(`[name="${fieldName}"]`)).filter(isHTMLElement);

    fieldRoots.forEach((fieldRoot) => {
      const gridItem = fieldRoot.parentElement;
      const gridRow = gridItem?.parentElement;

      if (!isHTMLElement(gridItem) || !isHTMLElement(gridRow)) {
        return;
      }

      gridItem.style.display = shouldHide ? 'none' : '';
      rows.add(gridRow);
    });
  });

  rows.forEach((row) => {
    const hasVisibleItems = Array.from(row.children).filter(isHTMLElement).some((item) => item.style.display !== 'none');
    row.style.display = hasVisibleItems ? '' : 'none';
  });
}

interface PricingPlanMeetingRoomVisibilityProps {
  slug?: string;
}

export function PricingPlanMeetingRoomVisibility({
  slug,
}: PricingPlanMeetingRoomVisibilityProps) {
  const { value: planType } = useField<string>('planType');
  const shouldHide = slug === PRICING_PLAN_MODEL && planType === 'meeting-room';

  useEffect(() => {
    if (slug !== PRICING_PLAN_MODEL) {
      return undefined;
    }

    let frameId = 0;
    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        syncFieldVisibility(shouldHide);
      });
    };

    scheduleSync();

    const observer = new MutationObserver(() => {
      scheduleSync();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      syncFieldVisibility(false);
    };
  }, [shouldHide, slug]);

  return null;
}
