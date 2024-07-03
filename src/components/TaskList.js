import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/tasksSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [taskText, setTaskText] = useState('');

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setTaskText(task.text);
  };

  const handleSave = () => {
    dispatch(editTask({ id: editingTask, text: taskText }));
    setEditingTask(null);
    setTaskText('');
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                {task.text}
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(task.id))}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
