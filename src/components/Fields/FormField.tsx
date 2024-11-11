import React from 'react';
import { FormFieldProps } from '@/types/FieldsTypes';

const FormField = (props: FormFieldProps) => {
    const {input, placeholder, onChange, name, required, type = 'text'} = props;
  return (
    <div>
        <label className="input input-bordered input-accent w-full flex items-center gap-2 mb-2">
        {input}
        <input type={type} className="grow" placeholder={placeholder} onChange={onChange} required name={name}/>
        </label>
    </div>
  )
}

export default FormField