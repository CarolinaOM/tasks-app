import { type TaskTitle } from '../types'
import { CreateTask } from './CreateTask'
import { type FC } from 'react'

interface Props {
  onAddTask: ({ title}: TaskTitle) => void
}

export const Header: FC<Props> = ({onAddTask}) => {
  return (
    <header className='header'>
      <h1>task<img
        style={{ width: '60px', height: 'auto' }}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'/>
      </h1>
      <CreateTask saveTask={onAddTask} />
    </header>
  )
}
