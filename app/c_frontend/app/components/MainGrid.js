'use client'
import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ProductCard from './ProductCard';
import Container from "@mui/material/Container";
import Image from "next/image";
import Centerimage from "../../public/CENTERIMAGE.jpg"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1), 
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MainGrid() {
  return (
   <Container sx={{display: "flex", alignItems:"center", justifyItems:"center", justifyContent:"center"}}>
      <Container sx = {{display: "flex"}}>
        <Image src= {Centerimage} alt='centerimage' width={1000} height={500}/>
      </Container>
   </Container>

  )
}

export default MainGrid
