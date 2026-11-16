import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

const InputForm = ({ change }) => {
  const [state, setState] = useState(initialValues);

  const handleChange = (e) => {
    let { value, name } = e.target;

    if (
      ["thickness1", "quantity1", "thickness2", "quantity2", "flatWasher", "quantity3", "bevelWasher", "quantity4"].includes(name)
      && Number(value) > 999.75
    ) {
      value = "999.75";
    }

    const date = new Date().toLocaleString().split(',')[0];
    setState({ ...state, [name]: value, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    change(state);
    setState(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Thickness of part 1 (in inches)</p>
      <input name="thickness1" value={state.thickness1} onChange={handleChange} />

      <p>Quantity</p>
      <input name="quantity1" value={state.quantity1} onChange={handleChange} />

      <p>Thickness of part 2 (in inches)</p>
      <input name="thickness2" value={state.thickness2} onChange={handleChange} />

      <p>Quantity</p>
      <input name="quantity2" value={state.quantity2} onChange={handleChange} />

      <p>Flat washers 0.16 (in inches)</p>
      <input name="flatWasher" value={state.flatWasher} onChange={handleChange} />

      <p>Quantity</p>
      <input name="quantity3" value={state.quantity3} onChange={handleChange} />

      <p>Bevel washers 0.32 (in inches)</p>
      <input name="bevelWasher" value={state.bevelWasher} onChange={handleChange} />

      <p>Quantity</p>
      <input name="quantity4" value={state.quantity4} onChange={handleChange} />

      <p>Diameter (in inches)</p>
      <select
        name="diameter"
        className="browser-default"
        value={state.diameter}
        onChange={handleChange}
      >
        <option value="">Select diameter</option>
        <option value="1/2">1/2</option>
        <option value="5/8">5/8</option>
        <option value="3/4">3/4</option>
        <option value="7/8">7/8</option>
        <option value="1">1</option>
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

