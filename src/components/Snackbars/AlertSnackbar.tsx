import { Snackbar, Alert, IconButton } from "@mui/material";
import { AlertColor } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";

export interface SnackbarProps {
  message: string;
  setMessage: (value: React.SetStateAction<string>) => void;
  severity?: AlertColor;
}

const AlertSnackbar: React.FC<SnackbarProps> = observer(
  ({ message, setMessage, severity }) => {
    const action = (
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setMessage("")}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    );

    return (
      <>
        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={() => setMessage("")}
        >
          <Alert severity={severity} sx={{ width: "100%" }} action={action}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  }
);

export default AlertSnackbar;
