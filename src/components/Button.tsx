export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white rounded-[5px] px-4 py-3"
    >
      {children}
    </button>
  );
}
