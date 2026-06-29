import * as migration_20260524_115348_initial from './20260524_115348_initial';
import * as migration_20260624_184520_offer_detail_sections from './20260624_184520_offer_detail_sections';
import * as migration_20260625_061620_gallery_case_study_sections from './20260625_061620_gallery_case_study_sections';
import * as migration_20260625_063924_page_globals_about_contact_privacy from './20260625_063924_page_globals_about_contact_privacy';
import * as migration_20260625_081408_home_blocks_site_settings from './20260625_081408_home_blocks_site_settings';
import * as migration_20260625_085425_footer_links_disable_label from './20260625_085425_footer_links_disable_label';
import * as migration_20260625_093536_header_nav_cta from './20260625_093536_header_nav_cta';
import * as migration_20260629_135257_gallery_page_portfolio_category from './20260629_135257_gallery_page_portfolio_category';
import * as migration_20260629_145700_header_site_settings_drafts from './20260629_145700_header_site_settings_drafts';
import * as migration_20260629_153443_cookie_consent_global from './20260629_153443_cookie_consent_global';
import * as migration_20260629_154101_cookie_consent_preferences from './20260629_154101_cookie_consent_preferences';
import * as migration_20260629_154355_consent_logs from './20260629_154355_consent_logs';

export const migrations = [
  {
    up: migration_20260524_115348_initial.up,
    down: migration_20260524_115348_initial.down,
    name: '20260524_115348_initial',
  },
  {
    up: migration_20260624_184520_offer_detail_sections.up,
    down: migration_20260624_184520_offer_detail_sections.down,
    name: '20260624_184520_offer_detail_sections',
  },
  {
    up: migration_20260625_061620_gallery_case_study_sections.up,
    down: migration_20260625_061620_gallery_case_study_sections.down,
    name: '20260625_061620_gallery_case_study_sections',
  },
  {
    up: migration_20260625_063924_page_globals_about_contact_privacy.up,
    down: migration_20260625_063924_page_globals_about_contact_privacy.down,
    name: '20260625_063924_page_globals_about_contact_privacy',
  },
  {
    up: migration_20260625_081408_home_blocks_site_settings.up,
    down: migration_20260625_081408_home_blocks_site_settings.down,
    name: '20260625_081408_home_blocks_site_settings',
  },
  {
    up: migration_20260625_085425_footer_links_disable_label.up,
    down: migration_20260625_085425_footer_links_disable_label.down,
    name: '20260625_085425_footer_links_disable_label',
  },
  {
    up: migration_20260625_093536_header_nav_cta.up,
    down: migration_20260625_093536_header_nav_cta.down,
    name: '20260625_093536_header_nav_cta',
  },
  {
    up: migration_20260629_135257_gallery_page_portfolio_category.up,
    down: migration_20260629_135257_gallery_page_portfolio_category.down,
    name: '20260629_135257_gallery_page_portfolio_category',
  },
  {
    up: migration_20260629_145700_header_site_settings_drafts.up,
    down: migration_20260629_145700_header_site_settings_drafts.down,
    name: '20260629_145700_header_site_settings_drafts',
  },
  {
    up: migration_20260629_153443_cookie_consent_global.up,
    down: migration_20260629_153443_cookie_consent_global.down,
    name: '20260629_153443_cookie_consent_global',
  },
  {
    up: migration_20260629_154101_cookie_consent_preferences.up,
    down: migration_20260629_154101_cookie_consent_preferences.down,
    name: '20260629_154101_cookie_consent_preferences',
  },
  {
    up: migration_20260629_154355_consent_logs.up,
    down: migration_20260629_154355_consent_logs.down,
    name: '20260629_154355_consent_logs'
  },
];
