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
  const [state, setState] = useState(initialState);
  // Get display information from the provided moodletData
  const getData = () => {
    if (!moodletData) return { letter: '', word: '' };
    return moodletData;
  };
  const { letter, word } = getData();
  const [displayMode, setDisplayMode] = useState(displayType);

  // Update the display mode when the displayType prop changes
  useEffect(() => {
    setDisplayMode(displayType);
  }, [displayType]);

  /**
   * Handles click and context menu events to update the state of a component.
   *
   * @param {Object} e - The event object.
   * @param {string} e.type - The type of the event ('click' or 'contextmenu').
   *
   * Event Flows:
   * - Left Click Flow:
   *   - 'required' → 'current'
   *   - 'current' → 'completed'
   *   - 'completed' → 'current'
   *
   * - Right Click Flow:
   *   - 'required' → 'not-required'
   *   - 'not-required' → 'required'
   *   - 'completed' → 'required'
   *
   * If the state changes, the `setState` function is called to update the state,
   * and the `onChange` callback is invoked (if provided) with the type and new state.
   *
   * @fires onChange - Triggered when the state changes, passing the type and new state.
   */
  const handleClick = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
    }

    let newState = state;
    if (e.type === 'click') {
      if (state === 'required') {
        newState = 'current';
      } else if (state === 'current') {
        newState = 'completed';
      } else if (state === 'completed') {
        newState = 'current';
      }
    }
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

  /**
   * Determines the color based on the current state.
   *
   * @returns {string} The color corresponding to the state. Possible values are:
   * - 'disabled' for 'not-required' state or default case.
   * - 'purple' for 'required' state.
   * - 'red' for 'current' state.
   * - 'green' for 'completed' state.
   */
  const getColor = () => {
    if (state === 'not-required') return 'disabled';
    if (state === 'required') return 'purple';
    if (state === 'current') return 'red';
    if (state === 'completed') return 'green';
    return 'disabled';
  };

  /**
   * Retrieves the text to display based on the current display mode.
   *
   * @returns {string} The text to display. If the display mode is 'letter', it returns the `letter`.
   * Otherwise, it returns the `word` converted to uppercase.
   */
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