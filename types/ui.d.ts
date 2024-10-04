type UI_RSVPOption = {
  name: string;
  value: number;
};
export type UI_EventsItem = {
  id: string;
  title: string;
  date_time: Date;
  image?: string;
  options: UI_RSVPOption[];
};
