export default {
    name: "event-view",
    props: ['event'],
    data: () => {
        return {
            date: "10. Oktober",
            description: "Eventbeschreibung",
            isToday: Math.random() >= 0.5
        }
    }
}