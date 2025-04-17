import React, { useState, useEffect } from 'react';
import './Moodlet.css';

// Single Moodlet button component
const Moodlet = ({
  type,
  initialState = 'required',
  displayType = 'letter',
  styleType = 'default',
  moodletData,
  onChange,
  readOnly = false,
  renderAs = 'button'
}) => {
  // Track state for this individual moodlet
  const [state, setState] = useState(initialState);

  // Get display information from the provided moodletData
  const getData = () => {
    if (!moodletData) return { letter: '', word: '' };
    return moodletData;
  };

  const { letter, word } = getData();

  // Update display type when prop changes
  const [displayMode, setDisplayMode] = useState(displayType);
  useEffect(() => {
    setDisplayMode(displayType);
  }, [displayType]);

  const handleClick = (e) => {
    // Prevent the browser context menu on right-click
    if (e.type === 'contextmenu') {
      e.preventDefault();
    }

    let newState = state;

    // LEFT-click: required → current → completed → current
    if (e.type === 'click') {
      if (state === 'required') {
        newState = 'current';
      } else if (state === 'current') {
        newState = 'completed';
      } else if (state === 'completed') {
        newState = 'current';
      }
    }
    // RIGHT-click: toggle or reset
    else if (e.type === 'contextmenu') {
      if (state === 'required') {
        newState = 'not-required';
      } else if (state === 'not-required') {
        newState = 'required';
      } else if (state === 'completed') {
        newState = 'required';
      }
    }

    if (newState !== state) {
      setState(newState);
      if (onChange) {
        onChange(type, newState);
      }
    }
  };

  // Get color based on state
  const getColor = () => {
    if (state === 'not-required') return 'disabled';
    if (state === 'required') return 'purple';
    if (state === 'current') return 'red';
    if (state === 'completed') return 'green';
    return 'disabled'; // fallback
  };

  // Get text to display based on display type
  const getText = () => {
    return displayMode === 'letter' ? letter : word.toUpperCase();
  };

  const baseClass = styleType === 'clarity' ? 'moodlet-clarity' : 'moodlet';
  const sizeClass = displayMode === 'word' ? 'word' : 'letter';
  const readOnlyClass = readOnly ? 'read-only' : '';


  return renderAs === 'button' ? (
    <button
      className={`${readOnlyClass} ${baseClass} ${getColor()} ${sizeClass} `}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {getText()}
    </button>
  ) : (
    <div
      className={`${readOnlyClass} ${baseClass} ${getColor()} ${sizeClass} `}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {getText()}
    </div>
  );
};

export default Moodlet;