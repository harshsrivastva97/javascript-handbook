import React, { useState, useRef, useEffect } from 'react';
import './EditableField.scss';
import { AnimatePresence } from 'framer-motion';

interface EditableFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  placeholder = 'Click to edit',
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    // Focus the input when entering edit mode
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    // Handle clicks outside the component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) && 
        isEditing
      ) {
        saveChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, inputValue]);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const saveChanges = () => {
    setIsEditing(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(value); // Reset to original value
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div 
      ref={containerRef}
      className={`editable-field-container ${className}`}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <div 
            className="editable-field-edit-mode"
            key="editing"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="editable-field-input"
              placeholder={placeholder}
            />
            <button 
              className="editable-field-save-btn" 
              onClick={saveChanges}
              aria-label="Save"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </button>
          </div>
        ) : (
          <div 
            className="editable-field-view-mode"
            key="viewing"
            onClick={handleClick}
          >
            {value || <span className="placeholder">{placeholder}</span>}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableField; 