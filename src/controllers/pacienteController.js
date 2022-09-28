import Paciente from "../models/Paciente.js"
const agregarPaciente = async(req, res) =>{
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacientaSave = await paciente.save()
        res.json(pacientaSave)

    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res)=>{
      const paciente  = await Paciente.find().where('veterinario').equals(req.veterinario)

      res.json(paciente)
}

const obtenerPaciente = async (req, res) =>{
 const {id} = req.params

 const paciente = await Paciente.findById(id)

console.log(paciente.veterinario._id)
console.log(req.veterinario._id)

 if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg : 'Accion no valida'})
 }

 if(paciente){
    res.json(paciente)
 }
}
const actualizarPaciente = async (req, res) =>{
 
}
const eliminarPaciente = async (req, res) =>{
 
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}