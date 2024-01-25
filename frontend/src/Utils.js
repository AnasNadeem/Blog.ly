export const dateTimeFormatter = (date) => {
    // From - 2024-01-25T10:39:56.349700
    // To - January 25, 2024 10:39 AM
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.toLocaleString('default', { month: 'long' })
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12
    const formattedMinute = minute < 10 ? `0${minute}` : minute
    return `${month} ${day}, ${year} ${formattedHour}:${formattedMinute} ${ampm}`
}
