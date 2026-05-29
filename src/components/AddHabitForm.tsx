import {useState} from 'react'

interface AddHabitFormProps {
    onAddHabit: (name: string) => void 
}

function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
    const [textInput, setTextInput] = useState('')

    function handleSubmit() {
        onAddHabit(textInput)
        setTextInput('')
    }

    return (
        <>
            <input value={textInput} onChange={(e) => setTextInput(e.target.value)}></input>
            <button onClick={handleSubmit}>Add Habit</button>
        </>
    )
}

export default AddHabitForm