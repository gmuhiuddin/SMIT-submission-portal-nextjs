import React, { useRef } from 'react';

interface MultiInputProps {
  id: string;
  options: string[];
}

const MultiInputForm: React.FC<MultiInputProps> = ({ id, options }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGetValues = () => {
    const multiInput = document.querySelector('multi-input') as any;
    const values = multiInput.getValues();

    if (values.length > 0) {
      console.log(`Got ${values.join(' and ')}!`);
    } else {
      console.log('Got no one :(');
    }
  };

  return (
    <div>
      <label>Speaker name:</label>
      <multi-input>
        <input list={id} ref={inputRef} />
        <datalist id={id}>
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </multi-input>
      <button id="get" onClick={handleGetValues}>
        Get
      </button>
    </div>
  );
};

export default MultiInputForm;