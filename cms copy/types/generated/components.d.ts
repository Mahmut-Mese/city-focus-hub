import type { Schema, Struct } from '@strapi/strapi';

export interface CommonAmenityItem extends Struct.ComponentSchema {
  collectionName: 'components_common_amenity_items';
  info: {
    description: 'Amenity card item';
    displayName: 'Amenity Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      [
        'CalendarDays',
        'Clock',
        'Coffee',
        'Globe',
        'HeadphonesIcon',
        'LayoutGrid',
        'Mail',
        'MapPin',
        'Phone',
        'Printer',
        'Shield',
        'Users',
        'Wifi',
        'Zap',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Wifi'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonComparisonRow extends Struct.ComponentSchema {
  collectionName: 'components_common_comparison_rows';
  info: {
    description: 'Feature comparison row';
    displayName: 'Comparison Row';
  };
  attributes: {
    feature: Schema.Attribute.String & Schema.Attribute.Required;
    values: Schema.Attribute.Component<'common.comparison-value', true>;
  };
}

export interface CommonComparisonValue extends Struct.ComponentSchema {
  collectionName: 'components_common_comparison_values';
  info: {
    description: 'A comparison cell that can be boolean or custom text';
    displayName: 'Comparison Value';
  };
  attributes: {
    booleanValue: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    textValue: Schema.Attribute.String;
    valueType: Schema.Attribute.Enumeration<['boolean', 'text']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'boolean'>;
  };
}

export interface CommonContactForm extends Struct.ComponentSchema {
  collectionName: 'components_common_contact_forms';
  info: {
    description: 'Reusable contact form labels';
    displayName: 'Contact Form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    emailPlaceholder: Schema.Attribute.String;
    messagePlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    namePlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    phonePlaceholder: Schema.Attribute.String;
    subjectPlaceholder: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonFaqEntry extends Struct.ComponentSchema {
  collectionName: 'components_common_faq_entries';
  info: {
    description: 'Question and answer item';
    displayName: 'FAQ Entry';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_common_feature_items';
  info: {
    description: 'Homepage feature card';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      [
        'CalendarDays',
        'Clock',
        'Coffee',
        'Globe',
        'HeadphonesIcon',
        'LayoutGrid',
        'Mail',
        'MapPin',
        'Phone',
        'Printer',
        'Shield',
        'Users',
        'Wifi',
        'Zap',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'LayoutGrid'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonIconText extends Struct.ComponentSchema {
  collectionName: 'components_common_icon_texts';
  info: {
    description: 'Icon and short text item';
    displayName: 'Icon Text';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'CalendarDays',
        'Clock',
        'Coffee',
        'Globe',
        'HeadphonesIcon',
        'LayoutGrid',
        'Mail',
        'MapPin',
        'Phone',
        'Printer',
        'Shield',
        'Users',
        'Wifi',
        'Zap',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Clock'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonImageItem extends Struct.ComponentSchema {
  collectionName: 'components_common_image_items';
  info: {
    description: 'Image and alt text';
    displayName: 'Image Item';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface CommonLegalSection extends Struct.ComponentSchema {
  collectionName: 'components_common_legal_sections';
  info: {
    description: 'Section block for legal pages';
    displayName: 'Legal Section';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonSiteLink extends Struct.ComponentSchema {
  collectionName: 'components_common_site_links';
  info: {
    description: 'Navigation or footer link';
    displayName: 'Site Link';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    path: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_common_social_links';
  info: {
    description: 'Social media profile link';
    displayName: 'Social Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'Linkedin', 'Twitter']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Facebook'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonTextItem extends Struct.ComponentSchema {
  collectionName: 'components_common_text_items';
  info: {
    description: 'A single editable text row for repeatable content lists';
    displayName: 'Text Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonWorkspaceItem extends Struct.ComponentSchema {
  collectionName: 'components_common_workspace_items';
  info: {
    description: 'Related workspace card';
    displayName: 'Workspace Item';
  };
  attributes: {
    category: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeAboutHighlight extends Struct.ComponentSchema {
  collectionName: 'components_home_about_highlights';
  info: {
    description: 'Homepage about highlight section';
    displayName: 'About Highlight';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'common.text-item', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    primaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCtaPath: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaPath: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeContactForm extends Struct.ComponentSchema {
  collectionName: 'components_home_contact_forms';
  info: {
    description: 'Homepage contact form labels';
    displayName: 'Contact Form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    emailPlaceholder: Schema.Attribute.String;
    messagePlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    namePlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    subjectPlaceholder: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Homepage hero section';
    displayName: 'Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    primaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCtaPath: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_home_service_items';
  info: {
    description: 'Homepage service card';
    displayName: 'Service Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_home_testimonial_items';
  info: {
    description: 'Homepage testimonial';
    displayName: 'Testimonial Item';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteFooter extends Struct.ComponentSchema {
  collectionName: 'components_site_footers';
  info: {
    description: 'Global footer settings';
    displayName: 'Footer';
  };
  attributes: {
    aboutLinks: Schema.Attribute.Component<'common.site-link', true>;
    contactTitle: Schema.Attribute.String & Schema.Attribute.Required;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    legalLinks: Schema.Attribute.Component<'common.site-link', true>;
    logo: Schema.Attribute.Media<'images'>;
    serviceLinks: Schema.Attribute.Component<'common.site-link', true>;
  };
}

export interface SiteNavigation extends Struct.ComponentSchema {
  collectionName: 'components_site_navigations';
  info: {
    description: 'Global navigation settings';
    displayName: 'Navigation';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    ctaPath: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'common.site-link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.amenity-item': CommonAmenityItem;
      'common.comparison-row': CommonComparisonRow;
      'common.comparison-value': CommonComparisonValue;
      'common.contact-form': CommonContactForm;
      'common.faq-entry': CommonFaqEntry;
      'common.feature-item': CommonFeatureItem;
      'common.icon-text': CommonIconText;
      'common.image-item': CommonImageItem;
      'common.legal-section': CommonLegalSection;
      'common.site-link': CommonSiteLink;
      'common.social-link': CommonSocialLink;
      'common.text-item': CommonTextItem;
      'common.workspace-item': CommonWorkspaceItem;
      'home.about-highlight': HomeAboutHighlight;
      'home.contact-form': HomeContactForm;
      'home.hero': HomeHero;
      'home.service-item': HomeServiceItem;
      'home.testimonial-item': HomeTestimonialItem;
      'site.footer': SiteFooter;
      'site.navigation': SiteNavigation;
    }
  }
}
