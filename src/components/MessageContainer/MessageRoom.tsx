import Button from '../Button';
import DateLine from './DateLine';
import MessageBubble from './MessageBubble';
import NewMessageLine from './NewMessageLine';

const MessageRoom = ({ setIsRoomActive }: { setIsRoomActive: () => void }) => {
  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center p-5 gap-x-5 border-b border-b-primary-gray">
        <button onClick={setIsRoomActive}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
              fill="#333333"
            />
          </svg>
        </button>
        <div className="flex-1">
          <h3 className="text-primary font-bold">
            I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
          </h3>
          <p className="text-primary-dark-gray text-sm">3 Participants</p>
        </div>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#333333"
            />
          </svg>
        </button>
      </div>

      <ul className="px-5 flex flex-col overflow-y-scroll">
        <MessageBubble
          sender="You"
          dateTime="19.32"
          text="No worries. It will be completed ASAP. I’ve asked him yesterday."
        />
        <DateLine dateTime="Today June 09, 2021" />
        <MessageBubble
          sender="Mary Hilda"
          dateTime="19.32"
          text="Hello Obaidullah, I will be your case advisor for case #029290.
                I have assigned some homework for you to fill. Please keep up
                with the due dates. Should you have any questions, you can
                message me anytime. Thanks."
        />
        <MessageBubble
          sender="You"
          dateTime="19.32"
          text="Please contact Mary for questions regarding the case bcs she
          will be managing your forms from now on! Thanks Mary."
        />
        <NewMessageLine />
        <MessageBubble
          sender="Mary Hilda"
          dateTime="19.32"
          text="Sure thing, Claren"
        />
        <MessageBubble
          sender="Obaidullah Amarkhil"
          dateTime="19.32"
          text="Morning. I’ll try to do them. Thanks"
        />
      </ul>

      <div className="mt-auto flex p-5 gap-x-3">
        <input
          type="text"
          className="border border-primary-gray px-4 py-3 rounded-[5px] flex-1"
          placeholder="Type a new message"
        />
        <Button>Send</Button>
      </div>
    </section>
  );
};

export default MessageRoom;
