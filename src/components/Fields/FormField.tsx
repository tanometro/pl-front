import React from 'react';
import { FormFieldProps } from '@/types/FieldsTypes';

const FormField = (props: FormFieldProps) => {
    const {input, placeholder, onChange, name, required} = props;
  return (
    <div>
        <label className="input input-bordered input-accent w-full max-w-xs flex items-center gap-2">
        {input}
        <input type="text" className="grow" placeholder={placeholder} onChange={onChange} required name={name}/>
        </label>
    </div>
  )
}

export default FormField