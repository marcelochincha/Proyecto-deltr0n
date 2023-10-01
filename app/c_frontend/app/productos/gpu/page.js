'use client'
import Grid from '@mui/material/Grid'; // Grid version 1
import ProductCard from '../../components/ProductCard';
import { useState,useEffect } from 'react';

async function getProducts() {
  const res = await fetch("http://LB-PROY-442364612.us-east-1.elb.amazonaws.com:7146/productos/gpu")

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Page() {

  const [productsData , setProductsData] = useState([]);
  const [message, setMessage] = useState('Loading...');

  //Get products on page load
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProductsData(data)
        setMessage('')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return (

    <div>
    <h1 style={{color: "black", textAlign: "right"}}>{message}</h1>
    <Grid container spacing={2}>
      {
        productsData.map((product) =>
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        )
      }
    </Grid>
    </div>
  )
}
