import React, { useState } from 'react';
import Modal from 'react-modal';
import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const TodoApp = () => {
  const [tasks, setTasks] = useState({
    open: [],
    pending: [],
    inproge: [],
    progress: [],
  });
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [category, setCategory] = useState('open');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTask(null);
    setNewTask('');
    setCategory('open');
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [category]: [...prevTasks[category], newTask],
      }));
      closeModal();
    }
  };

  const deleteTask = (category, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks[category]];
      updatedTasks.splice(index, 1);
      return { ...prevTasks, [category]: updatedTasks };
    });
  };

  const editTask = (category, index) => {
    setEditingTask(index);
    setCategory(category);
    setNewTask(tasks[category][index]);
    openModal();
  };

  const updateTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks[category]];
        updatedTasks[editingTask] = newTask;
        const updatedCategory = category !== tasks[category] ? category : tasks[category];
        
        return {
          ...prevTasks,
          [category]: updatedCategory,
          [updatedCategory]: updatedTasks,
        };
      });

      closeModal();
    }
  };

  return (
    <div className="container">
      <div className='row-1 mt-3 d-flex align-items-center gap-2 justify-content-between'>
        {Object.keys(tasks).map((cat) => (
          <div className='col-sm card ' key={cat}>
            <div className="card-header">
              <h3 className='text-center px-4'>{cat}</h3>
            </div>

            <div className="card-body">
              {tasks[cat].map((task, index) => (
                <div className='m-1' key={task}>
                  {editingTask === index ? (
                    <div>
                      <input
                        className='w-100'
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <select
                        className='form-control mt-3'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="inproge">Inproge</option>
                        <option value="progress">Progress</option>
                      </select>
                      <button className='btn btn-warning mt-3' onClick={updateTask}>Update</button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-3">
                      <h4>{task}</h4>
                      <button className='btn btn-primary' onClick={() => editTask(cat, index)}>Edit</button>
                      <button className='btn btn-danger' onClick={() => deleteTask(cat, index)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className='p-2 '>
              <button className='btn btn-success ' onClick={() => { setCategory(cat); openModal(); }}>
                Add User
              </button>
            </div>
          </div>
        ))}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task Modal"
          style={{
            content: {
              width: '500px',
              height: '300px',
              display:"flex",
              flexDirection:"column",
              margin: 'auto',
            },
          }}
        >
          <ModalHeader>
            <h2>{editingTask !== null ? 'Edit User' : 'Add User'}</h2>
          </ModalHeader>
          <ModalBody>
            <input
              className='form-control w-100'
              type="text"
              placeholder="Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            
            <select className='form-control mt-3' value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="inproge">Inproge</option>
              <option value="progress">Progress</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <button className={editingTask !== null ? 'btn btn-warning': 'btn btn-success' } onClick={editingTask !== null ? updateTask : addTask}>
              {editingTask !== null ? 'Update User' : 'Add User'}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default TodoApp;
