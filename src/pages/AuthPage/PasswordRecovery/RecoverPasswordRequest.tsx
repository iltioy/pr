import {
  FormLabel,
  Stack,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { useLocalization } from "../../../contexts/LocalizationContext";

const createPasswordRecoveryValidationSchema = (t: (key: any) => string) => yup.object({
  email: yup
    .string()
    .email(t('enterValidEmail'))
    .required(t('enterValidEmail')),
});

const RecoverPasswordRequest = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocalization();

  const passwordRecoveryRequestFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: createPasswordRecoveryValidationSchema(t),
    onSubmit: async (values, { setErrors }) => {
      setIsLoading(true);
      try {
        await axios.post("/users/password/recover", {
          email: values.email,
        });

        console.log("success!");
        setIsLoading(false);
        setIsSend(true);
      } catch (error: any) {
        setIsLoading(false);
        if (error?.response?.status === 404) {
          setErrors({
            email: t('accountNotFound'),
          });
        }
        console.log(error);
      }
    },
  });

  return (
    <>
      <form onSubmit={passwordRecoveryRequestFormik.handleSubmit}>
        <Stack height="100%" flexDirection="column" color="text.primary">
          <Typography
            variant="h5"
            sx={{
              marginBottom: "15px",
            }}
          >
            {t('passwordRecovery')}
          </Typography>

          {isSend ? (
            <>
              <Typography variant="body1" marginBottom="10px">
                {t('passwordRecoverySent')}
                ({passwordRecoveryRequestFormik.values.email})
              </Typography>
              <Box>
                <Button variant="contained" onClick={() => navigate("/auth")}>
                  {t('back')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <FormLabel
                htmlFor="email"
                sx={{
                  marginBottom: "3px",
                }}
              >
                {t('yourEmail')}
              </FormLabel>
              <TextField
                id="email"
                variant="standard"
                placeholder="expample@gmail.com"
                sx={{
                  marginBottom: "15px",
                }}
                value={passwordRecoveryRequestFormik.values.email}
                onChange={passwordRecoveryRequestFormik.handleChange}
                error={
                  passwordRecoveryRequestFormik.touched.email &&
                  Boolean(passwordRecoveryRequestFormik.errors.email)
                }
                helperText={
                  passwordRecoveryRequestFormik.touched.email &&
                  passwordRecoveryRequestFormik.errors.email
                }
              />
              <Box>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  type="submit"
                >
                  {t('recover')}
                </LoadingButton>
              </Box>
            </>
          )}
        </Stack>
      </form>
    </>
  );
});

export default RecoverPasswordRequest;
