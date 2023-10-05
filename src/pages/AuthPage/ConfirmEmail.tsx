import { AuthPageStatus } from "./AuthPage";
import { Link, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router";
import OTPInput from "react-otp-input";
import { useStores } from "../../root-store-context";
import { observer } from "mobx-react-lite";

const ConfirmEmail = observer(() => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const { userStore, authStore } = useStores();

  const handleCreateUser = async (code: string) => {
    try {
      const res = await axios.post("/auth/signup", {
        email: authStore.email,
        password: authStore.password,
        emailVerificationCode: code,
      });

      const { access_token, refresh_token } = res.data;

      userStore.setTokens(access_token, refresh_token);
      authStore.clearCredentials();
      navigate("/radio");
    } catch (error: any) {
      alert(error?.message);
      setOtp("");
      setIsLoading(false);
    }
  };

  const handleOtpChange = (info: string) => {
    if (isLoading) {
      return;
    }

    if (info.length === 6) {
      if (!isLoading) {
        setIsLoading(true);
        setOtp(info);

        handleCreateUser(info);
        return;
      }
    }

    setOtp(info);
  };

  return (
    <Stack flexDirection="column" height="100%">
      <Typography
        variant="body1"
        sx={{
          marginBottom: "15px",
          wordBreak: "break-word",
        }}
        color="text.primary"
      >
        На почту вашу был выслан код подтверждения, введите его в поле ниже:
      </Typography>
      <OTPInput
        value={otp}
        onChange={(info) => handleOtpChange(info)}
        numInputs={6}
        containerStyle={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50px",
        }}
        renderInput={(props) => (
          <input
            {...props}
            className={`inp ${theme.palette.mode === "dark" ? "dark" : ""}`}
          />
        )}
        renderSeparator={<span> - </span>}
        shouldAutoFocus
      />
      <Typography
        variant="body2"
        sx={{
          marginTop: "auto",
          textAlign: "center",
        }}
        color="text.primary"
      >
        Не пришло письмо? <br />{" "}
        <Link
          variant="body2"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/auth/register")}
        >
          Изменить почту
        </Link>
      </Typography>
    </Stack>
  );
});

export default ConfirmEmail;
