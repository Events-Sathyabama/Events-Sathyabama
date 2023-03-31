import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SuccessProps {
  message: string;
  showpopup: (open: boolean) => void;
  anchorOrigin?: SnackbarOrigin;
}

function Success(props: SuccessProps) {
  const { message, showpopup, anchorOrigin } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    showpopup(false);
  };

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
		  //@ts-expect-error
          onClose={handleClose}
          anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        >
          <Alert className="mt-20 sm:mt-16" onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

interface ErrorProps {
  message: string;
  showpopup: (open: boolean) => void;
  className?: string;
  anchorOrigin?: SnackbarOrigin;
}

function Error(props: ErrorProps) {
  const { message, showpopup, anchorOrigin } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    showpopup(false);
  };

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
		  //@ts-expect-error
          onClose={handleClose}
          anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        >
          <Alert className="mt-20 sm:mt-16" onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

const Popup = {
  Success,
  Error,
};

export default Popup;