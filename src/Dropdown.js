import React from 'react';

export const Dropdown = ({options, id, onSelectedValueChange, selectedValue}) => (

    <select defaultValue={selectedValue} id={id} onChange={event => onSelectedValueChange(event.target.value)}>
      {options.map(({value, label}) => (
          <option key={value} value={value}>{label}</option>
      ))}
    </select>
  
  );
  