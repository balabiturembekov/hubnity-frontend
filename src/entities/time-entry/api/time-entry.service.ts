import type {
  CreateTimeEntryReq,
  TimeEntryEntity,
  UpdateTimeEntryReq,
} from "@/entities/time-entry/model/time-entry.types";
import { api } from "@/shared/config/api";

class TimeEntryService {
  async getTimeEntries() {
    const res = await api.get<TimeEntryEntity[]>("/time-entries");
    return res.data;
  }

  async getTimeEntryDetails(id: string) {
    const res = await api.get<TimeEntryEntity>(`/time-entries/${id}`);
    return res.data;
  }

  async createTimeEntry(payload: CreateTimeEntryReq) {
    const res = await api.post<TimeEntryEntity>("/time-entries", payload);
    return res.data;
  }

  async updateTimeEntry(id: string, payload: UpdateTimeEntryReq) {
    const res = await api.patch<TimeEntryEntity>(
      `/time-entries/${id}`,
      payload,
    );
    return res.data;
  }

  async deleteTimeEntry(id: string) {
    await api.delete(`/time-entries/${id}`);
  }
}

export const timeEntryService = new TimeEntryService();
