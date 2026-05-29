import HabitItem from './HabitItem'
import type {Habit} from "../types"

interface HabitListProps {
    habits: Habit[]
}

function HabitList({ habits }: HabitListProps) {
    return (
        <>
            {habits.map(habit => <HabitItem key={habit.id} habit={habit} />)}
        </>
    )
}

export default HabitList