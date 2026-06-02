import type {Habit} from "../types"
import React, {useState} from "react"

interface CalendarProps {
    habits: Habit[],
    onDeleteHabit: (id: string) => void
    onCompleteHabit: (id: string, date: string) => void
}

function Calendar({habits, onDeleteHabit, onCompleteHabit}: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const days = Array.from({length: daysInMonth}, (_, i) => i + 1)

    function handlePrevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    }

    function handleNextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    }

    return (
        <>
            <div id="month_header_container" className="flex justify-between max-w-200 items-center mx-auto my-5">
                <button className="navigation-button prev" onClick={handlePrevMonth}>←</button>
                <h2 id="month" className="font-display text-3xl xl:text-6xl lg:text-5xl md:text-4xl">{currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})}</h2>
                <button className="navigation-button next" onClick={handleNextMonth}>→</button>
            </div>
            <div id="habit_grid" className="grid border-t border-l border-subtle" style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)` }}>
                <div className="border-r border-b border-subtle"></div>
                {days.map(day => <div className="day flex items-center justify-center border-r border-b border-subtle" key={day}><span>{day}</span></div>)}
                {habits.map(habit => (
                    <React.Fragment key={habit.id}>
                        <div className="habit-grid-name border-r border-b border-subtle">{habit.name}</div>
                        {days.map(day => {
                            const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`
                            return (
                                <div className="habit-cell flex items-center justify-center border-r border-b border-subtle" key={day} onClick={() => onCompleteHabit(habit.id, date)}>
                                    {habit.completedDates.includes(date) ? '✓' : ''}
                                </div>
                            )
                        })}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
    
}

export default Calendar