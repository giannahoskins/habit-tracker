export function calculateStreak(completedDates: string[]): number {
    const todaysDate = new Date()
    todaysDate.setHours(0, 0, 0, 0)
    let streak = 0

    while (true) {
        const dateString = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`
        if (!completedDates.includes(dateString)) break
        streak ++
        todaysDate.setDate(todaysDate.getDate() - 1)
    }

    return streak
}