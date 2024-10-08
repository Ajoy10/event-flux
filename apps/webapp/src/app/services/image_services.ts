import axios from 'axios';

export async function uploadImageToCloudinary(
  image: File
): Promise<string | undefined> {
  // Since this is a 3rd party request, we are using the default axios instance rather than the custom one
  const UPLOAD_PRESET = import.meta.env
    .VITE_REACT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const URL = import.meta.env.VITE_REACT_PUBLIC_CLOUDINARY_URL;

  console.log('image_services.ts: UP: ' + UPLOAD_PRESET + ', URL: ' + URL);

  if (!UPLOAD_PRESET || !URL)
    throw new Error('Cloudinary configurations could not be found from env!');

  try {
    const form_data = new FormData();

    // TODO: Add the username to file_name to avoid overriding other users files with the same file name
    //   image.name +=

    form_data.append('file', image);
    form_data.append('upload_preset', UPLOAD_PRESET);

    const res = await axios.post(URL, form_data);
    if (!res.data.secure_url)
      throw new Error('Could not fetch secure_url from upload, try again!');
    return res.data.secure_url;
  } catch (err) {
    console.error('Unexpected error during file upload to cloudinary');
    console.error(err);
  }
}
