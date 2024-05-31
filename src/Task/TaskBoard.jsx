import React, { useState } from 'react'
import SearchTask from './SearchTask'
import TaskActions from './TaskActions'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "I want to Learn React such than I can treat it like my slave and make it do whatever I want to do.",
        'tags': ["Web", "React", "js"],
        "priority": "High",
        "isFavorite": false
    }
    const [tasks, setTasks] = useState([defaultTask])
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    const handleAddEditTask = (newTask, isAdd) => {
        if(isAdd){
            setTasks([...tasks, newTask])
        }else{
            setTasks(
                tasks.map((task) => {
                    if(task.id === newTask.id){
                        return newTask
                    }
                    return task
                })
            )
        }
       setShowAddModal(false)
    }

    const handleCloseClick = () => {
        setShowAddModal(false)
        setTaskToUpdate(null)
    }

    const handleEditTask = (task) => {
        setTaskToUpdate(task)
        setShowAddModal(true)
    }

    const handleDeleteTask = (taskId) => {
        const tasksAfterDelete = tasks.filter(task => task.id !== taskId)
        setTasks(tasksAfterDelete)
    }

    const handleDeleteAllClick = () => {
        tasks.length = 0;
        setTasks([...tasks])
    }
    return (
        <section className="mb-20" id="tasks">
            {
                showAddModal && <AddTaskModal onSave={handleAddEditTask} onCloseClick={handleCloseClick}  taskToUpdate={taskToUpdate}></AddTaskModal>
            }
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask></SearchTask>
                </div>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onAddClick={() => {setShowAddModal(true)}} onDeleteAllClick={handleDeleteAllClick}></TaskActions>
                    <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask}></TaskList>
                </div>
            </div>
        </section>
    )
}

export default TaskBoard