/* eslint-disable no-unused-vars */
import { useState } from 'react'
import SearchTask from './SearchTask'
import TaskActions from './TaskActions'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'
import NoTaskFound from './NoTaskFound'

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "I want to Learn React such than I can treat it like my slave and make it do whatever I want to do.",
        'tags': ["Web", "React", "js"],
        "priority": "High",
        "isFavorite": false
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [toUpdateTask, setToUpdateTask] = useState(null);

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([...tasks, newTask])
        } else {
            const updatedTasks = tasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask
                }
                return task
            });
            setTasks(updatedTasks)
        }
        setShowAddModal(false)
    }

    const handleEditTask = (task) => {
        setToUpdateTask(task)
        setShowAddModal(true)
    }

    const handleCloseClick = () => {
        setShowAddModal(false)
        setToUpdateTask(null)
    }

    const handleDeleteTask = (taskId) => {
        const deleteTask = tasks.filter((task) => task.id !== taskId);
        setTasks(deleteTask);
    }

    const handleDeleteAllClick = () => {
        setTasks([])
    }

    const handleFavoriteIcon = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isFavorite: !task.isFavorite }
            }
            return task
        });
        setTasks(updatedTasks)
    }

    return (
        <section className="mb-20" id="tasks">
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask></SearchTask>
                </div>
                {showAddModal && <AddTaskModal onSave={handleAddEditTask} toUpdateTask={toUpdateTask} onCloseClick={handleCloseClick}></AddTaskModal>}
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onAddClick={() => { setShowAddModal(true) }} onDeleteAllClick={handleDeleteAllClick}></TaskActions>
                    <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handleFavoriteIcon}></TaskList>
                </div>
            </div>
        </section>
    )
}

export default TaskBoard