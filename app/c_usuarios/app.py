# API REST de usuarios

from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql://root:deltron@52.7.228.14:7144/deltron_data"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# CORS(app)
CORS(app, origins="*", allow_headers="*", supports_credentials=True)
cache = Cache(app, config={"CACHE_TYPE": "simple",
              "CACHE_DEFAULT_TIMEOUT": 300})

db = SQLAlchemy(app)
cache.init_app(app)


@dataclass
class Cliente(db.Model):
    ruc: str
    email: str
    razon_social: str
    contrasenha: str
    telefono: str

    __tablename__ = "cliente"
    ruc = db.Column(db.String(11), primary_key=True)
    email = db.Column(db.String(50), unique=True)
    razon_social = db.Column(db.String(50))
    contrasenha = db.Column(db.String(200))
    telefono = db.Column(db.String(50))

    def __repr__(self):
        return f"<Cliente {self.ruc}>"

    def check_password(self, password):
        return self.contrasenha == password


@dataclass
class Producto(db.Model):
    id: int
    nombre: str
    precio: float
    descripcion: str
    fabricante_nombre: str

    __tablename__ = "producto"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    precio = db.Column(db.Float)
    descripcion = db.Column(db.String(50))
    fabricante_nombre = db.Column(
        db.String(50), db.ForeignKey("fabricante.nombre"))

    def __repr__(self):
        return f"<Producto {self.id}>"


@dataclass
class Carrito_de_Compras(db.Model):
    cliente_ruc: str
    producto_id: int
    cantidad: int

    __tablename__ = "carrito_de_compras"

    cliente_ruc = db.Column(
        db.String(11), db.ForeignKey("cliente.ruc"), primary_key=True
    )
    producto_id = db.Column(db.Integer, db.ForeignKey(
        "producto.id"), primary_key=True)
    cantidad = db.Column(db.Integer)

    def __repr__(self):
        return f"<Carrito_de_Compras {self.id}>"


@app.route("/clientes", methods=["GET", "POST"])
def route_clientes():
    if request.method == "GET":
        clientes = Cliente.query.all()
        return jsonify(clientes)
    elif request.method == "POST":
        cliente = Cliente(
            ruc=request.json["ruc"],
            email=request.json["email"],
            razon_social=request.json["razon_social"],
            contrasenha=request.json["contrasenha"],
            telefono=request.json["telefono"]
        )
        db.session.add(cliente)
        db.session.commit()
        return "SUCCESS"


@app.route("/clientes/<ruc>", methods=["GET", "PUT", "DELETE"])
def route_cliente(ruc):
    if request.method == "GET":
        cliente = Cliente.query.get(ruc)
        return jsonify(cliente)
    elif request.method == "PUT":
        cliente = Cliente.query.get(ruc)
        cliente.nombre = request.json["nombre"]
        cliente.apellido = request.json["apellido"]
        cliente.correo = request.json["correo"]
        cliente.telefono = request.json["telefono"]
        db.session.commit()
        return "SUCCESS"
    elif request.method == "DELETE":
        cliente = Cliente.query.get(ruc)
        db.session.delete(cliente)
        db.session.commit()
        return "SUCCESS"


# Obtener carrito de cliente
@app.route("/clientes/carrito/<ruc>", methods=["GET", "POST"])
def route_carrito(ruc):
    if request.method == "GET":
        carrito = Carrito_de_Compras.query.filter_by(cliente_ruc=ruc).all()
        productos_carrito = []
        for item in carrito:
            producto = Producto.query.get(item.producto_id)
            if producto:
                producto_info = {
                    "id": producto.id,
                    "nombre": producto.nombre,
                    "precio": producto.precio,
                    "cantidad": item.cantidad,
                }
                productos_carrito.append(producto_info)
        return jsonify(productos_carrito)
    elif request.method == "POST":
        carrito = Carrito_de_Compras(
            cliente_ruc=ruc,
            producto_id=request.json["producto_id"],
            cantidad=request.json["cantidad"],
        )
        db.session.add(carrito)
        db.session.commit()
        return "SUCCESS"

# ruta para verificar contrasenha


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    ruc = data.get("ruc")
    contrasenha = data.get("contrasenha")

    cliente = Cliente.query.get(ruc)
    check = cliente is not None and cliente.contrasenha == contrasenha
    return jsonify({"check": check})


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=7145, debug=True, host="0.0.0.0")
