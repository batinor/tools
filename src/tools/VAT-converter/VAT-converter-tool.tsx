import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';

export function VATConverterTool() {
  const [excVAT, setExcVAT] = useState('');
  const [incVAT, setIncVAT] = useState('');
  const [VAT, setVAT] = useState(0.2);

  const handleExcVATChange = (value: string) => {
    setExcVAT(value);

    if (!value) {
      setIncVAT('');
      return;
    }

    const ht = parseFloat(value);
    if (!isNaN(ht)) {
      const ttc = (ht * (1 + VAT)).toFixed(2);
      setIncVAT(ttc);
    }
  };

  const handleIncVATChange = (value: string) => {
    setIncVAT(value);

    if (!value) {
      setExcVAT('');
      return;
    }

    const ttc = parseFloat(value);
    if (!isNaN(ttc)) {
      const ht = (ttc / (1 + VAT)).toFixed(2);
      setExcVAT(ht);
    }
  };

  const handleVATChange = (value: string) => {
    const rate = parseFloat(value);
    setVAT(rate);

    // Recalcul si HT rempli
    if (excVAT) {
      const ht = parseFloat(excVAT);
      if (!isNaN(ht)) {
        setIncVAT((ht * (1 + rate)).toFixed(2));
      }
    }

    // Recalcul si TTC rempli
    if (incVAT && !excVAT) {
      const ttc = parseFloat(incVAT);
      if (!isNaN(ttc)) {
        setExcVAT((ttc / (1 + rate)).toFixed(2));
      }
    }
  };

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="vat_rate">Choisir un taux de TVA</FieldLabel>
            <FieldDescription />
            <Select onValueChange={handleVATChange} defaultValue="0.2">
              <SelectTrigger id="vat_rate">
                <SelectValue placeholder="Taux de TVA" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0.2">20%</SelectItem>
                  <SelectItem value="0.1">10%</SelectItem>
                  <SelectItem value="0.055">5.5%</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="excluding-vat">Montant HT</FieldLabel>
            <FieldDescription>Indiquer le montant HT en euros</FieldDescription>
            <Input
              id="excluding-vat"
              type="number"
              value={excVAT}
              onChange={(e) => handleExcVATChange(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="including-vat">Montant TTC</FieldLabel>
            <FieldDescription>
              Indiquer le montant TTC en euros
            </FieldDescription>
            <Input
              id="including-vat"
              type="number"
              value={incVAT}
              onChange={(e) => handleIncVATChange(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
