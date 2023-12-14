const NewMessageLine = () => {
  return (
    <li className="flex items-center justify-between mt-6 mb-2 gap-7">
      <hr className="border-b border-b-indicator-red w-full" />
      <p className="text-indicator-red flex-shrink-0">New Message &darr;</p>
      <hr className="border-b border-b-indicator-red w-full" />
    </li>
  );
};

export default NewMessageLine;
