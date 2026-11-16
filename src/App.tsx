import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from "./components/InputForm/InputForm";
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import { getData, storeData } from './helpers/localStorage';
import Info from './components/Info/Info';

export default function App() {
const initialState = () => getData('data') || [];
const [state, setState] = useState(initialState);

useEffect(() => {
storeData('data', state);
}, [state]);

function roundNum(value: number, increment: number) {
return Math.ceil(value / increment) * increment;
}

const handleChange = (val: any) => {
const diam: Record<string, number> = {
"1/2": 0.6875,
"5/8": 0.875,
"3/4": 1,
"7/8": 1.125,
"1": 1.25
};

const d1 = diam[val.diameter];

if (d1 === undefined) {
alert("Please select a valid diameter.");
return;
}

const total =
Number(val.thickness1 || 0) * Number(val.quantity1 || 0) +
Number(val.thickness2 || 0) * Number(val.quantity2 || 0) +
Number(val.flatWasher || 0) * Number(val.quantity3 || 0) +
Number(val.bevelWasher || 0) * Number(val.quantity4 || 0) +
d1;

const newVal = {
...val,
length: roundNum(total, 0.25).toFixed(2),
id: uuidv4()
};

let updated = [...state, newVal];
if (updated.length > 7) updated = updated.slice(1);

setState(updated);
};

const handleDelete = (id: string) => {
storeData('lastState', state);
setState(state.filter((i: any) => i.id !== id));
};

const handleUndo = () => {
const last = getData('lastState');
if (last) setState(last);
};

return (
<div className="container">
<h3>Bolt Length Calculator</h3>

<InputForm change={handleChange} />

<h5>7 Day Data</h5>

{state.length > 0 ? (
<>
{state.map((info: any) => (
<Info key={info.id} {...info} deleteCard={handleDelete} />
))}
</>
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
