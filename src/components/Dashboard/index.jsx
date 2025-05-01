import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Person, Settings, Group } from "@mui/icons-material";

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
  });
  
  // Sample user data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchStats = async () => {
      const data = {
        totalUsers: 120,
        activeUsers: 85,
        totalSessions: 95,
      };
      setUserStats(data);
    };

    // Simulating fetching user data
    const fetchUsers = async () => {
      const userData = [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
      ];
      setUsers(userData);
    };

    fetchStats();
    fetchUsers();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {userStats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Users Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {userStats.activeUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Sessions Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Sessions
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {userStats.totalSessions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Users Table */}
      <Typography variant="h5" gutterBottom>
        Users List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      {/* Quick Access Links */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <Person sx={{ mr: 2 }} /> Manage Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage user accounts, roles, and permissions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                <Settings sx={{ mr: 2 }} /> Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modify system configurations and user settings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
