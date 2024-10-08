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

export type UI_LocationInputData = {
  type: 'physical' | 'virtual' | 'hybrid';
  physical: {
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  } | null;
  virtual: {
    virtual_location: string;
  } | null;
};
