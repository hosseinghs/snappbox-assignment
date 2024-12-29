"use client"
import React, { useRef } from 'react';

interface CodeInputComponentProps {
  length?: number; // Default length of the code inputs is 5
};

const CodeInputComponent: React.FC<CodeInputComponentProps> = ({ length = 5 }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/\d/.test(value) && value !== '') return;

    if (inputsRef.current[index]) inputsRef.current[index]!.value = value;

    // Move to the next input if the current input is filled
    if (value && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !inputsRef.current[index]?.value) inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('Text');

    if (/^\d{1,5}$/.test(pastedData)) {
      pastedData.split('').forEach((digit, i) => {
        if (i < length && inputsRef.current[i]) inputsRef.current[i]!.value = digit;
      });

      const nextEmptyIndex = pastedData.length;
      if (nextEmptyIndex < length) inputsRef.current[nextEmptyIndex]?.focus();
    }

    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '20px' }}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default CodeInputComponent;
