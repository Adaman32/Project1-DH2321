import React from 'react';

export const Dropdown = ({options, id, onSelectedValueChange, selectedValue}) => (

    <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
      <option value="default">Pick an option...</option>
      {options.map(({value, label}) => (
          <option value={value} selected={value === selectedValue}>{label}</option>
      ))}
    </select>
  
  );
  