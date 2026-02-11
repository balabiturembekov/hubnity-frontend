// export const getProjectHours = (projectId: string) => {
//   const entries = (
//     timeEntries && Array.isArray(timeEntries) ? timeEntries : []
//   ).filter((e) => e.projectId === projectId);
//   const totalSeconds = entries.reduce((sum, e) => {
//     if (e.status === "stopped" || e.status === "paused") {
//       return sum + (e.duration || 0);
//     } else if (e.status === "running") {
//       return sum + (e.duration || 0);
//     }
//     return sum;
//   }, 0);
//   return totalSeconds / 3600;
// };
