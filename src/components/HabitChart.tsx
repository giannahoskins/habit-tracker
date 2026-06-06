import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useState } from "react"
import type { Habit } from "../types"

interface HabitChartProps {
    habits: Habit[]
}

export function HabitChart({habits}: HabitChartProps) {
    const data = habits.map((habit) => {
        const created = new Date(habit.createdOn)
        const today = new Date()
        const daysSinceCreated = Math.max(1, Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)))
        const validCompletions = habit.completedDates.filter(date => date >= habit.createdOn)
        const completionRate = Math.min(100, daysSinceCreated === 0 ? 0 : (validCompletions.length / daysSinceCreated) * 100)

        return { name: habit.name, completionRate }
    })

    return (
        <>
            <BarChart width={800} height={500} data={data}>
                <XAxis dataKey="name" label={{ position: 'insideBottomRight', value: 'XAxis title', offset: -10 }} />
                <YAxis label={{ position: 'insideTopLeft', value: 'YAxis title', angle: -90, dy: 60 }} />
                <Bar dataKey="completionRate" fill="#8884d8" />
                <Tooltip />
            </BarChart>
        </>
    )
}

export default HabitChart