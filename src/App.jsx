import React, { useState } from 'react';
import './App.css';
import Moodlet from './components/Moodlet/Moodlet';
import MoodletDropdown from './components/MoodletDropdown/MoodletDropdown';

// some default moodlet types that follows the design + extra examples
export const MOODLET_TYPES = {
  F: { letter: 'F', word: 'Fuelling', options: ['F1', 'F2', 'F3', 'F4'] },
  S: { letter: 'S', word: 'Servicing', options: ['S1', 'S2', 'S3', 'S4'] },
  C: { letter: 'C', word: 'Cleaning', options: ['C1', 'C2', 'C3', 'C4'] },
  D1: { letter: 'D', word: 'Draining', options: ['D1'] },
  D2: { letter: 'W', word: 'Washing', options: ['W1', 'W2'] },
};

function App() {
  const [displayType, setDisplayType] = useState('letter');
  const [optionViewMode, setOptionViewMode] = useState('both');

  const [moodletStates, setMoodletStates] = useState({
    ...Object.keys(MOODLET_TYPES).reduce((acc, key) => {
      acc[key] = 'required';
      return acc;
    }, {})
  });

  // Handle state changes from individual moodlets
  const handleMoodletChange = (type, newState) => {
    setMoodletStates(prev => ({
      ...prev,
      [type]: newState
    }));
  };

  return (
    <div className="app">
      <h1>FSC Moodlet Demo</h1>

      {/* Display toggle - styled to match dropdown */}
      <div className="control-section">
        <h3>Display Type</h3>
        <div className="control-buttons">
          <button
            onClick={() => setDisplayType('letter')}
            className={`menu-button ${displayType === 'letter' ? 'active' : ''}`}
          >
            Letter Version
          </button>
          <button
            onClick={() => setDisplayType('word')}
            className={`menu-button ${displayType === 'word' ? 'active' : ''}`}
          >
            Word Version
          </button>
        </div>
      </div>

      {/* Following Design Moodlets */}
      <div className="moodlet-section">
        <h3>Following design</h3>
        <div className="fsc-moodlets">
          {Object.entries(MOODLET_TYPES).map(([key, data]) => (
            <Moodlet
              key={key}
              type={key}
              moodletData={data}
              displayType={displayType}
              styleType="default"
              initialState={moodletStates[key]}
              onChange={handleMoodletChange}
              readOnly={false}
            />
          ))}
        </div>
      </div>

      {/* Better Clarity Moodlets */}
      <div className="moodlet-section">
        <h3>For better clarity</h3>
        <div className="fsc-moodlets">
          {Object.entries(MOODLET_TYPES).map(([key, data]) => (
            <Moodlet
              key={key}
              type={key}
              moodletData={data}
              displayType={displayType}
              styleType="clarity"
              initialState={moodletStates[key]}
              onChange={handleMoodletChange}
            />
          ))}
        </div>
      </div>

      <div className="moodlet-section">
        <h3>Showing that statuses changes properly</h3>
        <div className="moodlet-statuses">
          {Object.entries(MOODLET_TYPES).map(([key, data]) => (
            <div key={key} className="moodlet-status">
              <span className="moodlet-type">{data.word}: </span>
              <span className="moodlet-state">{moodletStates[key].toUpperCase().replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Option view mode controls - styled to match dropdown */}
      <div className="control-section">
        <h3>Display Mode</h3>
        <div className="control-buttons">
          <button
            onClick={() => setOptionViewMode('moodlet')}
            className={`menu-button ${optionViewMode === 'moodlet' ? 'active' : ''}`}
          >
            Moodlet Only
          </button>
          <button
            onClick={() => setOptionViewMode('text')}
            className={`menu-button ${optionViewMode === 'text' ? 'active' : ''}`}
          >
            Text Only
          </button>
          <button
            onClick={() => setOptionViewMode('both')}
            className={`menu-button ${optionViewMode === 'both' ? 'active' : ''}`}
          >
            Both
          </button>
        </div>
      </div>

      <div className="dropdown-section">
        <h2>Dropdown example</h2>
        <div className="dropdown-examples">
          <div className="dropdown-example">
            <h3>Following design</h3>
            <MoodletDropdown
              moodletTypes={MOODLET_TYPES}
              styleType="default"
              optionViewMode={optionViewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;