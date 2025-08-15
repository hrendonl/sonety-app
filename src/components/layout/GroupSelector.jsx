import { useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";
import GroupAvatar from "./GroupAvatar";
import { getUserGroups } from "../../api/groupApi";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { NavLink } from "react-router-dom";

export default function GroupSelector() {
  const { user, groupSelected, setApp } = useContext(AppContext);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getUserGroups(user.id).then((res) => res.data),
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-col items-center space-y-4 bg-app-surface border-r border-r-app-border p-3">
      {data?.list.map((group) => (
        <div key={group.id} className="relative">
          {groupSelected.id === group.id && (
            <div
              className="absolute -left-3 top-0 h-full w-1 rounded-full bg-app-accent"
              aria-hidden="true"
            />
          )}

          <NavLink
            onClick={() => setApp("SET_GROUP_SELECTED", group)}
            to={`/groups/${group.name.replaceAll(" ", "-")}/songs`}
            title={group.name}
          >
            <div
              className={`
                h-10 w-10 shrink-0 overflow-hidden rounded-xl
              bg-gray-700 transition-all duration-200
              ${groupSelected.id === group.id ? "border-2 border-app-accent" : "border-2 border-app-button-bg"}
              `}
            >
              <GroupAvatar group={group} />
            </div>
          </NavLink>
        </div>
      ))}
      <div className="h-px w-8 bg-gray-700" />

      <button
        className="flex h-10 w-10 shrink-0 items-center justify-center  bg-app-surface-hover text-white transition-all duration-200 rounded-xl hover:bg-app-button-bg"
        title="Añadir un grupo"
      >
        <MdAdd size={30} />
      </button>
    </div>
  );
}
