import sql from 'mssql';

// Obtener todos los tickets
const getTickets = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM dbo.Ticket');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send('Error obteniendo los tickets');
  }
};

// Crear un nuevo ticket
const createTicket = async (req, res) => {
  const { Clav_Alm, Clav_Empresa, No_Tick, Total_P } = req.body;

  try {
    await sql.query(`INSERT INTO dbo.Ticket (Clav_Alm, Clav_Empresa, No_Tick, Total_P) VALUES 
    ('${Clav_Alm}', '${Clav_Empresa}', ${No_Tick}, ${Total_P})`);
    res.status(201).send('Ticket creado con éxito');
  } catch (error) {
    res.status(500).send('Error creando el ticket');
  }
};

// Actualizar un ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { Total_P } = req.body;

  try {
    await sql.query(`UPDATE dbo.Ticket SET Total_P = ${Total_P} WHERE No_Tick = ${id}`);
    res.send('Ticket actualizado');
  } catch (error) {
    res.status(500).send('Error actualizando el ticket');
  }
};

// Eliminar un ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await sql.query(`DELETE FROM dbo.Ticket WHERE No_Tick = ${id}`);
    res.send('Ticket eliminado');
  } catch (error) {
    res.status(500).send('Error eliminando el ticket');
  }
};

// Exportación por defecto del controlador
export default {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
