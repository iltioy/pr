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

const passwordRecoveryValidationSchema = yup.object({
  email: yup
    .string()
    .email("Введите адрес электронной почты")
    .required("Введите адрес электронной почты"),
});

const RecoverPasswordRequest = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();

  const passwordRecoveryRequestFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: passwordRecoveryValidationSchema,
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
            email: "Аккаунт с такой почтой не найден!",
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
            Восстановление пароля
          </Typography>

          {isSend ? (
            <>
              <Typography variant="body1" marginBottom="10px">
                Ссылка для восстановления пароля была отправлена на вашу почту!
                ({passwordRecoveryRequestFormik.values.email})
              </Typography>
              <Box>
                <Button variant="contained" onClick={() => navigate("/auth")}>
                  Назад
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
                Ваша почта:
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
                  Восстановить
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
