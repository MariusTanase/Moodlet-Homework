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

      {/* Display toggle */}
      <div className="controls">
        <button onClick={() => setDisplayType('letter')} className={displayType === 'letter' ? 'active' : ''}>
          Letter Version
        </button>
        <button onClick={() => setDisplayType('word')} className={displayType === 'word' ? 'active' : ''}>
          Word Version
        </button>
      </div>

      {/* Following Design Moodlets */}
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

      {/* Better Clarity Moodlets */}
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

      <h3>Showing that statuses changes properly</h3>
      <div className="moodlet-statuses">
        {Object.entries(MOODLET_TYPES).map(([key, data]) => (
          <div key={key} className="moodlet-status">
            <span className="moodlet-type">{data.word}: </span>
            <span className="moodlet-state">{moodletStates[key].toUpperCase().replace('-', ' ')}</span>
          </div>
        ))}
      </div>

      <div className="dropdown-controls">
        <button onClick={() => setOptionViewMode('moodlet')} className={optionViewMode === 'moodlet' ? 'active' : ''}>
          Moodlet Only
        </button>
        <button onClick={() => setOptionViewMode('text')} className={optionViewMode === 'text' ? 'active' : ''}>
          Text Only
        </button>
        <button onClick={() => setOptionViewMode('both')} className={optionViewMode === 'both' ? 'active' : ''}>
          Both
        </button>
      </div>

      <h2>Dropdown examples</h2>
      <div className="dropdown-examples">
        <div>
          <h3>Following design</h3>
          <MoodletDropdown
            moodletTypes={MOODLET_TYPES}
            styleType="default"
            optionViewMode={optionViewMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;