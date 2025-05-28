import { Home, Users, Paperclip, Link, DollarSign, LucideIcon } from "lucide-react";


export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={Home} selected={true} title="Dashboard" />
      <Route Icon={Users} selected={false} title="Team" />
      <Route Icon={Paperclip} selected={false} title="Invoices" />
      <Route Icon={Link} selected={false} title="Integrations" />
      <Route Icon={DollarSign} selected={false} title="Finance" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: LucideIcon;
  title: string;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
