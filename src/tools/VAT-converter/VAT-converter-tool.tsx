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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';

import { Card, CardContent } from '@/components/ui/card';

import { isValidNumber, normalizeNumber } from '@/lib/utils';

export function VATConverterTool() {
  const [excVAT, setExcVAT] = useState('');
  const [incVAT, setIncVAT] = useState('');
  const [excVATError, setExcVATError] = useState<string | null>(null);
  const [incVATError, setIncVATError] = useState<string | null>(null);
  const [VAT, setVAT] = useState(0.2);
  const invalidNumberError = 'Le montant saisie doit être un nombre valide.';

  const handleExcVATChange = (value: string) => {
    const normalized = normalizeNumber(value);
    setExcVAT(normalized);

    if (!normalized) {
      setExcVATError(null);
      setIncVAT('');
      return;
    }

    if (!isValidNumber(normalized)) {
      setExcVATError(invalidNumberError);
      return;
    }

    setExcVATError(null);

    const ht = parseFloat(normalized);
    setIncVAT((ht * (1 + VAT)).toFixed(2));
  };
  const handleIncVATChange = (value: string) => {
    const normalized = normalizeNumber(value);
    setIncVAT(normalized);

    if (!normalized) {
      setIncVATError(null);
      setExcVAT('');
      return;
    }

    if (!isValidNumber(normalized)) {
      setIncVATError(invalidNumberError);
      return;
    }

    setIncVATError(null);

    const ttc = parseFloat(normalized);
    setExcVAT((ttc / (1 + VAT)).toFixed(2));
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

  const vatAmount =
    excVAT && incVAT
      ? (parseFloat(incVAT) - parseFloat(excVAT)).toFixed(2)
      : '';

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
              type="text"
              inputMode="decimal"
              value={excVAT}
              onChange={(e) => handleExcVATChange(e.target.value)}
            />
            {excVATError && <FieldError>{excVATError}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="including-vat">Montant TTC</FieldLabel>
            <FieldDescription>
              Indiquer le montant TTC en euros
            </FieldDescription>
            <Input
              id="including-vat"
              type="text"
              inputMode="decimal"
              value={incVAT}
              onChange={(e) => handleIncVATChange(e.target.value)}
            />
            {incVATError && <FieldError>{incVATError}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
      {vatAmount && (
        <Card>
          <CardContent className="">
            Le montant de la TVA est de : {vatAmount} €
          </CardContent>
        </Card>
      )}
    </FieldGroup>
  );
}
