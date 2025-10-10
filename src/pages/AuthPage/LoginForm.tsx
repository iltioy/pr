import * as yup from "yup";
import { AuthPageStatus } from "./AuthPage";
import { useFormik } from "formik";
import { FormLabel, TextField, Link, Button, Typography } from "@mui/material";
import axios from "axios";
import { useStores } from "../../root-store-context";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useLocalization } from "../../contexts/LocalizationContext";

const createLoginValidationSchema = (t: (key: any) => string) => yup.object({
  email: yup
    .string()
    .email(t('enterValidEmail'))
    .required(t('enterValidEmail')),
  password: yup
    .string()
    .min(8, t('passwordMinLength'))
    .required(t('enterPassword')),
});

const LoginForm = observer(() => {
  const { userStore } = useStores();
  const navigate = useNavigate();
  const { t } = useLocalization();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createLoginValidationSchema(t),
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (values, { setErrors }) => {
      try {
        const res = await axios.post("/auth/signin", {
          email: values.email,
          password: values.password,
        });

        const { access_token, refresh_token } = res.data;

        userStore.setTokens(access_token, refresh_token);
        navigate("/radio");
      } catch (error) {
        setErrors({
          password: t('wrongCredentials'),
        });
      }
    },
  });

  return (
    <>
      <form action="" onSubmit={loginFormik.handleSubmit}>
        <FormLabel htmlFor="email">{t('enterEmail')}</FormLabel>
        <TextField
          placeholder={t('email')}
          id="email"
          name="email"
          type="email"
          sx={{
            marginBottom: "15px",
            marginTop: "5px",
          }}
          fullWidth
          variant="outlined"
          value={loginFormik.values.email}
          onChange={loginFormik.handleChange}
          error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
          helperText={loginFormik.touched.email && loginFormik.errors.email}
        />

        <FormLabel htmlFor="password">{t('enterPassword')}</FormLabel>
        <TextField
          placeholder={t('password')}
          id="password"
          name="password"
          type="password"
          fullWidth
          sx={{ marginBottom: "7px", marginTop: "5px" }}
          variant="outlined"
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          error={
            loginFormik.touched.password && Boolean(loginFormik.errors.password)
          }
          helperText={
            loginFormik.touched.password && loginFormik.errors.password
          }
        />

        <Link
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/auth/password/recover")}
        >
          {t('forgotPassword')}
        </Link>

        <br />

        <Button
          sx={{
            marginTop: "17px",
          }}
          type="submit"
          variant="contained"
        >
          {t('submit')}
        </Button>
      </form>
      <Link
        style={{
          marginTop: "auto",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/auth/register")}
      >
        {t('registration')}
      </Link>
    </>
  );
});

export default LoginForm;
