import * as React from 'react';
import { AlertProps } from '@/types/AlertsTypes';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import { ALERT_VARIANT } from '@/config/AlertConfig';


interface SuccessAlertProps extends AlertProps {
  actionButton?: { text: string; onClick: () => void };
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  open,
  onClose,
  alertMessage,
  actionButton,
}) => {

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      key={'top-right'}
      variant={ALERT_VARIANT}
      color="success"
      autoHideDuration={actionButton ? undefined : 3000}
    >
      <div className="flex items-center justify-between">
        <span>{alertMessage}</span>
        {actionButton && (
          <Button
            size="sm"
            variant="soft"
            color="success"
            onClick={actionButton.onClick} // Usamos el método de redirección
            className="ml-4"
          >
            {actionButton.text}
          </Button>
        )}
      </div>
    </Snackbar>
  );
};

export default SuccessAlert;
