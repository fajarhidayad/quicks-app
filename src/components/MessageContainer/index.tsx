import { getPosts } from '@/api/posts';
import InboxLogo from '@/assets/inbox-logo.svg';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import Popup from '../Popup';
import SearchBar from '../SearchBar';
import MessageItem from './MessageItem';
import MessageRoom from './MessageRoom';

export default function MessageContainer() {
  const [isRoomActive, setIsRoomActive] = useState(false);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery('posts', () => getPosts({ limit: 10 }));

  return (
    <Popup logo={<img src={InboxLogo} alt="inbox-logo" />}>
      {isRoomActive ? (
        <MessageRoom setIsRoomActive={() => setIsRoomActive(false)} />
      ) : (
        <section className="py-6 h-full flex flex-col">
          <div className="px-8">
            <SearchBar />
          </div>
          {isError && (
            <div>
              <p className="text-sm text-indicator-red">There's an error</p>
            </div>
          )}
          {isLoading ? (
            <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
              <Loading />
              <p className="text-sm text-primary-gray">Loading Chats...</p>
            </div>
          ) : (
            <ul className="my-1 overflow-y-scroll flex-1 px-8">
              <MessageItem
                onClick={() => setIsRoomActive(true)}
                sender="Cameron Philips"
                content="Hey, please read."
                title="109220-Naturalization"
                date={'January 1, 2021 19:10'}
              />
              {posts &&
                posts.data.map((post) => (
                  <MessageItem
                    key={post.id}
                    content={post.text}
                    date={formatDate(new Date(post.publishDate))}
                    onClick={() => setIsRoomActive(true)}
                    sender={post.owner.firstName + post.owner.lastName}
                    title={post.owner.title}
                  />
                ))}
            </ul>
          )}
        </section>
      )}
    </Popup>
  );
}
