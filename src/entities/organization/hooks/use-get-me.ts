import { useGetCurrentUserQuery } from "@/entities/user";
import { useGetMembersQuery } from "../model/queries/use-get-members.query";

export const useGetMe = () => {
  const { data: members } = useGetMembersQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const me 
};
