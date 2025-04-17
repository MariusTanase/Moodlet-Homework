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

  //handles navbar changes
  const [navbarOption, setNavbarOption] = useState('moodlet');



  return (
    <div className="app">

      <nav className="navbar">
        <h2>IQM Software Challenge</h2>
        <div>
          <button
            onClick={() => setNavbarOption('moodlet')}
            className={`menu-button ${navbarOption === 'moodlet' ? 'active' : ''}`}
          >
            Moodlet
          </button>
          <button
            onClick={() => setNavbarOption('other')}
            className={`menu-button ${navbarOption === 'other' ? 'active' : ''}`}
          >
            Personal Notes
          </button>
        </div>
      </nav>

      {navbarOption === 'moodlet' ? (<div>
        <h2>Moodlet take</h2>
        <p>There are multiple buttons on each step including navbar, please click them :D</p>
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

        <h2>Dropdown area</h2>
        {/* Option view mode controls - styled to match dropdown */}
        <div className="control-section">
          <h3>Display Mode</h3>
          <p>When clicking any of these buttons it will reset the "Dropdown", didn't work too much on this, I know is bad UX. Please click again on "select button" to see the variants.</p>
          <p>You can select multiple variants, if I have enough time in the morning I will add the option to deselect them from select dropdown.</p>
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
          <h2>Dropdown</h2>
          <div className="dropdown-examples">
            <div className="dropdown-example">
              <h3>Bellow is a select option:</h3>
              <MoodletDropdown
                moodletTypes={MOODLET_TYPES}
                styleType="default"
                optionViewMode={optionViewMode}
              />
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className='personal-notes'>
          <h2>My take on the challenge</h2>

          <p>I want to start that this is the first time trying to follow pixel perfect design, in my previous roles I had free-hand to design and show them to clients/managers including my most recent role at ProEnviro. Unfortunatelly, they terminated my role due company issues(loved to work with them)</p>
          <p>
            I have created a simple React application with my take on the moodlet functionality as per the design + dropdown + few extra bits. The application includes two main sections: Moodlet and Dropdown area. I was tempted to add Tailwind to it, but I kept it vanilla (Pure CSS)
          </p>
          <p>
            I haven't gone overkill with the design, as I wanted to keep it simple and focused on the functionality and required design plus a personal touch to the dropdown, including a select option and a 'tab' option where the selected options will be shown.
          </p>

          <p>
            The "Moodlet" buttons (icons) works fine. The Moodlet component is reusable in different parts of the code.
          </p>

          <p>
            I really tried to stay true to the design, but I had to make some adjustments to the dropdown component to make it more user-friendly and visually appealing. I hope you understand that this was done with the intention of improving the overall user experience. The dropdown size / gap wasn't working that fine for me today, so I made the gap larger. I tried to stay within the 3 hours estimation, but when I noticed the time was already over midnight and stayed about 5 hours in total.
          </p>

          <p> On the dropdown area, I wasn't sure about the designer vision if the dropdown should have Moodlet + text, or just text on the options, so I added both. Moodlet only, Text only and "Both" which is 'default', everything is highly customisable and new parts can/could always be added and improved on the design.</p>

          <p><strong>PS.</strong></p>
          <p>
            I tried to deliver fast, as Easter is here, I will be gone 'afk' until Monday night.
          </p>
          <p>
            I hope you like it, and I am looking forward to hearing your feedback.
          </p>
          <p><em>PS at PS</em></p>
          <p>Coding is fun, I do hope I will pass to the next step and work together with you all. I will probably stay until pension, LoL.</p>
          <p> Got used to write here, but I will stop yapping and keep the rest for hopefully the next step.</p>

          <hr></hr>
          <p>Best regards,</p>
          <p>Marius T.</p>

        </div>
      )}
    </div>
  );
}

export default App;