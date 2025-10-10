import * as yup from "yup";
import { useFormik } from "formik";
import { FormLabel, TextField, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useStores } from "../../root-store-context";
import { observer } from "mobx-react-lite";
import { useLocalization } from "../../contexts/LocalizationContext";

const createRegisterValidationSchema = (t: (key: any) => string) => yup.object({
  email: yup
    .string()
    .email(t('enterValidEmail'))
    .required(t('enterValidEmail')),
  password: yup
    .string()
    .min(8, t('passwordMinLength'))
    .required(t('enterPassword')),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref("password")], t('passwordsMustMatch'))
    .required(t('enterPasswordAgain')),
});

const RegisterForm = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocalization();

  const { authStore } = useStores();

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: createRegisterValidationSchema(t),
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
            email: t('emailAlreadyUsed'),
          });
        }
      }
    },
  });

  return (
    <>
      <form action="" onSubmit={registerFormik.handleSubmit}>
        <FormLabel htmlFor="email">{t('enterEmail')}</FormLabel>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder={t('email')}
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

        <FormLabel htmlFor="password">{t('enterPassword')}</FormLabel>
        <TextField
          id="password"
          type="password"
          name="password"
          placeholder={t('password')}
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
          placeholder={t('confirmPassword')}
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
          {t('continue')}
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
        {t('haveAccount')}
      </Link>
    </>
  );
});

export default RegisterForm;
