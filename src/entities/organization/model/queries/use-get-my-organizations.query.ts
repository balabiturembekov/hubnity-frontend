import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { organizationService } from "../../api/organization.service";

export const useGetMyOrganizationsQuery = () =>
  useQuery({
    queryKey: ["my-organizations"],
    queryFn: () => organizationService.getMyOrganizations(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!Cookies.get("access_token"),
  });
