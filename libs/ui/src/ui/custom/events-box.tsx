import { UI_EventsItem } from 'types/ui';
import { Card, CardContent } from '../card';

type EventsBoxPropTypes = {
  events: UI_EventsItem[];
};

export default function EventsBox(props: EventsBoxPropTypes) {
  return (
    <div className="event-box flex flex-col gap-4">
      {props.events.map((evnt) => {
        return <EventBoxItem key={evnt.id} event={evnt} />;
      })}
    </div>
  );
}

type EventsBoxItemTypes = {
  event: UI_EventsItem;
};

function EventBoxItem({ event }: EventsBoxItemTypes) {
  return (
    <div className="event-box-item px-2 py-4 bg-[#F5F7F7] flex flex-row rounded-sm border">
      <div className="event-image">
        <img src={event.image || ''} alt={event.title + ' banner'} />
      </div>
      <div className="event-details">
        <div className="event-title">{event.title}</div>
        <div className="event-date-time">
          {
            Intl.DateTimeFormat('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            }).format(event.date_time)
            // TODO: Replace with dayjs
          }
        </div>
      </div>
    </div>
  );
}
