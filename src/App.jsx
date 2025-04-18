import React, { useState } from 'react';
import './App.css';
import Moodlet from './components/Moodlet/Moodlet';
import MoodletDropdown from './components/MoodletDropdown/MoodletDropdown';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MOODLET_TYPES } from './types/MoodletTypes';

import {
  faGasPump,
  faWrench,
  faBroom,
  faShower,
  faWater,
  faMagnifyingGlass,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';


library.add(
  faGasPump,
  faWrench,
  faBroom,
  faShower,
  faWater,
  faMagnifyingGlass,
  faEllipsisH
);

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

  const [colorScheme, setColorScheme] = useState('')

  const handleColorSchemeChange = (scheme) => {
    setColorScheme(scheme)
  }

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
              onClick={() => setDisplayType('icon-only')}
              className={`menu-button ${displayType === 'icon-only' ? 'active' : ''}`}
            >
              Icon Version
            </button>
            <button
              onClick={() => setDisplayType('ellipsis')}
              className={`menu-button ${displayType === 'ellipsis' ? 'active' : ''}`}
            >
              Ellipsis <i className="fa-solid fa-ellipsis"></i>
            </button>
            <button
              onClick={() => setDisplayType('word')}
              className={`menu-button ${displayType === 'word' ? 'active' : ''}`}
            >
              Word Version
            </button>
            <button
              onClick={() => setDisplayType('icon-left')}
              className={`menu-button ${displayType === 'icon-left' ? 'active' : ''}`}
            >
              Icon Left Version
            </button>
            <button
              onClick={() => setDisplayType('icon-right')}
              className={`menu-button ${displayType === 'icon-right' ? 'active' : ''}`}
            >
              Icon Right Version
            </button>
          </div>
        </div>

        <div className='control-section'>
          <h3>Color scheme</h3>
          <div className="control-buttons">
            <button
              onClick={() => handleColorSchemeChange('')}
              className={`menu-button`}
            >
              Primary | Active Scheme
            </button>
            <button
              onClick={() => handleColorSchemeChange('secondary-theme')}
              className={`menu-button`}
            >
              Secondary | Planning Scheme
            </button>
            <button
              onClick={() => handleColorSchemeChange('inactive-theme')}
              className={`menu-button`}
            >
              Inactive Scheme
            </button>
            <button
              onClick={() => handleColorSchemeChange('blue-theme')}
              className={`menu-button`}
            >
              Blue | Released Scheme
            </button>
            <button
              onClick={() => handleColorSchemeChange('green-theme')}
              className={`menu-button`}
            >
              Green | OK Scheme
            </button>

            <button
              onClick={() => handleColorSchemeChange('red-theme')}
              className={`menu-button`}
            >
              Red | Stop/Block Scheme
            </button>

            <button
              onClick={() => handleColorSchemeChange('yellow-theme')}
              className={`menu-button`}
            >
              Yellow | Warning Scheme
            </button>

            <button
              onClick={() => handleColorSchemeChange('placeholder-theme')}
              className={`menu-button`}
            >
              Placeholder Scheme
            </button>
          </div>
        </div>

        {/* Following Design Moodlets */}
        <div className={`moodlet-section ${colorScheme}`}>
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
                readOnly={data.readOnly}
                disabled={data.disabled}
              />
            ))}
          </div>
        </div>

        {/* Better Clarity Moodlets */}
        <div className={`moodlet-section ${colorScheme}`}>
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
                readOnly={data.readOnly}
                disabled={data.disabled}
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
                <span className="moodlet-state">
                  {data.readOnly ? "READ-ONLY" :
                    data.disabled ? "DISABLED" :
                      moodletStates[key].toUpperCase().replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2>Dropdown area</h2>
        {/* Option view mode controls - styled to match dropdown */}
        <div className="control-section">
          <h3>Display Mode</h3>
          <p>When clicking any of these buttons it will close the "Dropdown" on the personal take, didn't fine tune it, but basically when clicking outside the "hidden dropdown", it will close it, made it that way that if the user clicks another element to close the 'open' ones, I could use external libraries for this but decided to keep to vanilla CSS and showcase the idea. Please click again on "select button" to see the variants.</p>
          <p>Clicking on any option will 'select' them, there is the ability of multi-select. To remove them is in 2 ways, click on the already selected option or on X button on "Selected Items List"</p>
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

          <p>
            I want to start by saying that this is the first time I'm trying to follow pixel perfect design. In my previous roles I had free-hand to design and show them to clients/managers including my most recent role at ProEnviro. Unfortunately, they terminated my role due to company issues (I loved working with them).
          </p>

          <p>
            The biggest challenge was that I was always having ideas of how to showcase most of the design, and tried to perfect my project. I've added just <del>Primary color scheme</del> 🥇added them all🥇<del> the rest can easily be added as a prop.</del>
          </p>

          <p>
            I have created a simple React application with my take on the Moodlet functionality as per the design + dropdown + few extra bits. The application includes two main sections: Moodlet and Dropdown area. I was tempted to add Tailwind to it, but I kept it vanilla (Pure CSS).
          </p>

          <p>
            I haven't gone overkill with the design, as I wanted to keep it simple and focused on the functionality and required design plus a personal touch to the dropdown, including a select option and a 'tab' option where the selected options will be shown.
          </p>

          <p>
            The "Moodlet" buttons (icons) work fine. The Moodlet component is reusable in different parts of the code, color schemes are easily customisable, I can just add an endless amount of them. I can keep this info for the next interview of what I could add more.
          </p>

          <p>
            I really tried to stay true to the design, but I had to make some adjustments to the dropdown component to make it more user-friendly and visually appealing. I hope you understand that this was done with the intention of improving the overall user experience. The dropdown size/gap wasn't working Figma representation with the sizes of the Dropdown, so I made the gap larger. I tried to stay within the 3 hours estimation, but when I noticed the time was already over midnight and stayed about 5 hours in total.
          </p>

          <p>
            On the dropdown area, I wasn't sure about the designer's vision if the dropdown should have Moodlet + text, or just text on the options, so I added both. Moodlet only, Text only and "Both" which is 'default'. Everything is highly customizable and new parts can/could always be added and improved on the design.
          </p>

          <p><strong>PS:</strong> I tried to deliver fast, as Easter is here, I will be gone 'afk' until Monday night. I hope you like it, and I am looking forward to hearing your feedback.</p>

          <p>
            <em>PS at PS:</em> Coding is fun, I do hope that what I created here is satisfactory. I would love to build a long-term career with your company, but I will see if the battle royale goes fine(winning over all other candidates). Got used to write here, but I will stop yapping and keep the rest for hopefully the next step.
          </p>

          <hr></hr>
          <p>Best regards,</p>
          <p>Marius T.</p>
        </div>
      )}

      <footer>
        <p>Created by Marius T.</p>
        <p>IQM Software Challenge</p>
        <p>17.04.2025</p>
        <div>
          Code: <a href='https://github.com/MariusTanase/Moodlet-Homework'>Github Repo</a>
          Live: <a href='https://moodlet-challenge.vercel.app'>Live - Vercel</a>
        </div>
      </footer>
    </div>
  );
}

export default App;