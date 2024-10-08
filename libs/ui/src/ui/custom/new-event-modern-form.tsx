import { cn, default_banner_image, Z_NewEventData } from '@event-flux/utils';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from '../calendar';
import { TimePicker12Demo } from '../timepicker/time-picker-12h';
import { Button } from '../button';
import { PopoverClose } from '@radix-ui/react-popover';

import { dayjs } from '@event-flux/utils';
import { RichTextEditor } from '../tiptap-minimal-editor';
import { Pencil1Icon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Input } from '../input';
import Label from './label';
import { UI_LocationInputData } from 'types/ui';
import LocationCard from './location-card';
import RSVPBox from './rsvp-box';
import EventBannerChooser from './event-banner-chooser';
import { z } from 'zod';

type NewEventModernFormPropTypes = {
  className?: string;
  uploadImageToCloud?: (image: File) => Promise<string | undefined>;
};

export default function NewEventModernForm({
  className,
  uploadImageToCloud,
}: NewEventModernFormPropTypes) {
  const [title, setTitle] = useState('My Event Title');
  const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<UI_LocationInputData | undefined>(
    undefined
  );
  const [bannerImage, setBannerImage] = useState(default_banner_image);

  async function saveEventHandler() {
    let event_data: z.infer<typeof Z_NewEventData> = {
      title,
      description,
      date: '',
      time: '',
      location,
      banner_image: bannerImage,
    };
    if (dateTime) {
      const dayjs_date_time = dayjs(dateTime);
      event_data = {
        ...event_data,
        date: dayjs_date_time.format('YYYY-MM-DD'),
        time: dayjs_date_time.format('HH:mm:ss'),
      };
    }
    console.log(event_data);
    try {
      const parsed = Z_NewEventData.parse(event_data);
      console.log('Parsed');
      console.log(parsed);
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <div className={cn('flex gap-4 lg:flex-nowrap', className)}>
      <div id="section-one" className="flex-grow w-3/5 px-4 py-8">
        {/* Banner */}
        <div className="">
          <EventBannerChooser
            imageCloudUploader={uploadImageToCloud}
            onBannerChange={setBannerImage}
          />
        </div>

        {/* Title */}
        <div className="">
          <input
            className={cn(
              'text-center text-lg flex h-9 w-full rounded-md border border-transparent bg-transparent px-3 py-6 transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              'hover:border hover:border-input',
              'focus:ring'
            )}
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title..."
          />
        </div>

        {/* Date and Time */}
        <div className="date-time flex justify-center items-center gap-4">
          <SetDateAndTime
            value={dateTime}
            onDone={(value) => {
              setDateTime(value);
            }}
          />
        </div>

        {/* Description */}
        <div className="">
          <div className="">Description</div>

          <RichTextEditor
            value={description}
            onChange={(val) => setDescription(val)}
          />
        </div>
      </div>
      <div
        id="section-two"
        className="lg:w-2/5 flex-grow flex-shrink px-4 py-8 flex flex-col gap-4"
      >
        <Button onClick={saveEventHandler}>Save Event</Button>
        {/* RSVP Box */}
        <RSVPBox defaultValue="Yes" disabled />

        {/* Location */}
        <div className="p-3 rounded-md border">
          <Label className="" size="md">
            Location
          </Label>

          {location ? (
            <div className="">
              <LocationCard location={location} />
              <Button
                variant={'outline'}
                onClick={() => setLocation(undefined)}
              >
                Change
              </Button>
            </div>
          ) : (
            <LocationInput onSubmit={(data) => setLocation(data)} />
          )}
        </div>
      </div>
    </div>
  );
}

type SetDateAndTimePropType = {
  onDone: (date_time: Date) => void;
  value?: Date | undefined;
};

function SetDateAndTime({ onDone, value }: SetDateAndTimePropType) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<Date | undefined>(undefined);
  return (
    <Popover>
      <PopoverTrigger className="group flex justify-center items-center gap-2">
        {value
          ? dayjs(value).format('DD, MMMM YYYY, h:mm a')
          : 'Set Date and Time'}
        <Pencil1Icon className="hidden group-hover:block" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(dt) => setDate(dt)}
            initialFocus
          />
          <TimePicker12Demo date={time} setDate={setTime} withOutSeconds />
        </div>
        <PopoverClose asChild>
          <Button
            onClick={(e) => {
              const djs_time = dayjs(time);
              const date_time = dayjs(date)
                .hour(djs_time.hour())
                .minute(djs_time.minute());
              console.log(date_time);
              onDone(date_time.toDate());
            }}
          >
            Confirm
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

type LocationInputPropTypes = {
  className?: string;
  onSubmit: (location: UI_LocationInputData) => void;
};

function LocationInput({ className, onSubmit }: LocationInputPropTypes) {
  const [type, setType] = useState<string>('physical');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const [virtualLocation, setVirtualLocation] = useState('');

  const isPhysicalDisabled = () => {
    return type === 'virtual';
  };

  const isVirtualDisabled = () => {
    return type === 'physical';
  };

  async function onSaveHandler() {
    try {
      const data: UI_LocationInputData = {
        type: 'physical',
        physical: null,
        virtual: null,
      };

      if (type === 'physical' || type === 'virtual' || type === 'hybrid') {
        data.type = type;
      } else {
        throw new Error("Invalid input on 'type'!");
      }

      if (type === 'physical' || type === 'hybrid') {
        if (addressLine1 && city && state && country && pincode) {
          data.physical = {
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city,
            state,
            country,
            pincode,
          };
        } else {
          throw new Error(
            'Some of the required inputs for physical lcoation are missing!'
          );
        }
      }

      if (type === 'virtual' || type === 'hybrid') {
        if (virtualLocation) {
          data.virtual = {
            virtual_location: virtualLocation,
          };
        } else {
          throw new Error('Virtual Location input is missing!');
        }
      }

      // TODO: Validation
      onSubmit(data);
    } catch (err) {
      // TODO: Toast message and error handling
      console.log(err);
    }
  }

  return (
    <form className={cn('', className)}>
      <Select onValueChange={(val) => setType(val)} defaultValue="physical">
        <Label size="sm" htmlFor="location-type">
          Location Type
        </Label>

        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent id="location-type">
          <SelectItem value="physical">Physical</SelectItem>
          <SelectItem value="virtual">Virtual</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-4 h-full flex-wrap">
        {/* {PhysicalInput} */}
        <div className={cn(isPhysicalDisabled() ? 'opacity-45' : '')}>
          <div className="">
            <Label size="sm" htmlFor="address-1">
              Address Line 1
            </Label>
            <Input
              id="address-1"
              type="text"
              name="address-1"
              disabled={isPhysicalDisabled()}
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>

          <div className="">
            <Label size="sm" htmlFor="address-2">
              Address Line 2
            </Label>
            <Input
              id="address-2"
              type="text"
              name="address-2"
              disabled={isPhysicalDisabled()}
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>

          <div className="">
            <div className="flex gap-2">
              <div className="flex-grow">
                <Label size="sm" htmlFor="location-city">
                  City
                </Label>
                <Input
                  id="location-city"
                  type="text"
                  name="city"
                  disabled={isPhysicalDisabled()}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="flex-grow">
                <Label size="sm" htmlFor="location-state">
                  State
                </Label>
                <Input
                  id="location-state"
                  type="text"
                  name="state"
                  disabled={isPhysicalDisabled()}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-2/3">
                <Label size="sm" htmlFor="location-country">
                  Country
                </Label>
                <Input
                  id="location-country"
                  type="text"
                  name="country"
                  disabled={isPhysicalDisabled()}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="w-1/3">
                <Label size="sm" htmlFor="location-pincode">
                  Pin
                </Label>
                <Input
                  id="location-pincode"
                  type="text"
                  name="pincode"
                  disabled={isPhysicalDisabled()}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* {VirtualInput} */}
        <div
          className={cn(
            isVirtualDisabled() ? 'opacity-45' : '',
            'flex-1 max-w-[400px]'
          )}
        >
          <div className="">
            <Label size="sm" htmlFor="address-1">
              Virtual Location
            </Label>
            <RichTextEditor
              disabled={isVirtualDisabled()}
              value={virtualLocation}
              onChange={(val) => setVirtualLocation(val)}
            />
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onSaveHandler}
        className="m-3 w-full"
        size={'lg'}
      >
        Save location
      </Button>
    </form>
  );
}
