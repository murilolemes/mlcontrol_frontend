'use client';

export const conditions = [
  { name: 'hipertensao', label: 'Hipertensão' },
  { name: 'diabetes', label: 'Diabetes' },
  { name: 'rim', label: 'Rim' },
  { name: 'cardiac', label: 'Problemas Cardíacos' },
  { name: 'cifose', label: 'Cifose' },
  { name: 'escolioseC', label: 'Escoliose C' },
  { name: 'escolioseS', label: 'Escoliose S' },
  { name: 'lordose', label: 'Lordose' },
  { name: 'cabeca', label: 'Cabeça' },
  { name: 'postura', label: 'Postura Inclinada' },
  { name: 'ombros', label: 'Ombros' },
  { name: 'anteriorizacao', label: 'Anteriorização' },
  { name: 'quadril', label: 'Quadril' },
  { name: 'anteversao', label: 'Anteversão' },
  { name: 'retroversao', label: 'Retroversão' },
  { name: 'joelho', label: 'Joelhos' },
  { name: 'genovalgo', label: 'Genovalgo' },
  { name: 'genovaro', label: 'Genovaro' },
  { name: 'hiperextensao', label: 'Hiperextensão' },
] as const;

export type PathologyFieldName =
  (typeof conditions)[number]['name'];