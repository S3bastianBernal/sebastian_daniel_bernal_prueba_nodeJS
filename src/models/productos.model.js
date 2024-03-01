import Producto from "../schemas/productos.schemas.js";

  class Producto_model {

    static async getAll() {
      try {
        const productos = await Producto.findAll();
        return productos;
      } catch (error) {
        console.error(error);
      }
    }
  
    static async create({input}) {
      try {
        const { estado, kit, barcode, nombre, presentacion, descripcion, foto, peso } = input;
        
        const existingProduct = await Producto.findOne({
          where: {
            barcode: barcode
          }
        });
        if (existingProduct) {
          return console.log('Ya existe un producto con el mismo barcode.');
        }
        const producto = await Producto.create({
          estado,
          kit,
          barcode,
          nombre,
          presentacion,
          descripcion,
          foto,
          peso
        });
        return producto;
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  export default Producto_model;