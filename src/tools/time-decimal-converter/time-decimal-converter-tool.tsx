import { useState } from 'react';

import { Input } from '@/components/ui/input';

import { Card, CardContent } from '@/components/ui/card';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';

export function TimeDecimalConverterTool() {
  const [time, setTime] = useState(''); // HH:MM
  const [decimal, setDecimal] = useState(''); // décimal string
  const [error, setError] = useState<string | null>(null);

  /* ------------------ Conversion utils ------------------ */

  const parseTimeToDecimal = (value: string) => {
    const [hoursStr, minutesStr] = value.split(':');
    if (!hoursStr || !minutesStr) return null;

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes) || minutes < 0 || minutes >= 60)
      return null;

    return (hours + minutes / 60).toFixed(2);
  };

  const parseDecimalToTime = (value: string) => {
    const decimalValue = Number(value);
    if (isNaN(decimalValue)) return null;

    let hours = Math.floor(decimalValue);
    let minutes = Math.round((decimalValue - hours) * 60);

    // Gestion minutes = 60
    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  /* ------------------ Handlers ------------------ */

  const handleTimeChange = (value: string) => {
    setTime(value);
    setError(null);

    if (!value) {
      setDecimal('');
      return;
    }

    const result = parseTimeToDecimal(value);
    if (!result) {
      setError('Format de temps invalide (HH:MM)');
      setDecimal('');
      return;
    }

    setDecimal(result);
  };

  const handleDecimalChange = (value: string) => {
    // Autoriser uniquement chiffres et "." ou ","
    if (!/^[0-9.,]*$/.test(value)) return;

    const normalized = value.replace(',', '.');
    setDecimal(normalized);
    setError(null);

    if (!normalized) {
      setTime('');
      return;
    }

    // Validation stricte
    if (!/^(\d+(\.\d+)?|\.\d+)$/.test(normalized)) {
      return;
    }

    const result = parseDecimalToTime(normalized);
    if (!result) {
      setError('Conversion impossible');
      setTime('');
      return;
    }

    setTime(result);
  };

  /* ------------------ Génération tableau ------------------ */
  const generateTableRows = () => {
    const rows = [];
    const totalMinutes = 60; // 1 heure
    const step = 5; // palier 5 minutes

    for (let min = 0; min <= totalMinutes; min += step) {
      const hours = Math.floor(min / 60);
      const minutes = min % 60;
      const hhmm = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const decimalValue = (hours + minutes / 60).toFixed(2);
      rows.push({ hhmm, decimal: decimalValue });
    }

    return rows;
  };

  const tableRows = generateTableRows();

  /* ------------------ UI ------------------ */

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Temps (HH:MM)</FieldLabel>
            <FieldDescription>Exemple : 01:30</FieldDescription>
            <Input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              step={60} // minute
            />
          </Field>

          <Field>
            <FieldLabel>Heures décimales</FieldLabel>
            <FieldDescription>Exemple : 1.50</FieldDescription>
            <Input
              type="text"
              inputMode="decimal"
              value={decimal}
              onChange={(e) => handleDecimalChange(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Card>
        <CardContent>
          <Table className="text-xs">
            <TableCaption>
              Conversion temps → décimal (1h par palier de 5 min)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Temps (HH:MM)</TableHead>
                <TableHead>Décimal (h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.hhmm}</TableCell>
                  <TableCell>{row.decimal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </FieldGroup>
  );
}
