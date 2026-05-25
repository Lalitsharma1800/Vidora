import Todo from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    try{
        const {title, description} = req.body;

        //validation
        if(!title || title.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
        const todo = await Todo.create({
            title,
            description,
        });
        return res.status(201).json({
            success: true,
            message: "Todi created successfully",
            todo,
        })
    }
    catch(error){
       return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
    }
}