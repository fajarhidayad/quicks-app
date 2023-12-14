export default function DateLine({ dateTime }: { dateTime: string }) {
  return (
    <li className="flex items-center justify-between mt-6 mb-2 gap-7">
      <hr className="border-b border-b-primary-gray w-full" />
      <p className="text-primary-dark-gray flex-shrink-0">{dateTime}</p>
      <hr className="border-b border-b-primary-gray w-full" />
    </li>
  );
}
