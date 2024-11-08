/* eslint-disable react/no-unknown-property */ 
import React from 'react'
import { useState } from 'react';
const FormInput = (props) => {
    const {id, label, ...inputProps} = props;
    const [focused, setFocused] = useState(false);
    const handleFocus = () => setFocused(true);
  return (
    <div>
      <input 
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        {...inputProps}
        required = {props.required}
        className='text-sm p-2 rounded-2xl bg-slate-200 outline-none tracking-widest text-gray-600 placeholder:text-xs w-full mb-2'
      /> 
    </div>
  )
}

export default FormInput