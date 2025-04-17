import React, { useState, useRef, useEffect } from 'react';
import '../Moodlet/Moodlet.css';
import './MoodletDropdown.css';
import Moodlet from '../Moodlet/Moodlet';

// Generate option objects based on moodlet types
const generateOptions = (moodletTypes) => {
  if (!moodletTypes) return [];
  
  const options = [];
  
  Object.entries(moodletTypes).forEach(([typeKey, typeData]) => {
    if (typeData.options && typeData.options.length) {
      typeData.options.forEach((optionId, index) => {
        options.push({
          id: optionId,
          type: typeKey,
          // I want to show original text
          text: 'Option ' + typeData.options[index] || typeData.word,
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
  const [selectedId, setSelectedId] = useState(null);
  const ref = useRef();
  
  // Generate options based on provided moodlet types
  const OPTIONS = moodletTypes ? generateOptions(moodletTypes) : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Handle selection change
  const handleSelect = (id) => {
    setSelectedId(id);
    setOpen(false);
    if (onChange) {
      onChange(id);
    }
  };

  // Get the selected option
  const selectedOption = OPTIONS.find(opt => opt.id === selectedId);
  
  // Get the moodlet data for a specific type
  const getMoodletData = (type) => {
    return moodletTypes && moodletTypes[type] ? moodletTypes[type] : null;
  };

  return (
    <div className="dropdown-container moodlet-dropdown" ref={ref}>
      {/* Main trigger button */}
      <button 
        className="button-select"
        onClick={() => setOpen(o => !o)}
      >
        {!selectedOption ? (
          <span className="select-placeholder">Select</span>
        ) : (
          // Always show "Moodlet - Text" in the selected button regardless of optionViewMode
          <div className="selected-display">
            <Moodlet
              type={selectedOption.type}
              moodletData={getMoodletData(selectedOption.type)}
              displayType="letter"
              styleType={styleType}
              readOnly={true}
              initialState="required"
            />
            <span className="selected-text">{selectedOption.text}</span>
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="dropdown-menu">
          {OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;
            
            return (
              <li key={opt.id} className="dropdown-item">
                <button
                  className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  {/* Moodlet part - only shown in moodlet or both modes */}
                  {(optionViewMode === 'moodlet' || optionViewMode === 'both') && (
                    <Moodlet
                      type={opt.type}
                      moodletData={getMoodletData(opt.type)}
                      displayType="letter"
                      styleType={styleType}
                      readOnly={true}
                      initialState="required"
                    />
                  )}

                  {/* Text part - only shown in text or both modes */}
                  {(optionViewMode === 'text' || optionViewMode === 'both') && (
                    <span className="dropdown-item-text">{opt.text}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MoodletDropdown;