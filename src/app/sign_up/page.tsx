"use client";
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
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { positionOptions, roleOptions } from "@/constant";
import { signUp } from "@/request/auth";
import { useRouter } from "next/navigation";
import { message } from "antd";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Powered © "}
      <Link color="inherit" href="https://github.com/BoyYangzai">
        yang
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function SignUp() {
  const router = useRouter();
  const theme = useTheme();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const allData = Object.fromEntries(data.entries());
    await signUp(allData);
    router.push("/");
    message.success("Sign up successfully");
  };
  const [role, setRole] = useState<string[]>([]);
  const handleRoleChange = (event: SelectChangeEvent<typeof role>) => {
    const {
      target: { value },
    } = event;
    setRole(typeof value === "string" ? value.split(",") : value);
  };

  const [isAgeError, setIsAgeError] = useState(false);
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ageRange = Array.from({ length: 100 }, (_, i) => i + 1);
    if (!ageRange.includes(parseInt(event.target.value))) {
      setIsAgeError(true);
    } else {
      setIsAgeError(false);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    id="gender"
                    label="Gender"
                    name="gender"
                    select
                    fullWidth
                    defaultValue=""
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="18"
                  onChange={handleAgeChange}
                  error={isAgeError}
                />
                <FormHelperText error={isAgeError}>
                  {isAgeError ? "Age must be between 1 to 100" : ""}
                </FormHelperText>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="position"
                  options={positionOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Position"
                      name="position"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="multiple-name-label" required>
                    Roles
                  </InputLabel>
                  <Select
                    id="role"
                    label="Role"
                    name="roles"
                    multiple
                    fullWidth
                    placeholder="Role"
                    onChange={handleRoleChange}
                    value={role}
                  >
                    {roleOptions.map((i) => (
                      <MenuItem
                        key={i}
                        value={i}
                        style={getStyles(i, role, theme)}
                      >
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
