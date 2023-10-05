import { Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useStores } from "../../root-store-context";
import { Outlet, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";

export enum AuthPageStatus {
  LOGIN = "login",
  REGISTER = "register",
  CONFIRM_EMAIL = "confirmEmail",
  RECOVER_PASSWORD = "recoverPassword",
}

const AuthPage = observer(() => {
  const { userStore } = useStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.access_token) {
      navigate("/radio");
    }
  }, [navigate, userStore.access_token]);

  return (
    <>
      <Stack
        sx={{
          dispaly: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        bgcolor="custom.bg.main"
      >
        <Stack
          sx={{
            height: "500px",
            width: "400px",
            borderRadius: 3,
            boxShadow: 4,
          }}
          boxShadow="0px 0px 20px primary.main"
          bgcolor="custom.bg.secondary"
        >
          <Stack
            sx={{
              padding: "40px",
            }}
            height="100%"
          >
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
});

export default AuthPage;
