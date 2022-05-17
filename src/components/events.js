const now = new Date()

export default [
    

   
      {
        id: 2,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
      {
        id: 3,
        title: 'Point in Time Event',
        start: now,
        end: now,
        desc: 'Pre-meeting meeting, to prepare for the meeting',
      },
      {
        id: 4,
        title: 'Point in Time Event',
        start: now,
        end: now,
        desc: 'Pre-meeting meeting, to prepare for the meeting',
      }
]