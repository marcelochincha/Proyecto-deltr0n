# API REST de productos

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


# CORS(app)
CORS(app, origins="*", allow_headers="*", supports_credentials=True)
cache = Cache(app, config={"CACHE_TYPE": "simple",
              "CACHE_DEFAULT_TIMEOUT": 300})

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cache.init_app(app)


@dataclass
class Producto(db.Model):
    id: int
    nombre: str
    precio: float
    descripcion: str
    fabricante_nombre: str
    imagen: str

    __tablename__ = "producto"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    precio = db.Column(db.Float)
    descripcion = db.Column(db.String(50))
    fabricante_nombre = db.Column(
        db.String(50), db.ForeignKey("fabricante.nombre"))
    imagen = db.Column(db.String(256))

    def __repr__(self):
        return f"<Producto {self.id}>"


@dataclass
class Categoria_de(db.Model):
    producto_id: int
    categoria_nombre: str

    __tablename__ = "categoria_de"
    producto_id = db.Column(db.Integer, db.ForeignKey(
        "producto.id"), primary_key=True)
    categoria_nombre = db.Column(
        db.String(50), db.ForeignKey("categoria.nombre"), primary_key=True
    )

    def __repr__(self):
        return f"<Categoria_de {self.producto_id}>"


# ruta de productos
@app.route("/productos", methods=["GET", "POST"])
@cache.cached()
def route_productos():
    if request.method == "GET":
        cached_productos = cache.get("productos")
        if cached_productos is not None:
            return jsonify(cached_productos)
        productos = Producto.query.all()
        cache.set("productos", productos)
        return jsonify(productos)
    elif request.method == "POST":
        producto = Producto(**request.json)
        db.session.add(producto)
        db.session.commit()
        return "SUCCESS"


# ruta para obtener productos por categoria
@app.route("/productos/<categoria>", methods=["GET"])
@cache.cached()
def route_productos_categoria(categoria):
    if request.method == "GET":
        cached_productos_categoria = cache.get(categoria)
        if cached_productos_categoria is not None:
            return jsonify(cached_productos_categoria)
        prod = Producto.query.all()
        cat = Categoria_de.query.filter_by(
            categoria_nombre=categoria.upper()).all()
        productos_cat = []

        for pr in prod:
            for c in cat:
                if pr.id == c.producto_id:
                    productos_cat.append(pr)
        cache.set(categoria, productos_cat)

        return jsonify(productos_cat)


if __name__ == "__main__":
    app.run(port=7146, debug=True, host="0.0.0.0")
