import express from 'express'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const server = express()
server.use(express.json())

server.use('/api/veterinarios', veterinarioRoutes)
server.use('/api/pacientes', pacienteRoutes)
export default server