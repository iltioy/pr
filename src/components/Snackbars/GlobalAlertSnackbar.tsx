import { Snackbar, Alert, IconButton } from "@mui/material";
import { AlertColor } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";

export interface GlobalSnackbarProps {
  message: string;
  severity?: AlertColor;
}

const GlobalAlertSnackbar: React.FC<GlobalSnackbarProps> = observer(
  ({ message, severity }) => {
    const { modalsStore } = useStores();

    const action = (
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => modalsStore.setSnackbarMessage("")}
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
          onClose={() => modalsStore.setSnackbarMessage("")}
        >
          <Alert severity={severity} sx={{ width: "100%" }} action={action}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  }
);

export default GlobalAlertSnackbar;
