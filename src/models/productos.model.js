import Producto from "../schemas/productos.schemas.js";

  class Producto_model {
    
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

    // Ejemplo de Crud Basico Usando la Tabla Productos

    //GetAll
    static async getAll() {
      try {
        // en caso de querer filtrar por algun parametro pones el filtro dentro de los {}
        const productos = await Producto.findAll({});
        return productos;
      } catch (error) {
        console.error(error);
      }
    }

    // GetOne
    static async getOne({dato_buscar}) {
      try {
        // en este caso solo le pasaremos el parametro por el cual queramos buscar, ya sea un id o otro
        const producto = await Producto.findByPk(dato_buscar);
        return producto;
      } catch (error) {
        console.error(error);
      }
    }

    // Update
    static async update({id, input}) {
      try {
        // en este caso solo le pasaremos el input de los datos y el id de que queremos actualizar datos
        const producto = await Producto.update(input, {
          where: {
            id: id
          }
        });
        return producto;
      } catch (error) {
        console.error(error);
      }
    }

    // Delete
    static async delete({id}) {
      try {
        // en este caso solo le pasaremos el id de la columna que queremos borrar
        const producto = await Producto.destroy({
          where: {
            id: id
          }
        });
        return producto;
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  export default Producto_model;