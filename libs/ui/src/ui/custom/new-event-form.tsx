import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Z_NewEventData } from '@event-flux/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { AutosizeTextarea } from '../textarea-auto-resize';
import { DatePicker } from './datepicker';
import { TimePicker12Demo } from '../timepicker/time-picker-12h';

export default function NewEventForm() {
  const form = useForm<z.infer<typeof Z_NewEventData>>({
    resolver: zodResolver(Z_NewEventData),
    defaultValues: {
      title: 'New event',
      description: '',
    },
  });

  const fileRef = form.register('bannerImage'); // banenrImage should have custom input

  function onSubmitHandler(values: z.infer<typeof Z_NewEventData>) {
    console.log(values);
  }
  return (
    <div className="new-event-form">
      <h1>Create new event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          {/* Banner Image? */}
          <div className="">
            <FormLabel>Banner Image</FormLabel>
            <Input type="file" placeholder="Upload banner image" {...fileRef} />
          </div>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title..." {...field} />
                  </FormControl>
                  <FormDescription>This is your event's title</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event description</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="Enter event description..."
                      {...field}
                      className="min-h-[200px]"
                      minHeight={200}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your event's description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event date</FormLabel>
                  <br />
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormDescription>This is your event's date</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event time</FormLabel>
                  <FormControl>
                    <TimePicker12Demo
                      date={new Date(field.value)}
                      setDate={(date) =>
                        field.onChange(date?.getTime() || new Date())
                      }
                      withOutSeconds
                    />
                  </FormControl>
                  <FormDescription>This is your event's time</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Location? */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your event's location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
}
