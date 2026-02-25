"use client";

import {
  useGetUnreadNotificationsCount,
  useMarkAllNotificationsAsReadMutation,
} from "@/entities/notifications";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { NotificationList } from "@/widgets/notification/ui/notification-list";

export const NotificationPopoverContent = () => {
  const { data: notificationsCount } = useGetUnreadNotificationsCount();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsReadMutation();

  return (
    <div className="flex items-center justify-between pt-5">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mx-5">
          <TabsList>
            <TabsTrigger value="all" className="w-32">
              View all
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread {!!notificationsCount && `(${notificationsCount.count})`}
            </TabsTrigger>
          </TabsList>

          {!!notificationsCount?.count && (
            <Button variant="ghost" onClick={() => markAllAsRead()}>
              Mark all as read
            </Button>
          )}
        </div>
        <TabsContent
          value="all"
          className="max-h-130 overflow-y-auto mt-5 flex flex-col gap-5 px-5"
        >
          <NotificationList />
        </TabsContent>

        <TabsContent
          value="unread"
          className="max-h-130 overflow-y-auto mt-5 flex flex-col gap-5 px-5"
        >
          <NotificationList unreadOnly />
        </TabsContent>
      </Tabs>
    </div>
  );
};
