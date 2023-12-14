import { useState } from 'react';

interface MessageItemProps {
  onClick: () => void;
  title: string;
  sender: string;
  date: string;
  content: string;
}

export default function MessageItem(props: MessageItemProps) {
  const [isRead, setIsRead] = useState(false);

  const handleClickMessage = () => {
    setIsRead(true);
    props.onClick();
  };

  return (
    <li
      className="py-[22px] border-b border-b-primary-gray last:border-b-0 flex cursor-pointer"
      onClick={handleClickMessage}
    >
      <div className="flex">
        <figure className="bg-primary-light-gray w-[34px] h-[34px] rounded-full flex justify-center items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6666 0.745087C10.6366 0.745087 7.37249 4.0092 7.37249 8.0392C7.37249 12.0692 10.6366 15.3333 14.6666 15.3333C18.6966 15.3333 21.9607 12.0692 21.9607 8.0392C21.9607 4.0092 18.6966 0.745087 14.6666 0.745087ZM18.3137 8.0392C18.3137 6.03332 16.6725 4.39215 14.6666 4.39215C12.6607 4.39215 11.0195 6.03332 11.0195 8.0392C11.0195 10.0451 12.6607 11.6863 14.6666 11.6863C16.6725 11.6863 18.3137 10.0451 18.3137 8.0392ZM25.6078 26.2745C25.2431 24.9798 19.5901 22.6274 14.6666 22.6274C9.76131 22.6274 4.14484 24.9616 3.72543 26.2745H25.6078ZM0.0783691 26.2745C0.0783691 21.4239 9.79778 18.9804 14.6666 18.9804C19.5354 18.9804 29.2548 21.4239 29.2548 26.2745V29.9216H0.0783691V26.2745Z"
              fill="#4F4F4F"
            />
          </svg>
        </figure>
        <figure className="bg-primary w-[34px] h-[34px] rounded-full translate-x-[-17px] flex justify-center items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6666 0.745087C10.6366 0.745087 7.37249 4.0092 7.37249 8.0392C7.37249 12.0692 10.6366 15.3333 14.6666 15.3333C18.6966 15.3333 21.9607 12.0692 21.9607 8.0392C21.9607 4.0092 18.6966 0.745087 14.6666 0.745087ZM18.3137 8.0392C18.3137 6.03332 16.6725 4.39215 14.6666 4.39215C12.6607 4.39215 11.0195 6.03332 11.0195 8.0392C11.0195 10.0451 12.6607 11.6863 14.6666 11.6863C16.6725 11.6863 18.3137 10.0451 18.3137 8.0392ZM25.6078 26.2745C25.2431 24.9798 19.5901 22.6274 14.6666 22.6274C9.76131 22.6274 4.14484 24.9616 3.72543 26.2745H25.6078ZM0.0783691 26.2745C0.0783691 21.4239 9.79778 18.9804 14.6666 18.9804C19.5354 18.9804 29.2548 21.4239 29.2548 26.2745V29.9216H0.0783691V26.2745Z"
              fill="white"
            />
          </svg>
        </figure>
      </div>
      <div className="flex-1 text-primary-dark-gray">
        <div className="flex items-baseline gap-x-4">
          <h3 className="text-primary font-bold">{props.title}</h3>
          <p className="flex-shrink-0 text-sm">{props.date}</p>
        </div>
        <h4 className="text-primary-dark-gray font-bold text-sm">
          {props.sender}:
        </h4>
        <p>{props.content}</p>
      </div>
      {!isRead && (
        <span className="bg-indicator-red rounded-full w-[10px] h-[10px] self-center"></span>
      )}
    </li>
  );
}
