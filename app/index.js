const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

let tasks = [
    { id: 1, name: 'Task 1', description: 'This is task 1', status: 'completed' },
    {
        id: 2, name: 'Task 2', description: 'This is task 2', status: 'pending'
    },
    {
        id: 3, name: 'Task 3', description: 'This is task 3', status: 'in-progress'
    },
    {
        id: 4, name: 'Task 4', description: 'This is task 4', status: 'completed'
    },
    {
        id: 5, name: 'Task 5', description: 'This is task 5', status: 'pending'
    }
]

//get all tasks
app.get('/tasks',(req,res)=>{
    return res.status(200).json(tasks);
})

//get task by id
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    console.log('Task ID:', taskId);
    if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json(task);  
})

//create task
app.post('/task', (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.status) {
        return res.status(400).json({ message: 'Name, description and status are required' });
    }
    if (tasks.find(t => t.name === req.body.name)) {
        return res.status(409).json({ message: 'Task with this name already exists' });
    }
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    };
    tasks.push(newTask);
    return res.status(201).json(newTask);
})


//update task
app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    if (req.body.name) {
        task.name = req.body.name;
    }
    if (req.body.description) {
        task.description = req.body.description;
    }
    if (req.body.status) {
        task.status = req.body.status;
    }
    return res.status(200).json(task);
})


//delete task
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    return res.status(204).send();
})


app.listen(port, () => {
    console.log(`Task Manager is running on port ${port}`);
})