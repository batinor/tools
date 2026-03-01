import { VATConverterTool } from './VAT-converter/VAT-converter-tool';

export const tools = [
  {
    id: 'vat-converter',
    name: 'Simulateur - Calculateur prix HT ou TTC',
    description:
      'Calculez rapidement le prix HT ou TTC en fonction du taux de TVA.',
    component: VATConverterTool,
  },
];
