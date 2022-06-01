import React, { useCallback, useMemo, useState } from 'react';
import events from "../components/events";
import { Calendar, momentLocalizer } from 'react-big-calendar';
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop';
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('Asia/Taipei');

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);


const AdjustTime = () => {

  const [myEvents, setMyEvents] = useState(events)


  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 12), [])

  return (


    <div>
      <div>
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView="week"
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          popup
          resizable
          selectable
        />
      </div>
    </div>

  );





}





export default AdjustTime;