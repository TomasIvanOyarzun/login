import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () =>{
    try {

        const db = await mongoose.connect(`${process.env.MONGO_URI}`,{
            useNewUrlParser : true,
            useUnifiedTopology : true,

            
        })
        
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`mongo DB conectado en : ${url}`)
    } catch (error) {
        console.log(`error : ${error}`)
        process.exit(1)
    }
}


export default connectDB