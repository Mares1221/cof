import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import qs from "qs";
import { RootState } from "@/store";

export default function EventNowList({
  payload,
  filters,
}: {
  payload: any;
  filters: {
    user: string | undefined;
    excludeUser: string | undefined;
    query: string;
    isEnded: boolean;
  };
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [action, setAction] = useState<[] | [string, any]>(["", null]);

  const { data, mutate } = useSWR(
    `swr.event.list?.[${page}, ${limit}]?${qs.stringify(filters)}.${user?._id}`,
    () =>
      eventsApi.list({
        page: 1,
        limit: 100,
        ...filters,
      }),
    {
      revalidateOnFocus: false,
    },
  );

  if (!data?.rows?.length) return null;

  return (
    <div>
      <div className="space-y-4">
        <span className="text-xl font-semibold">Яг одоо</span>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {payload?.rows?.map((item: any, index: number) => {
            return (
              <EventNowCard
                data={item}
                key={index}
                onAction={(e: string, e2: any) => setAction([e, e2])}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
