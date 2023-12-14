import { createTask, getTasks } from '@/api/tasks';
import TaskLogo from '@/assets/task-logo.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Button from '../Button';
import Loading from '../Loading';
import Popup from '../Popup';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import TaskItem from './TaskItem';

export default function TaskContainer() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery('tasks', getTasks);

  const taskMutation = useMutation(createTask, {
    onSuccess() {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleAddTask = () => {
    taskMutation.mutate({
      body: '',
      title: '',
      isDone: false,
      deadline: new Date(),
    });
  };

  return (
    <Popup logo={<img src={TaskLogo} alt="inbox-logo" />}>
      <section className="py-6 pl-8 pr-4 h-full flex flex-col">
        <div className="flex justify-between mb-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center gap-2 border border-primary-gray rounded-md px-[14px] py-[10px] ml-[85px]">
                <span>My Tasks</span>
                <span>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="expand_more_24px">
                      <path
                        id="icon/navigation/expand_more_24px"
                        d="M14.5979 6.91248L10.7729 10.7291L6.94795 6.91248L5.77295 8.08748L10.7729 13.0875L15.7729 8.08748L14.5979 6.91248Z"
                        fill="#4F4F4F"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[298px] border border-primary-gray">
              <DropdownMenuRadioGroup
              // value={position}
              // onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  value="personal"
                  className="px-[15px] py-3"
                >
                  Personal Errands
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator className="bg-primary-gray" />
                <DropdownMenuRadioItem
                  value="urgent"
                  className="px-[15px] py-3"
                >
                  Urgent To-Do
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAddTask}>New Task</Button>
        </div>

        <ul className="flex-1 overflow-y-scroll pr-4">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <Loading />
            </div>
          ) : (
            tasks?.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </ul>
      </section>
    </Popup>
  );
}
