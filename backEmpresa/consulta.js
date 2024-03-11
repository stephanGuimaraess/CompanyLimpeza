const pool = require('./db');

const express = require('express');
const router = express.Router();


//list
router.get('/clientesList', async (req, res) => {
 try {
    const result = await pool.query('SELECT * FROM clientes.cliente');
    res.json(result.rows);
 } catch (err) {    
    res.status(500).json({ message: err.message });
 }
});


//filter
router.get('/clientes/filtrar', async (req, res) => {
    const { name, email, phone } = req.query;
    try {
       const result = await pool.query('SELECT * FROM clientes.cliente WHERE name = $1 OR email = $2 OR phone = $3', [name, email, phone]);
       if (result.rows.length === 0) {            
        return res.status(404).json({ message: 'Não há cliente com essa informação.' });    }
       res.json(result.rows);
    } catch (err) {
        res.status.json({ message: 'Erro ao buscar clientes.' });
    }
   });




   router.post('/clientes', async (req, res) => {

    const { name, email, phone} = req.body;
    try {
      
       const checkClient = await pool.query('SELECT * FROM clientes.cliente WHERE email = $1 OR phone = $2', [email, phone]);

       if (checkClient.rowCount > 0) {
         
         return res.status(400).json({ message: 'Já existe um cliente com o mesmo e-mail ou telefone.' });
       }

       await pool.query('INSERT INTO clientes.cliente (name, email, phone) VALUES ($1, $2, $3) RETURNING id', [name, email, phone]);
       
       res.json({ message: 'Cliente cadastrado com sucesso.' });

    } catch (err) {
         res.status(500).json({ message: 'Erro ao cadastrar cliente.' });
    }
   });


//modifica coordenada
router.post('/clientes/coordenadas', async (req, res) => {
    const { clienteId, x, y } = req.body;
    try {
        // Verificar se o cliente existe
        const clienteExists = await pool.query(`
            SELECT EXISTS(SELECT 1 FROM clientes.cliente WHERE id = $1)
        `, [clienteId]);

        if (!clienteExists.rows[0].exists) {
            return res.status(400).json({ message: 'Cliente não encontrado.' });
        }

        // Se o cliente existir, prosseguir com a inserção ou atualização das coordenadas
        const result = await pool.query(`
            INSERT INTO clientes.coordenadas (cliente_id, "coordenadaX", "coordenadaY")
            VALUES ($1, $2, $3)
            ON CONFLICT (cliente_id)
            DO UPDATE SET
              "coordenadaX" = EXCLUDED."coordenadaX",
              "coordenadaY" = EXCLUDED."coordenadaY"
        `, [clienteId, x, y]);

        res.json({ message: 'Coordenadas cadastradas com sucesso.' });
        
    } catch (err) {  
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar coordenadas.' });
    }
});



//get coordenada
router.get('/coordenadas/filtrar', async (req, res) => {
    const { clienteId } = req.query;
    try {
        const result = await pool.query('SELECT "coordenadaX", "coordenadaY", cliente_id FROM clientes.coordenadas WHERE cliente_id = $1', [clienteId]);
        if (result.rows.length === 0) {            
            return res.status(404).json({ message: 'Não há cliente com esse ID.' });        }
        res.json(result.rows);
    } catch (err) {       
        res.status(500).json({ message: 'Erro ao buscar coordenadas do cliente.' });
    }
});


//calcular Rota
   router.get('/calcularRota', async (req, res) => {
    try {       
        const rota = await calcularRota();
        res.json(rota);
    } catch (err) {       
        res.status(500).json({ message: 'Erro ao calcular a rota.' });
    }
});

async function calcularRota() {
   
    const result = await pool.query(`
        SELECT cliente.name, cliente.email , coordenadas."coordenadaX", coordenadas."coordenadaY"
        FROM clientes.cliente
        JOIN clientes.coordenadas ON cliente.id = coordenadas.cliente_id
    `);
    let clientes = result.rows;  

    clientes.sort((a, b) => {
        if (a.coordenadaX === b.coordenadaX) {
            return a.coordenadaY - b.coordenadaY;
        }
        return a.coordenadaX - b.coordenadaX;
    });

    return clientes;
}
   
   
   module.exports = router;