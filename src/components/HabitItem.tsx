import type {Habit} from "../types"

interface HabitItemProps {
    habit: Habit
}

function HabitItem({ habit }: HabitItemProps) {
    return (
        <p>{ habit.name }</p>
    )
}

export default HabitItem