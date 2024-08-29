import * as React from 'react';
import { AlertProps } from '@/types/AlertsTypes';
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';

const ErrorAlert: React.FC<AlertProps> = ({ open, onClose, alertMessage }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={onClose}
            key={'top-right'}
            variant="plain"
            color="danger"
            autoHideDuration={3000}
        >
            {alertMessage}
        </Snackbar>
    );
};

export default ErrorAlert;