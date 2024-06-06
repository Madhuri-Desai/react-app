import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = ({ counter, userData }) => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Data Trends',
        data: [65, 59, 80, 81, 56, 55, 40], // Replace this with actual user data trends
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Counter</Typography>
          <Typography variant="h5">{counter}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">User Profile Trends</Typography>
          <Line data={chartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
