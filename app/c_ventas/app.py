# API REST de usuarios

from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_caching import Cache

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql://root:deltron@52.7.228.14:7144/deltron_data"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


CORS(app)
cache = Cache(app, config={"CACHE_TYPE": "simple",
              "CACHE_DEFAULT_TIMEOUT": 300})

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
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
class Venta(db.Model):
    id: int
    cliente_ruc: str
    recogedor_asignado_dni: int
    f_creacion: db.DateTime
    f_limite: db.DateTime
    estado: str
    monto_total: float

    __tablename__ = "venta"
    id = db.Column(db.Integer, primary_key=True)
    cliente_ruc = db.Column(db.String(11), db.ForeignKey("cliente.ruc"))
    recogedor_asignado_dni = db.Column(
        db.Integer, db.ForeignKey("recogedor.dni"))
    f_creacion = db.Column(db.DateTime)
    f_limite = db.Column(db.DateTime)
    estado = db.Column(db.String(50))
    monto_total = db.Column(db.Float)

    def __repr__(self):
        return f"<Venta {self.id}>"


@dataclass
class Contiene_pr_venta(db.Model):
    venta_id: int
    producto_id: int
    cantidad: int

    __tablename__ = "contiene_pr_venta"
    venta_id = db.Column(db.Integer, db.ForeignKey(
        "venta.id"), primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey(
        "producto.id"), primary_key=True)
    cantidad = db.Column(db.Integer)

    def __repr__(self):
        return f"<Contiene_pr_venta {self.venta_id}>"


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


@dataclass
class Persona(db.Model):
    dni: int
    nombre: str
    apellido: str
    telefono: str

    __tablename__ = "persona"
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    apellido = db.Column(db.String(50))
    telefono = db.Column(db.String(12))

    def __repr__(self):
        return f"<Persona {self.dni}>"


@dataclass
class Recogedor(Persona):
    dni: int
    cliente_ruc: str

    __tablename__ = "recogedor"

    dni = db.Column(db.Integer, db.ForeignKey("persona.dni"), primary_key=True)
    cliente_ruc = db.Column(db.String(11), db.ForeignKey("cliente.ruc"))

    def __repr__(self):
        return f"<Recogedor {self.dni}>"


@app.route("/venta", methods=["GET", "POST"])
def route_venta():
    if request.method == "POST":
        # get data from json
        data = request.get_json()
        # get all items from carrito de compras
        carrito = Carrito_de_Compras.query.filter_by(
            cliente_ruc=data["cliente_ruc"]).all()
        # create entries in contiene_pr_venta
        for item in carrito:
            contiene = Contiene_pr_venta(
                venta_id=data["id"], producto_id=item.producto_id,
                cantidad=item.cantidad)
            db.session.add(contiene)
        db.session.commit()

        # remove productos added to venta from carrito de compras
        for item in carrito:
            db.session.delete(item)

        # create venta
        venta = Venta(id=data["id"], cliente_ruc=data["cliente_ruc"],
                      recogedor_asignado_dni=data["recogedor_asignado_dni"],
                      f_creacion=data["f_creacion"], f_limite=data["f_limite"],
                      estado=data["estado"], monto_total=data["monto_total"])
        db.session.add(venta)

        return "SUCESS"
    else:
        return jsonify(Venta.query.all())


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=7147, debug=True, host="0.0.0.0")
