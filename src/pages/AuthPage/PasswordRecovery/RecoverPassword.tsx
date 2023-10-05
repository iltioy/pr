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

const registerValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .required("Введите пароль"),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Введите пароль ещё раз"),
});

const RecoverPassword = () => {
  const { recoveryId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const recoverPasswordFormik = useFormik({
    initialValues: {
      password: "",
      confirmationPassword: "",
    },
    validationSchema: registerValidationSchema,
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
        <Typography variant="h5">Успех!</Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          Пароль был успешно изменён.
        </Typography>

        <Box>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            Войти в аккаунт
          </Button>
        </Box>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack color="text.primary">
        <Typography variant="h5">Упс!</Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          Не удалось сменить пароль. <br /> Возможно, ссылка для смены пароля
          истекла, попробуйте заного.
        </Typography>

        <Box>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            Назад
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
            Восстановление пароля
          </Typography>

          <FormLabel htmlFor="password">Введите новый пароль:</FormLabel>
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
            Подтверждение пароля:
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
              Сохранить
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default RecoverPassword;
