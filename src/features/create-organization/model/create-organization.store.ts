import { create } from "zustand";
import type { CreateOrganizationStep1FormValues } from "./create-organization.schema";

interface CreateOrganizationState {
  step1: Partial<CreateOrganizationStep1FormValues> | null;
  isStep1Valid: boolean;

  setStep1: (data: Partial<CreateOrganizationStep1FormValues> | null) => void;
  setStep1Valid: (valid: boolean) => void;
  reset: () => void;
}

const initialState = {
  step1: null,
  isStep1Valid: false,
};

export const useCreateOrganizationStore = create<CreateOrganizationState>(
  (set) => ({
    ...initialState,

    setStep1: (data) => set({ step1: data }),
    setStep1Valid: (valid) => set({ isStep1Valid: valid }),
    reset: () => set(initialState),
  }),
);
