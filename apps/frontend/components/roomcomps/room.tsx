const Tab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium ${
      active ? "bg-black text-white" : "bg-gray-200 text-gray-800"
    } transition-all`}
  >
    {label}
  </button>
);

export default Tab;