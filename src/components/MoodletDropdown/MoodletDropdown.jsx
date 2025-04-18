import React, { useState, useRef, useEffect } from 'react';
import '../Moodlet/Moodlet.css';
import './MoodletDropdown.css';
import Moodlet from '../Moodlet/Moodlet';


/**
 * Generates an array of option objects based on the provided moodlet types.
 *
 * @param {Object} moodletTypes - An object where keys represent moodlet types and values contain type data.
 * @param {Object.<string, { options: string[], word: string }>} moodletTypes - 
 *        The moodlet types object where each key is a type and its value contains:
 *        - `options` (Array<string>): An array of option IDs for the moodlet type.
 *        - `word` (string): A fallback word for the moodlet type.
 * @returns {Array<{ id: string, type: string, text: string }>} An array of option objects, 
 *          each containing:
 *          - `id` (string): The ID of the option.
 *          - `type` (string): The type key associated with the option.
 *          - `text` (string): The display text for the option.
 */
const generateOptions = (moodletTypes) => {
  if (!moodletTypes) return [];

  const options = [];


  Object.entries(moodletTypes).forEach(([typeKey, typeData]) => {
    if (typeData.options && typeData.options.length) {
      typeData.options.forEach((optionId) => {
        options.push({
          id: optionId,
          type: typeKey,
          text: optionId ? `Option ${optionId}` : typeData.word,
          disabled: typeData.disabled || false
        });
      });
    }
  });

  return options;
};

const MoodletDropdown = ({
  moodletTypes,
  styleType = 'default',
  optionViewMode = 'both',
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedStates, setSelectedStates] = useState({});
  const containerRef = useRef();
  const dropdownRef = useRef();
  // loading state for the dropdown // options to loop through
  const OPTIONS = moodletTypes ? generateOptions(moodletTypes) : [];




  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Adjust position when dropdown opens


  // Handle selection change
  const handleSelect = (id) => {
    setSelectedIds(prev => {
      // If already selected, remove element from selection with a filter which does the job in this case // no api needed
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }

      // Add the new selection
      const newSelection = [...prev, id];

      // Initialize state for this new selection
      setSelectedStates(prevStates => ({
        ...prevStates,
        [id]: 'required'
      }));

      // Notify parent component if needed
      if (onChange) {
        onChange(newSelection);
      }

      return newSelection;
    });
  };

  // Handle removing an item from selection
  const handleRemove = (id) => {
    setSelectedIds(prev => {
      const newSelection = prev.filter(selectedId => selectedId !== id);

      // Notify parent component if needed
      if (onChange) {
        onChange(newSelection);
      }

      return newSelection;
    });

    // Remove the state for this item
    setSelectedStates(prev => {
      const newStates = { ...prev };
      delete newStates[id];
      return newStates;
    });
  };

  // Handle state change for a selected moodlet
  const handleMoodletStateChange = (id, newState) => {
    setSelectedStates(prev => ({
      ...prev,
      [id]: newState
    }));
  };

  // Get the moodlet data for a specific type
  const getMoodletData = (type) => {
    return moodletTypes && moodletTypes[type] ? moodletTypes[type] : null;
  };

  // Find option data by ID
  const getOptionById = (id) => {
    return OPTIONS.find(opt => opt.id === id);
  };

  return (
    <div className='moodlet-dropdown-container'>


      <div className={`dropdown-container moodlet-dropdown`} ref={containerRef}>
        <h3>Personal take</h3>
        <div>
          <button
            className="button-select"
            onClick={() => setOpen(!open)}
          >
            <span className="select-placeholder">
              {selectedIds.length === 0 ? "Select Items" : `${selectedIds.length} Items Selected`}
            </span>
            <span className="dropdown-arrow">{open ? "▲" : "▼"}</span>
          </button>

          {/* Dropdown menu shown by select button */}
          {open && (
            <ul className="dropdown-menu" ref={dropdownRef}>
              {OPTIONS.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <li key={opt.id} className="dropdown-item">
                    <button
                      className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelect(opt.id)}
                      disabled={opt.disabled}
                    >
                      {(optionViewMode === 'moodlet' || optionViewMode === 'both') && (
                        <Moodlet
                          type={opt.type}
                          moodletData={getMoodletData(opt.type)}
                          displayType="letter"
                          styleType={styleType}
                          readOnly={opt.disabled ? false : true}
                          initialState={opt.disabled ? 'not-required' : 'required'}
                          renderAs='div'
                        />
                      )}
                      {(optionViewMode === 'text' || optionViewMode === 'both') && (
                        <span className="dropdown-item-text">{opt.text}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="selected-items-container">
            <h4 className="selected-items-title">Selected Items</h4>
            <ul className="selected-items-list">
              {selectedIds.map(id => {
                const option = getOptionById(id);
                if (!option) return null;

                return (
                  <li key={id} className="selected-item">
                    <div className="selected-item-content">
                      <Moodlet
                        type={option.type}
                        moodletData={getMoodletData(option.type)}
                        displayType="letter"
                        styleType={styleType}
                        readOnly={false}
                        initialState={selectedStates[id] || 'required'}
                        onChange={(_, newState) => handleMoodletStateChange(id, newState)}
                      />
                      <span className="selected-item-text">{option.text}</span>
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemove(id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                );
              })}
              {selectedIds.length === 0 && (
                <li className="no-items-selected">No items selected</li>
              )}
            </ul>
          </div>

        </div>
      </div>


      <div>
        <h3>Desktop</h3>
        <ul className="dropdown-menu" ref={dropdownRef}>
          {OPTIONS.map((opt) => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <li key={opt.id} className="dropdown-item">
                <button
                  className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                  disabled={opt.disabled}
                >
                  {(optionViewMode === 'moodlet' || optionViewMode === 'both') && (
                    <Moodlet
                      type={opt.type}
                      moodletData={getMoodletData(opt.type)}
                      displayType="letter"
                      styleType={styleType}
                      readOnly={opt.disabled ? false : true}
                      initialState={opt.disabled ? 'not-required' : 'required'}
                      renderAs='div'
                    />
                  )}
                  {(optionViewMode === 'text' || optionViewMode === 'both') && (
                    <span className="dropdown-item-text">{opt.text}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id='mobile-dropdown-container'>
        <h3>Mobile</h3>
        <ul className="dropdown-menu mobile" ref={dropdownRef}>
          {OPTIONS.map((opt) => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <li key={opt.id} className="dropdown-item">
                <button
                  className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                  disabled={opt.disabled}
                >
                  {(optionViewMode === 'moodlet' || optionViewMode === 'both') && (
                    <Moodlet
                      type={opt.type}
                      moodletData={getMoodletData(opt.type)}
                      displayType="letter"
                      styleType={styleType}
                      readOnly={opt.disabled ? false : true}
                      initialState={opt.disabled ? 'not-required' : 'required'}
                      renderAs='div'
                    />
                  )}
                  {(optionViewMode === 'text' || optionViewMode === 'both') && (
                    <span className="dropdown-item-text">{opt.text}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

    </div >
  );
};

export default MoodletDropdown;