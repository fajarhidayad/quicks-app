import type { Task } from '@/api/tasks';
import { deleteTask, updateTask } from '@/api/tasks';
import { clsx } from 'clsx';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import DatePicker from './DatePicker';

export default function TaskItem({ task }: { task: Task }) {
  const [title, setTitle] = useState(task.title);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const [isDone, setIsDone] = useState(task.isDone);
  const [expand, setExpand] = useState(!task.isDone);
  const [body, setBody] = useState(task.body);
  const [date, setDate] = useState<Date | undefined>(new Date(task.deadline));

  const queryClient = useQueryClient();
  const deleteTaskMut = useMutation(deleteTask, {
    onSuccess() {
      queryClient.invalidateQueries('tasks');
    },
  });
  const updateTaskMut = useMutation(updateTask, {
    onSuccess() {
      queryClient.invalidateQueries('tasks');
    },
  });

  const deadline = format(new Date(task.deadline), 'dd/MM/yyyy');
  const deadlineDayDistance = formatDistanceToNowStrict(
    new Date(task.deadline),
    { unit: 'day' }
  );

  const handleInputBlur = (
    ref: RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (ref.current && ref.current.value.trim() !== '') {
      if (ref.current instanceof HTMLInputElement) {
        updateTaskMut.mutate({
          id: task.id,
          newTask: { ...task, title: ref.current.value },
        });
      } else {
        updateTaskMut.mutate({
          id: task.id,
          newTask: { ...task, body: ref.current.value },
        });
      }
    }
  };

  useEffect(() => {
    if (date && date !== task.deadline) {
      updateTaskMut.mutate({
        id: task.id,
        newTask: {
          ...task,
          deadline: new Date(date),
        },
      });
    }
  }, [date]);

  return (
    <li className="py-[16px] first:pt-0 border-b border-b-primary-gray flex gap-x-[22.5px] items-start">
      <div className="flex relative mt-4">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() =>
            setIsDone((prevVal) => {
              updateTaskMut.mutate({
                id: task.id,
                newTask: { ...task, isDone: !prevVal },
              });
              return !prevVal;
            })
          }
          className="relative peer appearance-none w-[18px] h-[18px] rounded-sm border-2 border-primary-gray bg-none"
        />
        <svg
          className="absolute w-4 h-4 mt-[2px] ml-[1px] hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#828282"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex mb-4 items-center">
          <input
            type="text"
            value={title}
            placeholder="Type task title"
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
            onBlur={() => handleInputBlur(titleRef)}
            className={clsx({
              'font-bold mr-auto border border-transparent focus:border-primary-gray focus:outline-none rounded px-4 py-3':
                true,
              'text-primary-gray line-through': isDone,
              'text-primary-dark-gray': !isDone,
            })}
          />
          <p className="text-indicator-red text-sm mr-5">
            {deadlineDayDistance} left
          </p>
          <p className="text-sm text-primary-dark-gray mr-[10px]">{deadline}</p>
          <button
            onClick={() => setExpand(!expand)}
            className={clsx({
              'mr-4 transition-all duration-500': true,
              'rotate-180': !expand,
            })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="expand_more_24px">
                <path
                  id="icon/navigation/expand_more_24px"
                  d="M6.175 13.0875L10 9.27083L13.825 13.0875L15 11.9125L10 6.9125L5 11.9125L6.175 13.0875Z"
                  fill="#4F4F4F"
                />
              </g>
            </svg>
          </button>
          <Popover>
            <PopoverTrigger>
              <button>
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
            </PopoverTrigger>
            <PopoverContent className="border border-primary-gray rounded text-indicator-red px-3 py-2 w-[128px] right-0">
              <button onClick={() => deleteTaskMut.mutate(task.id)}>
                Delete
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div
          className={clsx({
            'overflow-hidden transition-all duration-200 ease-out': true,
            'max-h-0 opacity-0': !expand,
            'max-h-28 opacity-100': expand,
          })}
        >
          <div className="flex gap-x-[18px] items-center mb-3">
            <label htmlFor="date">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="schedule_24px">
                  <path
                    id="icon/action/schedule_24px"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.99181 1.66663C5.39181 1.66663 1.66681 5.39996 1.66681 9.99996C1.66681 14.6 5.39181 18.3333 9.99181 18.3333C14.6001 18.3333 18.3335 14.6 18.3335 9.99996C18.3335 5.39996 14.6001 1.66663 9.99181 1.66663ZM10.0003 16.6666C6.31697 16.6666 3.33364 13.6833 3.33364 9.99996C3.33364 6.31662 6.31697 3.33329 10.0003 3.33329C13.6836 3.33329 16.667 6.31662 16.667 9.99996C16.667 13.6833 13.6836 16.6666 10.0003 16.6666ZM9.16681 5.83329H10.4168V10.2083L14.1668 12.4333L13.5418 13.4583L9.16681 10.8333V5.83329Z"
                    fill="#2F80ED"
                  />
                </g>
              </svg>
            </label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="flex gap-x-[23px] items-start text-primary-dark-gray">
            <label htmlFor="note" className="pt-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2165 0C12.0082 0 11.7915 0.0833333 11.6332 0.241667L10.1082 1.76667L13.2332 4.89167L14.7582 3.36667C15.0832 3.04167 15.0832 2.51667 14.7582 2.19167L12.8082 0.241667C12.6415 0.075 12.4332 0 12.2165 0ZM9.21667 5.01667L9.98333 5.78333L2.43333 13.3333H1.66667V12.5667L9.21667 5.01667ZM0 11.875L9.21667 2.65833L12.3417 5.78333L3.125 15H0V11.875Z"
                  fill={body ? '#2F80ED' : '#4F4F4F'}
                />
              </svg>
            </label>
            <textarea
              name="note"
              id="note"
              rows={1}
              value={body}
              ref={bodyRef}
              onBlur={() => handleInputBlur(bodyRef)}
              onChange={(e) => setBody(e.target.value)}
              placeholder="No description"
              className="flex-1 focus:outline-primary-gray p-3 h-fit rounded-sm resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </li>
  );
}
