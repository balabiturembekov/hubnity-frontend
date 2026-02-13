export interface TeamActivityEntityPeriod {
  startDate: string;
  endDate: string;
}

export interface TeamActivityEntityMemberProjectBreakdown {
  projectId: string;
  projectName: string;
  projectColor: string;
  hours: number;
  earned: number;
}

export interface TeamActivityEntityMember {
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userRole: string;
  hourlyRate: number;
  totalHours: number;
  totalEarned: number;
  activityLevel: string;
  entriesCount: number;
  lastActivity: string;
  projectBreakdown: TeamActivityEntityMemberProjectBreakdown[];
}

export interface TeamActivityEntity {
  period: TeamActivityEntityPeriod;
  totalMembers: number;
  totalHours: number;
  totalEarned: number;
  members: TeamActivityEntityMember[];
}

export enum TeamActivityPeriod {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "7days",
  LAST_30_DAYS = "30days",
  LAST_90_DAYS = "90days",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  THIS_YEAR = "this_year",
}
