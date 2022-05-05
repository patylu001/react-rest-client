const Tarea = require("../models/tarea");

function createTarea(req, res){
    console.log("Creando tarea...");
    console.log(req.body);
    let tarea = new Tarea({
        id: req.body.id,
        name: req.body.name,
        puntos:req.body.puntos,
        materia: req.body.materia,
        fechaEntrega: req.body.fechaEntrega
    });
    tarea.save( (error, result)=> {
        if (error){
            return res.status(500).json({
                error: true,
                message: "Server down",
                code: 0
            });
        }
        if(!result){
            return res.status(400).json({
                error: true,
                message: "Client error",
                code: 10
            });
        }
        return res.status(200).json({
            error: false,
            message: "OK",
            code: 20,
            data: result  
        });
    })

}

function updateTarea(req, res){
    const tareaId = req.params.id; //id de la tarea que vamos a actualizar
    const newTarea = req.body;
    //Llamar a la bd
    Tarea.findByIdAndUpdate(tareaId, newTarea, { new: true}, (error, result) => {
        if (error){
            return res.status(500).json({
                error: true,
                message: "Server down",
                code: 0
            });
        }
        if(!result){
            return res.status(400).json({
                error: true,
                message: "Client error",
                code: 10
            });
        }
        return res.status(200).json({
            error: false,
            message: "OK",
            code: 20,
            data: result  
        });

    });
}

function findAllTareas(req, res) {
    Tarea.find().exec((error, tareas) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: "Server error",
                code: 0
            }
            );

        }
        return res.status(200).json({
            error: false,
            message: "Sucess",
            data: tareas,
            code: 10
        });
    })

}

module.exports = {
    createTarea,
    updateTarea,
    findAllTareas
}