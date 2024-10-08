import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '@event-flux/utils';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { ControllerRenderProps } from 'react-hook-form';

type DatePickerPropType = {
  field: ControllerRenderProps<any>;
};

export function DatePicker({ field }: DatePickerPropType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !field.value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
