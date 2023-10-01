"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
//import ruc from "../login/page.js";

function createData(name, precio, cantidad) {
  return { name, precio, cantidad };
}

function calcularTotal(data) {
  var total = 0;
  for (let index = 0; index < data.length; index++) {
    total += data[index].precio * data[index].cantidad;
  }
  return total;
}

export default function carritoPage() {

  let RUC_value
  if (typeof window !== "undefined") {
    RUC_value = localStorage.getItem("RUC") || ""
  }

  const [ruc, setRUC] = useState(RUC_value);

  // set ruc as "bienvenido" if ruc is not ""
  useEffect(() => {
    if(RUC_value == ""){
        setRUC("Bienvenido");
    } else {
        setRUC(RUC_value);
    }
  }, []);



  const [totalPrice, setTotalPrice] = useState(0);
  const [tableData, setTableData] = useState([]);

  const addElementToTable = (newElement) => {
    setTotalPrice(totalPrice + 1);
  };

  function buy() { }

  useEffect(() => {
    // Fecth data from carrito
    fetch(
      "http://LB-PROY-442364612.us-east-1.elb.amazonaws.com:7145/clientes/carrito/" + ruc,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Iterate over data and add to table
        let backData = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          //console.log(element);
          backData = [
            ...backData,
            createData(element.nombre, element.precio, element.cantidad),
          ];
        }
        setTableData(backData);
        setTotalPrice(calcularTotal(backData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "left",
          padding: "10px",
          fontSize: "40px",
        }}
      >
        Carrito
      </h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Precio($)</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Total($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Render table cells for each element */}
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.precio}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.precio * row.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1
        style={{
          paddingRight: "50px",
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Total: {totalPrice}{" "}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "50px",
          paddingBottom: "5px",
        }}
      >
        <Button
          onClick={buy}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          COMPRAR
        </Button>
      </div>
    </div>
  );
}
