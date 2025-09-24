import { type TaskId, type Task as TaskType, type TaskTitle } from "./types.d";

// Cambia el enum a un objeto para solucionar el error de sintaxis
export const TaskActionType = {
  Add: "ADD_TASK",
  Remove: "REMOVE_TASK",
  Complete: "COMPLETE_TASK",
  Update: "UPDATE_TASK",
  ClearCompleted: "CLEAR_COMPLETED",
  Initialize: "INITIALIZE_TASKS", // El nombre correcto de la acción
} as const;

export type TaskAction =
  | { type: typeof TaskActionType.Add; payload: { title: TaskTitle['title'] } }
  | { type: typeof TaskActionType.Remove; payload: { id: TaskId['id'] } }
  | { type: typeof TaskActionType.Complete; payload: { id: TaskId['id'], completed: TaskType['completed'] } }
  | { type: typeof TaskActionType.Update; payload: { id: TaskId['id'], title: TaskType['title'] } }
  | { type: typeof TaskActionType.ClearCompleted }
  | { type: typeof TaskActionType.Initialize; payload: { tasks: TaskType[] } };

export const taskReducer = (state: TaskType[], action: TaskAction): TaskType[] => {
  switch (action.type) {
    case TaskActionType.Initialize:
      return action.payload.tasks;
    case TaskActionType.Add:
      const { title } = action.payload;
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
        },
      ];
    case TaskActionType.Remove:
      const { id: removeId } = action.payload;
      return state.filter((task) => task.id !== removeId);
    case TaskActionType.Complete:
      const { id: completeId, completed } = action.payload;
      return state.map((task) => {
        if (task.id === completeId) {
          return { ...task, completed };
        }
        return task;
      });
    case TaskActionType.Update:
      const { id: updateId, title: updatedTitle } = action.payload;
      return state.map((task) => {
        if (task.id === updateId) {
          return { ...task, title: updatedTitle };
        }
        return task;
      });
    case TaskActionType.ClearCompleted:
      return state.filter((task) => !task.completed);
    default:
      return state;
  }
};