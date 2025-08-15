export default function GroupAvatar({ group }) {
  if (group.image != "string") {
    return (
      <img
        src={group.image}
        alt={group.name}
        className="w-full h-full object-cover"
      />
    );
  }
  const initials = group.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  return (
    <div className="w-full h-full bg-app-button-bg flex items-center justify-center">
      <span className="font-bold text-white">{initials}</span>
    </div>
  );
}
