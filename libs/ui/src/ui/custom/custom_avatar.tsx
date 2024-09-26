import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

interface PropType {
  src?: string;
  fallback: string | undefined;
}

export default function CustomAvatar(props: PropType) {
  return (
    <Avatar>
      <AvatarImage src={props?.src || undefined} />
      <AvatarFallback>{props.fallback}</AvatarFallback>
    </Avatar>
  );
}
