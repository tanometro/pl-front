import React from 'react';
import { TextFieldProps } from '../../types/FieldsTypes';
import Input from '@mui/joy/Input';

const TextField = (props: TextFieldProps) => {
    const {placeholder, onChange, name, required} = props;
  return (
    <div className='py-1 w-full md:w-1/2'>
       <Input
          placeholder={placeholder}
          sx={{
            borderColor: 'black',
            '&::before': {
              border: '1.5px solid var(--Input-focusedHighlight)',
              transform: 'scaleX(0)',
              left: '2.5px',
              right: '2.5px',
              bottom: 0,
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
              borderBottomLeftRadius: '64px 20px',
              borderBottomRightRadius: '64px 20px',
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
          className='input-md w-full'
          name={name}
          onChange={onChange}
          required={required}
        />
    </div>
  )
}

export default TextField;