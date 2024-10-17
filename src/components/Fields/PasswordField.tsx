'use client';

import React from 'react';
import { PasswordFieldProps } from '../../types/FieldsTypes';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';

const PasswordField = (props: PasswordFieldProps) => {
    const {onChange} = props;
    const [value, setValue] = React.useState('');
    const minLength = 12;
    
  return (
    <div className='py-1 w-1/2'>
       <Input
          type="password"
          placeholder="Contraseña"
          name="password"
          startDecorator={<Key />}
          onChange={onChange}
          required
          sx={{
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
         
        />
        <LinearProgress
          determinate
          size="sm"
          value={Math.min((value.length * 100) / minLength, 100)}
          sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
        />
        <Typography
          level="body-xs"
          sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
        >
          {value.length < 3 && 'Very weak'}
          {value.length >= 3 && value.length < 6 && 'Weak'}
          {value.length >= 6 && value.length < 10 && 'Strong'}
          {value.length >= 10 && 'Very strong'}
        </Typography>
    </div>
  )
}

export default PasswordField;