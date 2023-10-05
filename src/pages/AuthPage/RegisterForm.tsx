import * as yup from "yup";
import { useFormik } from "formik";
import { FormLabel, TextField, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useStores } from "../../root-store-context";
import { observer } from "mobx-react-lite";

const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email("Введите адрес электронной почты")
    .required("Введите адрес электронной почты"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .required("Введите пароль"),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Введите пароль ещё раз"),
});

const RegisterForm = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { authStore } = useStores();

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsLoading(true);

      try {
        const res = await axios.post("/auth/email/verify", {
          email: values.email,
        });
        setIsLoading(false);

        authStore.setCredentials({
          email: values.email,
          password: values.password,
        });
        navigate("/auth/email/verify");
      } catch (error: any) {
        setIsLoading(false);
        if (error?.response?.status === 403) {
          setErrors({
            email: "Данный адрес уже используется!",
          });
        }
      }
    },
  });

  return (
    <>
      <form action="" onSubmit={registerFormik.handleSubmit}>
        <FormLabel htmlFor="email">Введите почту:</FormLabel>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="Почта"
          sx={{
            marginBottom: "25px",
            marginTop: "5px",
          }}
          fullWidth
          value={registerFormik.values.email}
          onChange={registerFormik.handleChange}
          error={
            registerFormik.touched.email && Boolean(registerFormik.errors.email)
          }
          helperText={
            registerFormik.touched.email && registerFormik.errors.email
          }
        />

        <FormLabel htmlFor="password">Введите пароль:</FormLabel>
        <TextField
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          fullWidth
          sx={{
            marginBottom: "10px",
            marginTop: "5px",
          }}
          value={registerFormik.values.password}
          onChange={registerFormik.handleChange}
          error={
            registerFormik.touched.password &&
            Boolean(registerFormik.errors.password)
          }
          helperText={
            registerFormik.touched.password && registerFormik.errors.password
          }
        />
        <TextField
          type="password"
          name="confirmationPassword"
          placeholder="Подтверждение пароля"
          fullWidth
          value={registerFormik.values.confirmationPassword}
          onChange={registerFormik.handleChange}
          error={
            registerFormik.touched.confirmationPassword &&
            Boolean(registerFormik.errors.confirmationPassword)
          }
          helperText={
            registerFormik.touched.confirmationPassword &&
            registerFormik.errors.confirmationPassword
          }
        />

        <LoadingButton
          variant="contained"
          sx={{
            marginTop: "20px",
          }}
          loading={isLoading}
          type="submit"
        >
          Продолжить
        </LoadingButton>
      </form>
      <Link
        sx={{
          marginTop: "auto",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/auth")}
      >
        Есть Аккаунт? Войти.
      </Link>
    </>
  );
});

export default RegisterForm;
