// src/components/LoginPage.js

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { userlsit } from "../../utils/contants";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    const isAvailableUser = userlsit.find(
      (v) => v.email === data.email && v.password === data.password
    );
    console.log("isAvailableUser :>> ", isAvailableUser);
    if (isAvailableUser) {
      localStorage.setItem("token", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "600px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="filled"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>

        {/* Register Link */}
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Button
            variant="text"
            onClick={() => navigate("/register")}
            sx={{ padding: 0, textTransform: "none" }}
          >
            Register here
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
