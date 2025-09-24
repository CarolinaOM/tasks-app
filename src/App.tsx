import { useReducer, useState, useEffect, type JSX} from "react";
import { Tasks } from "./components/Tasks";
import {type FilterValue, type TaskId, type TaskTitle, type Task as TaskType } from "./types";
import { TASK_FILTERS } from "./consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header"; 
import { taskReducer, TaskActionType } from './reducer'; 

// URL de tu backend (cámbiala por la URL real de tu API)
const API_URL = 'http://localhost:3000/tasks';

const App = (): JSX.Element => {
  const [tasks, dispatch] = useReducer(taskReducer, []); // Estado inicial vacío
  const [filterSelected, setFilterSelect] = useState<FilterValue>(TASK_FILTERS.ALL)

  // useEffect para cargar las tareas del backend al iniciar la aplicación
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Inicializa el estado con los datos del backend
        dispatch({ type: 'INITIALIZE_TASKS', payload: { tasks: data } });
      })
      .catch(error => {
        console.error("Error al cargar las tareas:", error);
      });
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  const handleRemove = ({id}: TaskId): void => {
    dispatch({ type: TaskActionType.Remove, payload: { id } });
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    .catch(error => {
      console.error("Error al eliminar la tarea:", error);
    });
  }

  const handleCompleted = (
    {id, completed}: Pick<TaskType, 'id' | 'completed'>
  ) : void => {
    dispatch({ type: TaskActionType.Complete, payload: { id, completed } });
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
    .catch(error => {
      console.error("Error al actualizar la tarea:", error);
    });
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelect(filter)
  }

  const handleRemoveAllCompleted = (): void => { 
    // Esta función podría necesitar un endpoint específico en tu backend para borrar todas
    dispatch({ type: TaskActionType.ClearCompleted });
    // Aquí puedes agregar la llamada a la API si tu backend lo soporta
  }

  const activeCount = tasks.filter(task => !task.completed).length
  const completedCount = tasks.length - activeCount

  const filteredTasks = tasks.filter(task => {
    if(filterSelected === TASK_FILTERS.ACTIVE) {
      return !task.completed;
    }
    if(filterSelected === TASK_FILTERS.COMPLETED) {
      return task.completed; 
    }
    return true; 
  })

  const handleAddTask = ({title}: TaskTitle): void => {
    const newTask = {
      title, 
      id: crypto.randomUUID(), // El ID se genera en el cliente para la UI
      completed: false
    }

    dispatch({ type: TaskActionType.Add, payload: { ...newTask } });

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask), // El backend puede generar su propio ID
    })
    .catch(error => {
      console.error("Error al agregar la tarea:", error);
      // Aquí puedes agregar lógica para revertir el cambio si la API falla
    });
  }

  const handleUpdateTask = ({ id, title }: Pick<TaskType, 'id' | 'title'>): void => {
    dispatch({ type: TaskActionType.Update, payload: { id, title } });
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
    .catch(error => {
      console.error("Error al actualizar la tarea:", error);
    });
  };

  return (
    <>
      <div className="todoapp">
        <Header onAddTask={handleAddTask} />
        <Tasks 
          onToggleCompleteTask={handleCompleted}
          onRemoveTask={handleRemove}
          onUpdateTask={handleUpdateTask}
          tasks={filteredTasks} />
          <Footer
            activeCount={activeCount}
            completedCount={tasks.length - activeCount}
            filterSelected={filterSelected}
            onClearCompleted={handleRemoveAllCompleted}
            onFilterChange={handleFilterChange} 
          />
      </div>
    </>
  );
};

export default App;