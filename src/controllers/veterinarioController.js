
import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helper/generarJWT.js"
import generarId from "../helper/generarId.js"
const registrar = async (req,res) =>{
    const {email} = req.body

    const existeUser = await Veterinario.findOne({email})
    if(existeUser){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    
   try {
    const veterinario = new Veterinario (req.body)
    const veterianarioSave = await veterinario.save()
    
    res.json(veterianarioSave)
   } catch (error) {
    console.log(error)
   }
}



const confirmar = async (req,res)=>{
  const {token} = req.params
  
  try {
    const confirmarUser = await Veterinario.findOne({token})
    if(!confirmarUser){
        const error = new Error ('token no valido')
        return res.status(400).json({mdg: error.message})
    }else {

        confirmarUser.token = null
        confirmarUser.confirmado = true
        await confirmarUser.save()

        res.json({msg: 'usuario registrado correctamente'})
    }
  } catch (error) {
    console.log(error)
  }
}
const autenticar = async (req, res) => {
    const {email, password} = req.body
    try {

        // confirmo si el usuario existe
        const usuario = await Veterinario.findOne({email})
        if(!usuario){
            const error = new Error('El usuario no existe')
            return res.status(401).json({msg: error.message})

        }
  
        // comprobar si el usuario esta confirmado
        if(!usuario.confirmado){
            const error = new Error('La cuenta no fue confirmada')
            return res.status(401).json({msg: error.message})

        }
        //revisar password
        if(await usuario.comprobarPassword(password)){
           res.json({token : generarJWT(usuario.id)})
        } else {
            const error = new Error('incorrect password')
            return res.status(401).json({msg: error.message})
        }
    } catch (error) {
        console.log(error)
    }
}

const perfil =(req,res)=>{

    const {veterinario} = req
    res.send({perfil: veterinario})
} 

const olvidePassword = async (req, res) =>{
  const {email} = req.body

try {
    const veterinarioExiste = await Veterinario.findOne({email})
    if(!veterinarioExiste){
      const error = new Error('el email no existe')
              return res.status(401).json({msg: error.message})
    }

    veterinarioExiste.token = generarId()
    await veterinarioExiste.save()

    res.json({msg: 'Hemos enviado un emial con las instrucciones'})
} catch (error) {
    console.log(error)
}
}
const comprobarToken = async (req, res) =>{
  const {token} = req.params

  const tokenValido = await Veterinario.findOne({token})
  if(tokenValido){
   res.json({msg: 'Toenk valido y el usuario existe'})
  }else {
    const error = new Error('Token no valido')
    return res.status(400).json({msg: error.message})
  }
}
const nuevoPassword= async(req, res) =>{
  const {token} = req.params
  const {password} = req.body

  const veterinario = await Veterinario.findOne({token})

  try {
    veterinario.token = null
    veterinario.password = password
    await veterinario.save()

    res.json({msg : 'password modificado correctamente'})
  } catch (error) {
    console.log(error)
    
  }

  if(!veterinario){
    const error = new Error('Hubo un error')
    return res.status(400).json({msg: error.message})
  }

}
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}