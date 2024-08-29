import React from 'react';
import { TextFieldProps } from '../../types/FieldsTypes';
import Input from '@mui/joy/Input';

const TextField = (props: TextFieldProps) => {
    const {placeholder, onChange, name} = props;
  return (
    <div className='py-1'>
       <Input
          placeholder={placeholder}
          sx={{
            '&::before': {
              display: 'none',
            },
            '&:focus-within': {
              outline: '2px solid var(--Input-focusedHighlight)',
              outlineOffset: '2px',
            },
          }}
          name={name}
          onChange={onChange}
        />
    </div>
  )
}

export default TextField