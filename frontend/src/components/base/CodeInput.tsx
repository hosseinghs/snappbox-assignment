"use client"
import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';

interface CodeInputComponentProps {
  length?: number;
  onSubmit: (otp: string) => void;
  onResendClick: () => void;
};

const TIMER = 10;

const CodeInputComponent: React.FC<CodeInputComponentProps> = ({ length = 4, onResendClick, onSubmit }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(TIMER);
  const [otp, setOtp] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/\d/.test(value) && value !== '') return;

    const updatedOtp = otp.split('');
    updatedOtp[index] = value;
    setOtp(updatedOtp.join(''));

    if (value && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !inputsRef.current[index]?.value) inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text');
    
    if (/^\d{1,5}$/.test(pastedData)) {
      pastedData.split('').forEach((digit, i) => {
        if (i < length && inputsRef.current[i]) inputsRef.current[i]!.value = digit;
      });
      
      setOtp(pastedData);
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResetTimer = () => {
    setTimer(TIMER);
    if (onResendClick) onResendClick();
  };

  useEffect(() => {
    if (otp.length === length) onSubmit(otp);
  }, [otp]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '20px' }}
            onPaste={handlePaste}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <div style={{ margin: '1rem 0' }}>
        {timer > 0 && (
          <p>Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
        )}
      </div>

      {timer === 0 && (
        <Button variant='outlined' onClick={handleResetTimer}>New OTP</Button>
      )}

      <Button
        variant='contained'
        style={{ marginTop: '1rem' }}
        disabled={length !== otp.length}
        onClick={() => onSubmit(otp)}
      >
        Submit OTP
      </Button>
    </div>
  );
};

export default CodeInputComponent;
