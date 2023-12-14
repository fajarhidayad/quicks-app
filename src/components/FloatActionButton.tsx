import { clsx } from 'clsx';

interface FloatActionButtonProps {
  children: React.ReactNode;
  bgColor: 'primary' | 'white';
  onClick?: () => void;
  isActive: boolean;
  activeBg?: boolean;
}

export default function FloatActionButton({
  onClick,
  bgColor,
  children,
  isActive,
  activeBg = true,
}: FloatActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx({
        'bg-primary text-white hover:bg-primary/70': bgColor === 'primary',
        'bg-white hover:bg-white/80': bgColor === 'white',
        'relative rounded-full transition-all duration-200 flex items-center justify-center':
          true,
        'w-[60px] h-[60px]': !isActive,
        'w-[68px] h-[68px]': isActive,
      })}
    >
      <div
        className={clsx({
          'bg-primary-dark-gray h-[68px] w-[68px] rounded-full absolute -z-10 -translate-x-4 transition-all duration-200':
            activeBg && isActive,
        })}
      ></div>
      {children}
    </button>
  );
}
