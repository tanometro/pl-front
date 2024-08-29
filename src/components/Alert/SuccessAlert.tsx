import * as React from 'react';
import { AlertProps } from '@/types/AlertsTypes';
import Snackbar from '@mui/joy/Snackbar';
import { ALERT_VARIANT } from '@/config/AlertConfig';

const SuccessAlert: React.FC<AlertProps> = ({ open, onClose, alertMessage }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={onClose}
            key={'top-right'}
            variant={ALERT_VARIANT}
            color="success"
            autoHideDuration={3000}
        >
            {alertMessage}
        </Snackbar>
    );
};

export default SuccessAlert;