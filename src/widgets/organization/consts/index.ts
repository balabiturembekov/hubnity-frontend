type StepType = {
  id: string;
  title: string;
  subTitle: string;
};

export const createOrganizationSteps: StepType[] = [
  {
    id: "1",
    title: "Create organization",
    subTitle:
      "Set up your organization by providing its name, type, and basic company information.",
  },
  {
    id: "2",
    title: "Invite team members",
    subTitle:
      "Add colleagues to your organization and assign roles to control access levels.",
  },
  {
    id: "3",
    title: "Configure workspace",
    subTitle:
      "Adjust organization settings, permissions, and preferences to match your workflow.",
  },
];
