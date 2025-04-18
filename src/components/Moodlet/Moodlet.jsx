import React, { useState, useEffect } from 'react';
import './Moodlet.css';
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const Moodlet = ({
  type,
  initialState = 'required',
  displayType = 'letter',
  styleType = 'default',
  moodletData,
  onChange,
  readOnly = false,
  disabled = false,
  renderAs = 'button'
}) => {
  const [state, setState] = useState(initialState);

  // Get display information from the provided moodletData
  const getData = () => {
    if (!moodletData) return { letter: '', word: '', icon: '', ellipsis: false, disabled: true, readOnly: true };
    return moodletData;
  };

  const { letter, word, icon } = getData();
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
    // preventing click activity on readOnly and disabled buttons
    if (readOnly || disabled) return;

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
    if (state === 'required') return 'primary';
    if (state === 'current') return 'red';
    if (state === 'completed') return 'green';
    return 'disabled';
  };

  /**
   * Renders the content based on display mode.
   */
  const renderContent = () => {
    switch (displayMode) {
      case 'letter':
        return letter;
      case 'word':
        return word.toUpperCase();
      case 'icon-only':
        return icon;
      case 'ellipsis':
        return <FontAwesomeIcon icon={faEllipsisH} />;
      case 'icon-left':
        return (
          <>
            <span className="moodlet-icon">{icon}</span>
            <span className="moodlet-text">{word.toUpperCase()}</span>
          </>
        );
      case 'icon-right':
        return (
          <>
            <span className="moodlet-text">{word.toUpperCase()}</span>
            <span className="moodlet-icon">{icon}</span>
          </>
        );
      default:
        return letter;
    }
  };

  // Determine CSS classes
  const baseClass = styleType === 'clarity' ? 'moodlet-clarity' : 'moodlet';

  // Set the size class based on display mode
  let sizeClass;
  if (displayMode === 'word' || displayMode === 'icon-left' || displayMode === 'icon-right') {
    sizeClass = 'word';
  } else if (displayMode === 'icon-only' || displayMode === 'ellipsis') {
    sizeClass = 'icon';
  } else {
    sizeClass = 'letter';
  }

  // Additional classes
  const readOnlyClass = readOnly ? 'read-only' : '';
  const withIconClass = (displayMode === 'icon-left' || displayMode === 'icon-right') ? 'with-icon' : '';
  const ellipsisClass = displayMode === 'ellipsis' ? 'ellipsis' : '';
  const disabledClass = disabled ? 'disabled' : '';

  // Common props for both button and div
  const commonProps = {
    className: `${readOnlyClass} ${disabledClass} ${baseClass} ${getColor()} ${sizeClass} ${withIconClass} ${ellipsisClass}`,
    onClick: handleClick,
    onContextMenu: handleClick
  };

  // Render as either a button or a div based on the renderAs prop
  return renderAs === 'button' ? (
    <button {...commonProps}>
      {renderContent()}
    </button>
  ) : (
    <div {...commonProps}>
      {renderContent()}
    </div>
  );
};

export default Moodlet;