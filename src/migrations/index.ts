import * as migration_20260524_115348_initial from './20260524_115348_initial';
import * as migration_20260624_184520_offer_detail_sections from './20260624_184520_offer_detail_sections';

export const migrations = [
  {
    up: migration_20260524_115348_initial.up,
    down: migration_20260524_115348_initial.down,
    name: '20260524_115348_initial',
  },
  {
    up: migration_20260624_184520_offer_detail_sections.up,
    down: migration_20260624_184520_offer_detail_sections.down,
    name: '20260624_184520_offer_detail_sections'
  },
];
