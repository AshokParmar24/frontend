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
  Button,
} from "@mui/material";
import { getAllSessionList, updateSessionStatus } from "../../services/api"; // Assuming you have this function to fetch session data
import toast from "react-hot-toast";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [counts, setCounts] = useState({
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
  });

  const fetchSessionStats = async () => {
    try {
      const response = await getAllSessionList();
      const { totalCount, activeCount, inactiveCount, sessions } =
        response.data;
      setCounts({ totalCount, activeCount, inactiveCount });
      setSessions(sessions);
    } catch (error) {
      console.error("Failed to fetch session data:", error);
    }
  };
  useEffect(() => {
    fetchSessionStats();
  }, []);

  const handleUpdateSessionStatus = async (sessionId, newStatus) => {
    try {
      const response = await updateSessionStatus(sessionId, {
        isActive: !newStatus,
      });
      console.log("response", response);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        fetchSessionStats()
      }
    } catch (error) {
      console.error("Failed to update session status:", error);
      toast.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total InActiveSessions
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {counts.inactiveCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Active Sessions
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {counts.activeCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Sessions
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {counts.totalCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Sessions Table */}
      <Typography variant="h5" gutterBottom>
        Active Sessions List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Session ID</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>User Agent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Active At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell>{session.userId}</TableCell>
                <TableCell>{session._id}</TableCell>
                <TableCell>{session.ipAddress}</TableCell>
                <TableCell>{session.userAgent}</TableCell>
                <TableCell>
                  {session.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  {new Date(session.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(session.lastActiveAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    color={session.isActive ? "error" : "success"}
                    variant="contained"
                    onClick={() => {
                      handleUpdateSessionStatus(session._id, session.isActive);
                    }}
                  >
                    {session.isActive ? "Inactive" : "Active"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default Dashboard;
