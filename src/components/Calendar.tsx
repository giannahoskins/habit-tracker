import type { Habit } from "../types"
import React, { useState } from "react"
import {calculateStreak} from "../utils.ts"
import { motion } from "motion/react"

interface CalendarProps {
    habits: Habit[],
    onDeleteHabit: (id: string) => void
    onCompleteHabit: (id: string, date: string) => void
    isAddingHabit: boolean
    setIsAddingHabit: (value: boolean) => void
    onAddHabit: (name: string) => void
    onSaveEdit: (id: string, name: string) => void
}

function Calendar({ habits, onDeleteHabit, onCompleteHabit, isAddingHabit, setIsAddingHabit, onAddHabit, onSaveEdit }: CalendarProps) {
    const [newHabitName, setNewHabitName] = useState('')
    const [editingHabitId, setEditingHabitId] = useState<string | null>(null)
    const [editHabitName, setEditHabitName] = useState('')
    const [hoveredHabitId, setHoveredHabitId] = useState<string | null>(null)

    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        return startOfWeek
    })

    const days = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentDate)
        day.setDate(currentDate.getDate() + i)
        return day
    })

    function handlePrevWeek() {
        const prevWeek = new Date(currentDate)
        prevWeek.setDate(prevWeek.getDate() - 7)
        setCurrentDate(prevWeek)
    }

    function handleNextWeek() {
        const nextWeek = new Date(currentDate)
        nextWeek.setDate(nextWeek.getDate() + 7)
        setCurrentDate(nextWeek)
    }

    function addNewHabit() {
        onAddHabit(newHabitName)
        setNewHabitName('')
    }

    function handleStartEditing(id: string, name: string) {
        setEditingHabitId(id)
        setEditHabitName(name)
    }

    const currentYear = `${days[0].getFullYear()}`
    const dateRange = `${days[0].toLocaleString('default', { month: 'short', day: 'numeric' })} - ${days[6].toLocaleString('default', { month: 'short', day: 'numeric' })}`
    const todaysDate = new Date()
    todaysDate.setHours(0, 0, 0, 0)
    
    return (
        <>
            <div className="text-center">
                <span className="block">{currentYear}</span>
            </div>
            <div id="month_header_container" className="flex justify-between max-w-200 items-center mx-auto my-5">
                <button className="navigation-button prev" onClick={handlePrevWeek}>←</button>
                <h2 id="week" className="text-3xl xl:text-6xl lg:text-5xl md:text-4xl">{dateRange}</h2>
                <button className="navigation-button next" onClick={handleNextWeek}>→</button>
            </div>
            <div id="habit_grid" className="grid border-t border-l border-subtle" style={{ gridTemplateColumns: `200px repeat(7, 1fr)` }}>
                <div className="border-r border-b border-subtle"></div>
                {days.map(day => 
                    <div className="day flex flex-col items-center justify-center border-r border-b border-subtle" key={day.getDate()}>
                        <span className="block">{day.toLocaleString('default', { month: 'numeric', day: 'numeric'} )}</span>
                        <span className="block">{day.toLocaleString('default', { weekday: 'short' })}</span>
                    </div>
                )}
                {habits.map(habit => {
                    const streak = calculateStreak(habit.completedDates)

                    return (
                        <React.Fragment key={habit.id}>
                            <div className="habit-grid-name border-r border-b border-subtle" onMouseEnter={() => setHoveredHabitId(habit.id)} onMouseLeave={() => setHoveredHabitId(null)}>
                                {editingHabitId === habit.id ?
                                    <input 
                                        autoFocus 
                                        className="w-full h-full"
                                        value={editHabitName} 
                                        onChange={(e) => setEditHabitName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                onSaveEdit(habit.id, editHabitName)
                                                setEditingHabitId(null)
                                            }
                                        }}
                                    />
                                    : habit.name
                                }
                                {hoveredHabitId === habit.id && 
                                    <div id="habit_button_container">
                                        <button onClick={() => onDeleteHabit(habit.id)}>X</button> 
                                        <button onClick={() => handleStartEditing(habit.id, habit.name)}>E</button>
                                    </div>
                                }
                            </div>
                            {days.map(day => {
                                const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
                                return (
                                    <div className={`habit-cell flex items-center justify-center border-r border-b border-subtle min-h-12 ${new Date(date) > todaysDate ? 'opacity-30' : ''}`} key={day.getDate()} onClick={() => { if (new Date(date) <= todaysDate) onCompleteHabit(habit.id, date)}}>
                                        {habit.completedDates.includes(date) ? <div className="w-full h-full bg-accent p-[2.5]"></div> : ''}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
                {isAddingHabit ?
                    <React.Fragment>
                        <input autoFocus className="w-full min-h-12" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') addNewHabit()
                            }}></input>
                            {days.map(day => (
                                <div className="habit-cell border-r border-b border-subtle min-h-12" key={day.getDate()}></div>
                            ))}
                    </React.Fragment>
                    : null}
                <button onClick={() => {
                    setIsAddingHabit(true)
                }}>+</button>
            </div>
        </>
    )

}

export default Calendar