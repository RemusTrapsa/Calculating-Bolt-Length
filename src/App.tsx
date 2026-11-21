import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import InputForm from './components/InputForm/InputForm';
import Info from './components/Info/Info';
import { getData, storeData } from './helpers/localStorage';

const MAX_ENTRIES = 7;

// Allowance added for the nut and thread, by bolt diameter (inches).
const DIAMETER_ALLOWANCE: Record<string, number> = {
  '1/2': 0.6875,
  '5/8': 0.875,
  '3/4': 1,
  '7/8': 1.125,
  '1': 1.25
};

const roundUp = (value: number, increment: number) =>
  Math.ceil(value / increment) * increment;

const product = (a: string, b: string) => Number(a || 0) * Number(b || 0);

export default function App() {
  const [entries, setEntries] = useState<any[]>(() => getData('data') || []);

  useEffect(() => {
    storeData('data', entries);
  }, [entries]);

  const handleCalculate = (values: any) => {
    const allowance = DIAMETER_ALLOWANCE[values.diameter];

    if (allowance === undefined) {
      alert('Please select a valid diameter.');
      return;
    }

    const total =
      product(values.thickness1, values.quantity1) +
      product(values.thickness2, values.quantity2) +
      product(values.flatWasher, values.quantity3) +
      product(values.bevelWasher, values.quantity4) +
      allowance;

    const entry = {
      ...values,
      length: roundUp(total, 0.25).toFixed(2),
      id: uuidv4()
    };

    setEntries([...entries, entry].slice(-MAX_ENTRIES));
  };

  const handleDelete = (id: string) => {
    storeData('lastState', entries);
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleUndo = () => {
    const last = getData('lastState');
    if (last) setEntries(last);
  };

  return (
    <div className="container">
      <h3>Bolt Length Calculator</h3>

      <InputForm change={handleCalculate} />

      <h5>7 Day Data</h5>

      {entries.length > 0 ? (
        entries.map((entry) => (
          <Info key={entry.id} {...entry} deleteCard={handleDelete} />
        ))
      ) : (
        <p>No log found</p>
      )}

      {getData('lastState') !== null && (
        <button className="btn" onClick={handleUndo}>
          Undo
        </button>
      )}
    </div>
  );
}
