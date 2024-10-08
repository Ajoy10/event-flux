import { useEffect, useState } from 'react';
import EventBanner from './event-banner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Button } from '../button';
import { Input } from '../input';
import { default_banner_image } from '@event-flux/utils';

type EventBannerChooserPropType = {
  defaultBannerSrc?: string;
  imageCloudUploader?: (image: File) => Promise<string | undefined>;
  onBannerChange?: (src: string) => void;
};

export default function EventBannerChooser({
  defaultBannerSrc,
  imageCloudUploader,
  onBannerChange,
}: EventBannerChooserPropType) {
  const [currentBannerSrc, setCurrentBannerSrc] = useState(
    defaultBannerSrc || undefined
  );

  const [uploadBannerFile, setUploadBannerFile] = useState<File | undefined>();
  const [uploadedBannerSrc, setUploadedBannerSrc] = useState<
    string | undefined
  >();

  const [uploadWindowOpen, setUploadWindowOpen] = useState(false);

  async function onImageChangeSubmitHandler(e) {
    try {
      if (!uploadBannerFile) {
        throw new Error('Please choose an image!');
      }

      // Upload image to cloudinary
      if (!imageCloudUploader) {
        throw new Error(
          'No image uploader given to event banner chooser! This is a developer error, please contact the developer.'
        );
      }

      const uploaded_url = await imageCloudUploader(uploadBannerFile);

      // Retrieve the url and set it to currentBannerSrc
      setCurrentBannerSrc(uploaded_url);
      // Close image change dialog
      setUploadWindowOpen(false);
    } catch (err) {
      // TODO: Error toast
      console.error(err);
    }
  }

  useEffect(() => {
    if (onBannerChange) {
      onBannerChange(currentBannerSrc || default_banner_image);
    }
  }, [currentBannerSrc, onBannerChange]);

  return (
    <div className=" relative group rounded-md overflow-clip">
      <EventBanner src={currentBannerSrc} />
      <div className="hidden group-hover:flex justify-center items-center absolute w-full h-full top-0 bg-slate-700 bg-opacity-10">
        <Dialog open={uploadWindowOpen} onOpenChange={setUploadWindowOpen}>
          <DialogTrigger asChild>
            <Button>Change</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload banner</DialogTitle>
              <DialogDescription>
                Upload your own banner image. We recommend an image with 4:1
                aspect ratio
              </DialogDescription>
              <div className="flex flex-col gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setUploadBannerFile(e.target.files[0]);
                      const fr = new FileReader();
                      fr.onload = () => {
                        setUploadedBannerSrc(fr.result as string);
                      };
                      fr.readAsDataURL(e.target.files[0]);
                    } else {
                      setUploadedBannerSrc(undefined);
                    }
                  }}
                />
                <EventBanner src={uploadedBannerSrc || undefined} />
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onImageChangeSubmitHandler}>Change</Button>
              <DialogClose asChild>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
