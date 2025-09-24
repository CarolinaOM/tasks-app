import { type ListOfTasks, type TaskId, type Task as TaskType } from "../types.d";
import { Task } from "./Task";
import { type FC } from 'react';
import { useAutoAnimate } from "@formkit/auto-animate/react" 
interface Props {
  tasks: ListOfTasks;
  onRemoveTask: ({ id }: TaskId) => void;
  onToggleCompleteTask: ({ id, completed }: Pick<TaskType, 'id' | 'completed'>) => void;
  onUpdateTask: ({ id, title }: Pick<TaskType, 'id' | 'title'>) => void;
}

export const Tasks: FC<Props> = ({ tasks, onRemoveTask, onToggleCompleteTask, onUpdateTask }) => {
  const [parent] = useAutoAnimate()

  return (
    <ul className='todo-list' ref={parent}>
      {tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onRemoveTask={onRemoveTask}
          onToggleCompleteTask={onToggleCompleteTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
};