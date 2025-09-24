import React, { useState } from 'react'
import { type TaskTitle } from '../types.d'

interface Props {
  saveTask: ({ title}: TaskTitle) => void
}

export const CreateTask: React.FC<Props> = ({saveTask}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTask({title: inputValue})
    setInputValue('')
  }

  return(
    <form onSubmit={handleSubmit}>
      <input 
        className='new-task'
        value={inputValue}
        onChange={(event) => { setInputValue(event.target.value) }} 
        placeholder='¿Que quieres hacer?'
        autoFocus 
      />
    </form>
  )
}