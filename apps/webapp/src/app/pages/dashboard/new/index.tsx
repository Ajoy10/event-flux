import NewEventModernForm from '@event-flux/ui/custom/new-event-modern-form';
import NewEventForm from '@event-flux/ui/custom/new-event-form';
import { uploadImageToCloudinary } from '../../../services/image_services';

export default function NewEvent() {
  return (
    <div>
      <NewEventModernForm
        className=""
        uploadImageToCloud={uploadImageToCloudinary}
      />
    </div>
  );
}
