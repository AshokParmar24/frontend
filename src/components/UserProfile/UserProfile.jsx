import { Box, Avatar, Typography, Stack, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("userData", userData);
    setUser(userData);
  }, []);
  console.log("useruseruseruseruser", user);
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt="John Doe"
          src="https://i.pravatar.cc/150?img=3" // placeholder avatar
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user?.role}
          </Typography>
        </Box>
      </Stack>
  </Paper>
  );
};

export default UserProfile;
