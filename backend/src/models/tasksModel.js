const connection = require('./connection');

const getAll = async () => {
    // Desestruturação de array (sem isso ele retorna o buffer de tasks)
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const getBySearch = async (search) => {
    const query = "SELECT * FROM tasks" +  
    " WHERE title LIKE ?" +
    " OR status LIKE ?" +
    " OR created_at LIKE ?";
    const searchParam = `%${search}%`;
  
    const [tasks] = await connection.execute(query, [searchParam, searchParam, searchParam]);
  
    return tasks;
};
 
const insertTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

    return { insertId: createdTask.insertId };

};

const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, status } = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [title, status, id]);

    return updatedTask;
};

module.exports = {
    getAll,
    getBySearch,
    insertTask,
    deleteTask,
    updateTask
};