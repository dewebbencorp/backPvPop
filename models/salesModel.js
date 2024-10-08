const sql = require('mssql');
const dbConfig = require('../db/db_PvpPop');

async function obtenerVentas() {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Ventas');
    return result.recordset;
  } catch (error) {
    throw new Error('Error obteniendo ventas:', error);
  }
}

async function agregarVenta(data) {
  const { articulo, cantidad, precio, descuento, total } = data;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('articulo', sql.VarChar, articulo)
      .input('cantidad', sql.Int, cantidad)
      .input('precio', sql.Decimal, precio)
      .input('descuento', sql.Decimal, descuento)
      .input('total', sql.Decimal, total)
      .query(
        `INSERT INTO Ventas (articulo, cantidad, precio, descuento, total)
         VALUES (@articulo, @cantidad, @precio, @descuento, @total)`
      );
    return { message: 'Venta agregada exitosamente' };
  } catch (error) {
    throw new Error('Error agregando venta:', error);
  }
}

module.exports = {
  obtenerVentas,
  agregarVenta
};
