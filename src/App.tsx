import AddHabitForm from "./components/AddHabitForm"
import type {Habit} from "./types"
import {useState} from "react"
import HabitItem from './components/HabitItem'
import HabitList from './components/HabitList'

function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  function handleAddHabit(habitName: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      completedDates: []
    }

    setHabits([...habits, newHabit])
  }

  return (
    <>
      <AddHabitForm onAddHabit={handleAddHabit}/>
      <HabitList habits={habits}/>
    </>
  )
}

export default App