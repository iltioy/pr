import {
  Box,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useLocalization } from "../../../contexts/LocalizationContext";

const createRegisterValidationSchema = (t: (key: any) => string) => yup.object({
  password: yup
    .string()
    .min(8, t('passwordMinLength'))
    .required(t('enterPassword')),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref("password")], t('passwordsMustMatch'))
    .required(t('enterPasswordAgain')),
});

const RecoverPassword = () => {
  const { recoveryId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLocalization();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const recoverPasswordFormik = useFormik({
    initialValues: {
      password: "",
      confirmationPassword: "",
    },
    validationSchema: createRegisterValidationSchema(t),
    onSubmit: async (values, { setErrors }) => {
      try {
        setIsLoading(true);
        await axios.post(`/users/password/recover/${recoveryId}`, {
          password: values.password,
        });

        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    },
  });

  if (isSuccess) {
    return (
      <Stack color="text.primary">
        <Typography variant="h5">{t('success')}</Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          {t('passwordChanged')}
        </Typography>

        <Box>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            {t('signIn')}
          </Button>
        </Box>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack color="text.primary">
        <Typography variant="h5">{t('oops')}</Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          {t('passwordChangeFailed')}
        </Typography>

        <Box>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            {t('back')}
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <>
      <form action="" onSubmit={recoverPasswordFormik.handleSubmit}>
        <Stack color="text.primary">
          <Typography variant="h5" marginBottom="10px">
            {t('passwordRecovery')}
          </Typography>

          <FormLabel htmlFor="password">{t('enterNewPassword')}</FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            placeholder="password123"
            fullWidth
            sx={{
              marginBottom: "10px",
              marginTop: "5px",
            }}
            value={recoverPasswordFormik.values.password}
            onChange={recoverPasswordFormik.handleChange}
            error={
              recoverPasswordFormik.touched.password &&
              Boolean(recoverPasswordFormik.errors.password)
            }
            helperText={
              recoverPasswordFormik.touched.password &&
              recoverPasswordFormik.errors.password
            }
          />

          <FormLabel htmlFor="confirmationPassword">
            {t('confirmPasswordLabel')}
          </FormLabel>
          <TextField
            type="password"
            id="confirmationPassword"
            name="confirmationPassword"
            placeholder="password123"
            sx={{
              marginBottom: "20px",
              marginTop: "5px",
            }}
            fullWidth
            value={recoverPasswordFormik.values.confirmationPassword}
            onChange={recoverPasswordFormik.handleChange}
            error={
              recoverPasswordFormik.touched.confirmationPassword &&
              Boolean(recoverPasswordFormik.errors.confirmationPassword)
            }
            helperText={
              recoverPasswordFormik.touched.confirmationPassword &&
              recoverPasswordFormik.errors.confirmationPassword
            }
          />

          <Box>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              {t('save')}
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default RecoverPassword;
