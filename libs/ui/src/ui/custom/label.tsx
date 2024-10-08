import { cn } from '@event-flux/utils';

interface LabelPropType
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  size?: 'sm' | 'md' | 'lg';
}

export default function Label({
  size = 'md',
  className = '',
  ...rest
}: LabelPropType) {
  return (
    <label
      {...rest}
      className={cn(
        `mb-[0.2em] inline-block text-${size === 'md' ? 'base' : size} `,
        className
      )}
    >
      {rest.children}
    </label>
  );
}
