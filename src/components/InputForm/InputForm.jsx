import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MAX_VALUE = 999.75;

const initialValues = {
  thickness1: '',
  quantity1: '',
  thickness2: '',
  quantity2: '',
  flatWasher: '0.16',
  quantity3: '',
  bevelWasher: '0.32',
  quantity4: '',
  date: '',
  diameter: ''
};

const fields = [
  ['thickness1', 'Thickness of part 1 (in inches)'],
  ['quantity1', 'Quantity'],
  ['thickness2', 'Thickness of part 2 (in inches)'],
  ['quantity2', 'Quantity'],
  ['flatWasher', 'Flat washers 0.16 (in inches)'],
  ['quantity3', 'Quantity'],
  ['bevelWasher', 'Bevel washers 0.32 (in inches)'],
  ['quantity4', 'Quantity']
];

const diameters = ['1/2', '5/8', '3/4', '7/8', '1'];

const InputForm = ({ change }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name !== 'diameter' && Number(value) > MAX_VALUE) {
      value = String(MAX_VALUE);
    }

    const date = new Date().toLocaleString().split(',')[0];
    setValues({ ...values, [name]: value, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    change(values);
    setValues(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(([name, label]) => (
        <React.Fragment key={name}>
          <p>{label}</p>
          <input name={name} value={values[name]} onChange={handleChange} />
        </React.Fragment>
      ))}

      <p>Diameter (in inches)</p>
      <select
        name="diameter"
        className="browser-default"
        value={values.diameter}
        onChange={handleChange}
      >
        <option value="">Select diameter</option>
        {diameters.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <br />
      <br />
      <button type="submit" className="btn">
        Calculate Bolt Length
      </button>
    </form>
  );
};

InputForm.propTypes = {
  change: PropTypes.func.isRequired
};

export default InputForm;
