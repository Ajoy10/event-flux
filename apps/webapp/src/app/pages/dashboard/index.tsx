import { UI_EventsItem } from 'types/ui';
import EventBox from '@event-flux/ui/custom/events-box';
import { Button } from '@event-flux/ui/button';
import { Link } from 'react-router-dom';

const example_events: UI_EventsItem[] = [
  {
    id: '1',
    title: 'Event #1',
    // date_time: new Date('12/10/2024, 5:00 PM'),
    date_time: new Date(),
    options: [],
  },
  {
    id: '2',
    title: 'Event #2',
    // date_time: new Date('15/12/2024, 7:00 PM'),
    date_time: new Date(),
    options: [],
  },
];

export default function Dashboard() {
  return (
    <div>
      <Button asChild>
        <Link to={'/dashboard/new'}>Create</Link>
      </Button>
      <EventBox events={example_events} />
    </div>
  );
}
