import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="border border-primary-gray rounded-sm p-3 w-[193px] text-sm text-primary-gray flex justify-between items-center">
          <span>{date ? format(date, 'dd/MM/yyyy') : 'Set Date'}</span>
          <Calendar size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="border rounded p-5 w-[258px] flex justify-center items-center">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          components={{ Caption: CustomCaption }}
          className="w-full"
          disabled={{ before: new Date() }}
          styles={{ table: { width: '100%' }, button: { padding: '2px 5px' } }}
          modifiersClassNames={{
            selected: 'border border-primary rounded-full',
            disabled: 'text-primary-light-gray',
          }}
          required
        />
      </PopoverContent>
    </Popover>
  );
}

const CustomCaption = (props: CaptionProps) => {
  const { nextMonth, previousMonth, goToMonth } = useNavigation();
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <ChevronLeft size={12} />
      </button>
      <span className="text-xs font-bold">
        {format(props.displayMonth, 'MMMM yyyy')}
      </span>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ChevronRight size={12} />
      </button>
    </div>
  );
};
