import { useState, useEffect, useRef, type FC } from 'react';
import { type TaskId, type Task as TaskType } from '../types.d';

interface Props extends TaskType {
  onRemoveTask: ({ id }: TaskId) => void;
  onToggleCompleteTask: ({ id, completed }: Pick<TaskType, 'id' | 'completed'>) => void;
  onUpdateTask: ({ id, title }: Pick<TaskType, 'id' | 'title'>) => void; 
}

export const Task: FC<Props> = ({ id, title, completed, onRemoveTask, onToggleCompleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      onUpdateTask({ id, title: editedTitle });
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateTask({ id, title: editedTitle });
  };

  useEffect(() => {
    if (isEditing) {
      inputEditTitle.current?.focus()
    }
  }, [isEditing])

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          checked={completed}
          type="checkbox"
          onChange={(event) => {
            onToggleCompleteTask({
              id,
              completed: event.target.checked
            });
          }}
        />
        <label onDoubleClick={handleDoubleClick}>{title}</label>
        <button
          className="destroy"
          onClick={() => {
            onRemoveTask({ id });
          }}
        />
      </div>
      {isEditing && (
        <input
          className="edit"
          value={editedTitle}
          onChange={(e) => {
            setEditedTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </li>
  );
};
