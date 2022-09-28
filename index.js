import server from './src/app.js'
import connectDB from './src/config/db.js'


const PORT = process.env.PORT || 4000

server.listen(PORT , ()=>{
    connectDB()
    console.log(`server corriendo en el puerto: ${PORT}`)
})