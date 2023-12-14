import { useState } from 'react';
import FloatActionButton from './FloatActionButton';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function Popup({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo: React.ReactNode;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <FloatActionButton isActive={popoverOpen} bgColor="white">
          {logo}
        </FloatActionButton>
      </PopoverTrigger>
      <PopoverContent
        className="w-[734px] h-[734px] bg-white mb-4 p-0"
        align="end"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
