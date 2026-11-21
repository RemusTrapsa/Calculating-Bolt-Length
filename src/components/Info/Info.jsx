import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ id, diameter, thickness1, thickness2, date, length, deleteCard }) => (
  <div className="col m6 s12">
    <div className="card">
      <div className="card-content">
        <span className="card-title">Bolt length: {length} inches</span>
        <div className="card-data">
          <span>Diameter : {diameter} inches</span>
          <span>Thickness of part 1 : {thickness1} inches</span>
          <span>Thickness of part 2: {thickness2} inches</span>
          <span>Date: {date}</span>
        </div>

        <button className="delete-btn" onClick={() => deleteCard(id)}>
          X
        </button>
      </div>
    </div>
  </div>
);

Info.propTypes = {
  id: PropTypes.string,
  diameter: PropTypes.string,
  thickness1: PropTypes.string,
  thickness2: PropTypes.string,
  date: PropTypes.string,
  length: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;
