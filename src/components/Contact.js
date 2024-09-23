import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDetail } from "../redux/Slice/Details";
import { fetchData } from "../redux/Slice/History";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://aidhelper.vercel.app/">
        aidhelper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const sign = () => {
    nav("/SignUp");
  };

  const handleGuestLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(fetchData());
    } catch (err) {
      console.log(err);
    }
    dispatch(
      addDetail({
        flag: true,
        name: "Guest",
        id: 0,
        email: "guest@gmail.com",
      })
    );
    toast.success("Welcome Guest", {
      isLoading: false,
      autoClose: 3000,
    });
    setTimeout(() => {
      nav("/Home");
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(fetchData());
    } catch (err) {
      console.log(err);
    }
    const data = new FormData(event.currentTarget);
    const id = toast.loading("Retriving Your Information (30s)");
    try {
      const response = await axios.post(
        "https://sarathi-vercel.vercel.app/user/getid",
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.update(id, {
        render: `Welcome ${response.data.name}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      dispatch(
        addDetail({
          flag: true,
          name: response.data.name,
          id: response.data._id,
          email: response.data.email,
        })
      );
      setTimeout(() => {
        nav("/Home");
      }, 2000);
    } catch (err) {
      toast.update(id, {
        render: `${err.response.data.error}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={handleGuestLogin} href="" variant="body2">
                  Sign in as guest
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={sign} href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
