'use client'
import Grid from '@mui/material/Grid';
import DataTable from '../components/DataTable';

export default function Page() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <DataTable />
      </Grid>
    </Grid>
  )
}
