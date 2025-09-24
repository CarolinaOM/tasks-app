import { type TaskId, type Task as TaskType, type TaskTitle } from "./types";

export enum TaskActionType {
  Add = "ADD_TASK",
  Remove = "REMOVE_TASK",
  Complete = "COMPLETE_TASK",
  Update = "UPDATE_TASK",
  ClearCompleted = "CLEAR_COMPLETED",
  Initialize = "INITIALIZE_TASKS", // Agrega el nuevo tipo
}

export type TaskAction =
  | { type: TaskActionType.Add; payload: { title: TaskTitle['title'] } }
  | { type: TaskActionType.Remove; payload: { id: TaskId['id'] } }
  | { type: TaskActionType.Complete; payload: { id: TaskId['id'], completed: TaskType['completed'] } }
  | { type: TaskActionType.Update; payload: { id: TaskId['id'], title: TaskType['title'] } }
  | { type: TaskActionType.ClearCompleted }
  | { type: TaskActionType.Initialize; payload: { tasks: TaskType[] } }; // Agrega la nueva acción

export const taskReducer = (state: TaskType[], action: TaskAction): TaskType[] => {
  switch (action.type) {
    case TaskActionType.Initialize: // Nuevo caso para inicializar el estado
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
    // ... (resto de tus casos)
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