import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.imagen ? product.imagen : "/noimage.png"}
          alt={product.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.nombre ? product.nombre : "Nombre faltante..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.descripcion
              ? product.descripcion
              : "Descripcion faltante..."}
          </Typography>
          <Typography variant="body2" className="text-red-500 font-bold">
            Stock: {product.stock ? product.stock : 0}
          </Typography>
          <Typography variant="body2" className="text-gray-800 font-bold">
            S/. {product.precio ? product.precio : 0}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
