import { default_banner_image } from '@event-flux/utils';

type EventBannerPropsType = {
  src?: string;
};

export default function EventBanner({ src = '' }: EventBannerPropsType) {
  return (
    <div className=" w-full border rounded-md aspect-[4/1]">
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt="Event banner"
        />
      ) : (
        <div
          style={{
            background: `url('${default_banner_image}')`,
            backgroundSize: 'cover',
          }}
          className="w-full h-full bg-repeat"
        ></div>
      )}
    </div>
  );
}
