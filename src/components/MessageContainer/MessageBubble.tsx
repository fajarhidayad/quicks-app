import { clsx } from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const MessageBubble = ({
  dateTime,
  sender,
  text,
}: {
  sender: string;
  text: string;
  dateTime: string;
}) => {
  return (
    <li
      className={clsx({
        'my-1 w-fit text-sm max-w-[80%]': true,
        'self-end': sender === 'You',
      })}
    >
      <h3
        className={clsx({
          'font-bold': true,
          'text-indicator-purple text-end': sender === 'You',
          'text-indicator-orange': sender !== 'You',
        })}
      >
        {sender}
      </h3>
      <div
        className={clsx({
          'flex items-start gap-x-2': true,
          'flex-row-reverse': sender !== 'You',
        })}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="mt-2">
              <svg
                width="14"
                height="4"
                viewBox="0 0 14 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z"
                  fill="#828282"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[126px] rounded-md bg-white border border-[#BDBDBD]">
            <DropdownMenuItem className="px-[18px] py-3">
              <span className="text-primary">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#BDBDBD]" />
            <DropdownMenuItem className="px-[18px] py-3">
              <span className="text-indicator-red">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          className={clsx({
            'p-[10px] rounded-[5px] text-primary-dark-gray': true,
            'bg-stickers-7': sender === 'You',
            'bg-stickers-3': sender !== 'You',
          })}
        >
          <p className="mb-2">{text}</p>
          <p>{dateTime}</p>
        </div>
      </div>
    </li>
  );
};

export default MessageBubble;
