import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

type RSVPBoxPropTypes = {
  defaultValue?: string;
  options?: string[];
  onChange?: (selected: string) => void;
  disabled?: boolean;
};

export default function RSVPBox({
  defaultValue = '',
  onChange = undefined,
  options = ['Yes', 'Maybe', 'No'],
  disabled = false,
}: RSVPBoxPropTypes) {
  const [response, setResponse] = useState(defaultValue);
  useEffect(() => {
    if (onChange) onChange(response);
  }, [onChange, response]);
  return (
    <div className="border rounded-md py-3 flex flex-col gap-4 justify-center items-center">
      <p>Will you be there?</p>
      <ToggleGroup
        type="single"
        className="flex flex-col w-2/3"
        value={response}
        onValueChange={(val) => setResponse(val)}
        disabled={disabled}
      >
        {options.map((option) => {
          return (
            <ToggleGroupItem
              key={option}
              variant={'outline'}
              value={option}
              className="w-full hover:bg-indigo-100 data-[state=on]:bg-indigo-900 data-[state=on]:text-white group"
            >
              {option}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
