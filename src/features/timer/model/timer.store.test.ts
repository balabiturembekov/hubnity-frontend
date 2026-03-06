import type { TimeEntryEntity } from "@/entities/time-entry";
import { useTimerStore } from "./timer.store";

describe("useTimerStore", () => {
  beforeEach(() =>
    useTimerStore.setState({
      status: "IDLE",
      activeEntryId: null,
      projectId: "none",
      isLoading: false,
    }),
  );

  it("setFromEntry sets status, activeEntryId and projectId from entry", () => {
    const { setFromEntry } = useTimerStore.getState();

    setFromEntry({
      id: "1",
      projectId: "1",
      status: "RUNNING",
    } as Partial<TimeEntryEntity> as TimeEntryEntity);

    const state = useTimerStore.getState();

    expect(state.status).toBe("RUNNING");
    expect(state.activeEntryId).toBe("1");
    expect(state.projectId).toBe("1");
  });

  it("setFromEntry with null resets to initial state", () => {
    useTimerStore.setState({
      status: "RUNNING",
      activeEntryId: "entry-1",
      projectId: "project-1",
      isLoading: true,
    });

    const { setFromEntry } = useTimerStore.getState();

    setFromEntry(null);

    const state = useTimerStore.getState();

    expect(state.status).toBe("IDLE");
    expect(state.activeEntryId).toBe(null);
    expect(state.projectId).toBe("none");
    expect(state.isLoading).toBe(false);
  });

  it('setFromEntry uses "none" when entry has no projectId', () => {
    const { setFromEntry } = useTimerStore.getState();

    setFromEntry({
      id: "1",
      status: "RUNNING",
      projectId: null,
    } as Partial<TimeEntryEntity> as TimeEntryEntity);

    const state = useTimerStore.getState();

    expect(state.projectId).toBe("none");
  });

  it("reset preserves projectId", () => {
    useTimerStore.setState({
      status: "RUNNING",
      activeEntryId: "entry-1",
      projectId: "project-123",
      isLoading: true,
    });

    const { reset } = useTimerStore.getState();

    reset();

    const state = useTimerStore.getState();

    expect(state.status).toBe("IDLE");
    expect(state.activeEntryId).toBe(null);
    expect(state.projectId).toBe("project-123");
    expect(state.isLoading).toBe(false);
  });

  it("setProjectId sets projectId", () => {
    const { setProjectId } = useTimerStore.getState();

    setProjectId("project-123");

    const { projectId } = useTimerStore.getState();

    expect(projectId).toBe("project-123");
  });

  it("setLoading sets isLoading", () => {
    const { setLoading } = useTimerStore.getState();

    setLoading(true);

    const { isLoading } = useTimerStore.getState();

    expect(isLoading).toBe(true);
  });
});
