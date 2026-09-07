import type { ThemeConfig } from '../types';

export const FONT_STACKS: { label: string; value: string }[] = [
  { label: 'System', value: 'system-ui, sans-serif' },
  { label: 'Serif', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Rounded', value: '"Segoe UI", Verdana, sans-serif' },
  { label: 'Mono', value: 'ui-monospace, Consolas, monospace' },
];

export const THEME_PRESETS: { name: string; theme: ThemeConfig }[] = [
  {
    name: 'Minimal',
    theme: {
      fontHeading: 'system-ui, sans-serif',
      fontBody: 'system-ui, sans-serif',
      colorPrimary: '#111827',
      colorAccent: '#7c3aed',
      colorBackground: '#ffffff',
      spacingScale: 'normal',
    },
  },
  {
    name: 'Modern Serif',
    theme: {
      fontHeading: 'Georgia, "Times New Roman", serif',
      fontBody: 'system-ui, sans-serif',
      colorPrimary: '#1e293b',
      colorAccent: '#0d9488',
      colorBackground: '#f8fafc',
      spacingScale: 'spacious',
    },
  },
  {
    name: 'Bold',
    theme: {
      fontHeading: '"Segoe UI", Verdana, sans-serif',
      fontBody: 'system-ui, sans-serif',
      colorPrimary: '#0a0a0a',
      colorAccent: '#f97316',
      colorBackground: '#ffffff',
      spacingScale: 'compact',
    },
  },
  {
    name: 'Warm',
    theme: {
      fontHeading: 'Georgia, "Times New Roman", serif',
      fontBody: '"Segoe UI", Verdana, sans-serif',
      colorPrimary: '#57534e',
      colorAccent: '#e11d48',
      colorBackground: '#fdf6ec',
      spacingScale: 'normal',
    },
  },
];
