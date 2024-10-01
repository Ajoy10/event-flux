import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

interface PropType {
  src?: string;
  fallback: string | undefined;
  // ...rest
  [x: string]: unknown;
}

export default function CustomAvatar(props: PropType) {
  return (
    <Avatar {...props}>
      <AvatarImage src={props?.src || undefined} referrerPolicy="no-referrer" />
      <AvatarFallback>{props.fallback}</AvatarFallback>
    </Avatar>
  );
}
