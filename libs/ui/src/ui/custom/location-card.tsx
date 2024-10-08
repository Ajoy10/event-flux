import { UI_LocationInputData } from 'types/ui';
import Label from './label';
import { Separator } from '../separator';
import { GlobeIcon, LaptopIcon } from '@radix-ui/react-icons';

type LocationCardPropTypes = {
  location: UI_LocationInputData;
};

export default function LocationCard({ location }: LocationCardPropTypes) {
  function locationDataAsHTML() {
    return (
      <div className="location flex gap-4">
        {location.type !== 'virtual' && (
          <div>
            <Label
              size="sm"
              className="opacity-70 flex gap-2 items-center justify-left"
            >
              <GlobeIcon />
              Physical location
            </Label>
            <p>{location.physical === null && 'No physical location!'}</p>
            <p>{location.physical?.address_line_1}</p>
            <p>{location.physical?.address_line_2}</p>
            <p>
              {location.physical?.city}, {location?.physical?.state},{' '}
              {location?.physical?.country}
            </p>
            <p>Pincode: {location?.physical?.pincode}</p>
          </div>
        )}
        {location.type !== 'physical' && (
          <div>
            <Label
              size="sm"
              className="opacity-70 flex gap-2 items-center justify-left"
            >
              <LaptopIcon />
              Virtual location
            </Label>
            <p>{location.virtual === null && 'No virtual location!'}</p>
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: location.virtual?.virtual_location || '',
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="">
      <div className="">{locationDataAsHTML()}</div>
    </div>
  );
}
