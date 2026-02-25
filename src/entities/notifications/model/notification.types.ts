export type NotificationType =
  | "TIME_ENTRY_APPROVED"
  | "TIME_ENTRY_PENDING_APPROVAL"
  | "";

interface NotificationMetadata {
  userId: string;
  userName: string;
  projectId: string;
  projectName: string;
  timeEntryId: string;
}

export interface NotificationEntity {
  id: string;
  userId: string;
  companyId: string;
  type: NotificationType;
  title: string;
  message: string;
  readAt: string;
  metadata: NotificationMetadata;
  createdAt: string;
}

export interface GetAllNotificationsRes {
  items: NotificationEntity[];
  total: number;
  limit: number;
  offset: number;
}

export interface GetAllNotificationsReq {
  unreadOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface GetUnreadCountRes {
  count: number;
}

export interface MarkAsReadAllReq {
  ids: string[];
}

export interface MarkAsReadAllRes {
  updatedCount: number;
}
