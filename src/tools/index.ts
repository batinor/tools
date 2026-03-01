import { BadgeEuroIcon, ClockIcon } from 'lucide-react';
import { VATConverterTool } from './VAT-converter/VAT-converter-tool';
import { TimeDecimalConverterTool } from './time-decimal-converter/time-decimal-converter-tool.tsx';

export const tools = [
  {
    id: 'vat-converter',
    name: 'Simulateur - Calculateur prix HT ou TTC',
    icon: BadgeEuroIcon,
    description:
      'Calculez rapidement le prix HT ou TTC en fonction du taux de TVA.',
    component: VATConverterTool,
  },
  {
    id: 'time-decimal-converter',
    name: 'Convertisseur heures ⇄ décimales',
    icon: ClockIcon,
    description:
      'Convertissez facilement les heures en décimales et vice versa',
    component: TimeDecimalConverterTool,
  },
];
