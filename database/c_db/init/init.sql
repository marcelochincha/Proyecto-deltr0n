CREATE DATABASE IF NOT EXISTS deltron_data;
USE deltron_data;
-- 0 relaciones

-- Tabla categoria
CREATE TABLE categoria (
    nombre VARCHAR(50) PRIMARY KEY
);

-- Tabla almacen
CREATE TABLE almacen (
    numero INTEGER PRIMARY KEY,
    direccion VARCHAR(50)
);

-- Tabla persona
CREATE TABLE persona (
    dni INTEGER PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(12)
);

-- Tabla fabricante
CREATE TABLE fabricante (
    nombre VARCHAR(50) PRIMARY KEY,
    pais VARCHAR(50),
    dominio_correo VARCHAR(50)
);

-- Tabla cliente
CREATE TABLE cliente (
    ruc VARCHAR(11) PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    razon_social VARCHAR(50),
    contrasenha VARCHAR(200),
    telefono VARCHAR(50)
);

-- +1 REFERENCIAS

-- Tabla producto
CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    precio FLOAT,
    descripcion VARCHAR(50),
    fabricante_nombre VARCHAR(50),
    FOREIGN KEY (fabricante_nombre) REFERENCES fabricante(nombre)
);

-- Tabla categoria_de
CREATE TABLE categoria_de (
    producto_id INT,
    categoria_nombre VARCHAR(50),
    PRIMARY KEY (producto_id, categoria_nombre),
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (categoria_nombre) REFERENCES categoria(nombre)
);

-- Tabla stock
CREATE TABLE stock (
    producto_id INT,
    almacen_numero INT,
    cantidad INTEGER,
    PRIMARY KEY (producto_id, almacen_numero),
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (almacen_numero) REFERENCES almacen(numero)
);

-- Tabla empleado
CREATE TABLE empleado (
    dni INTEGER PRIMARY KEY,
    correo_institucional VARCHAR(50),
    FOREIGN KEY (dni) REFERENCES persona(dni)
);

-- Tabla atencion_al_cliente
CREATE TABLE atencion_al_cliente (
    dni INTEGER PRIMARY KEY,
    FOREIGN KEY (dni) REFERENCES empleado(dni)
);

-- Tabla almacenero
CREATE TABLE almacenero (
    dni INTEGER PRIMARY KEY,
    almacen_numero INTEGER,
    FOREIGN KEY (dni) REFERENCES empleado(dni),
    FOREIGN KEY (almacen_numero) REFERENCES almacen(numero)
);

-- Tabla recogedor
CREATE TABLE recogedor (
    dni INTEGER PRIMARY KEY,
    cliente_ruc VARCHAR(11),
    FOREIGN KEY (dni) REFERENCES persona(dni),
    FOREIGN KEY (cliente_ruc) REFERENCES cliente(ruc)
);

-- Tabla venta
CREATE TABLE venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_ruc VARCHAR(11),
    recogedor_asignado_dni INTEGER,
    f_creacion TIMESTAMP,
    f_limite TIMESTAMP,
    estado VARCHAR(50),
    monto_total FLOAT,
    FOREIGN KEY (cliente_ruc) REFERENCES cliente(ruc),
    FOREIGN KEY (recogedor_asignado_dni) REFERENCES recogedor(dni)
);

-- Tabla carrito_de_compras
CREATE TABLE carrito_de_compras (
    cliente_ruc VARCHAR(11),
    producto_id INT,
    cantidad INTEGER,
    PRIMARY KEY (cliente_ruc, producto_id),
    FOREIGN KEY (cliente_ruc) REFERENCES cliente(ruc),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla pago
CREATE TABLE pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT,
    fecha TIMESTAMP,
    monto FLOAT,
    metodo VARCHAR(50),
    FOREIGN KEY (venta_id) REFERENCES venta(id)
);

-- Tabla reembolso
CREATE TABLE reembolso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pago_id INT,
    fecha TIMESTAMP,
    FOREIGN KEY (pago_id) REFERENCES pago(id)
);

-- Tabla contiene_pr_venta
CREATE TABLE contiene_pr_venta (
    venta_id INT,
    producto_id INT,
    cantidad INTEGER,
    PRIMARY KEY (venta_id, producto_id),
    FOREIGN KEY (venta_id) REFERENCES venta(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla despacho
CREATE TABLE despacho (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP,
    venta_id INT,
    atencion_al_cliente_dni INTEGER,
    recogedor_asignado_dni INTEGER,
    FOREIGN KEY (venta_id) REFERENCES venta(id),
    FOREIGN KEY (atencion_al_cliente_dni) REFERENCES atencion_al_cliente(dni),
    FOREIGN KEY (recogedor_asignado_dni) REFERENCES recogedor(dni)
);

-- Populating tables
-- Insertar fabricantes
INSERT INTO fabricante (nombre, pais, dominio_correo) VALUES 
('AMD', 'USA', 'amd.com'),
('Nvidia', 'USA', 'nvidia.com');

-- Insertar productos
INSERT INTO producto (nombre, precio, fabricante_nombre) VALUES 
('Ryzen 5', 2000, 'AMD'),
('Ryzen 7', 3000, 'AMD'),
('Ryzen 9', 4000, 'AMD'),
('RTX 2060', 3000, 'Nvidia'),
('RTX 2070', 4000, 'Nvidia'),
('RTX 2080', 5000, 'Nvidia'),
('RTX 2080 Ti', 6000, 'Nvidia'),
('GTX 1660', 2000, 'Nvidia'),
('GTX 1660 Ti', 3000, 'Nvidia');

-- Insertar clientes
INSERT INTO cliente (ruc, email, razon_social, contrasenha, telefono) VALUES 
('10999999991', 'test1@gmail.com', 'Test1 SAC', 'asE79a1Fs3b6aw', '999888777'),
('10999999992', 'test2@gmail.com', 'Test2 SAC', '3w686Xbgdf546Q', '999888666');

-- Insertar carrito de compras
INSERT INTO carrito_de_compras (cliente_ruc, producto_id, cantidad) VALUES 
('10999999991', 2, 10),
('10999999991', 5, 6),
('10999999991', 9, 3);
