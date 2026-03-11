import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import {
  OrganizationDetailsTabContent,
  SecurityLoginTabContent,
} from "@/widgets/settings";

export default function OrganizationSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Organization settings"
        subTitle="Configure company details, authentication, workflows and role permissions"
      />

      <div className="p-2 md:p-6">
        <Tabs defaultValue="information">
          <TabsList>
            <TabsTrigger value="information">Company information</TabsTrigger>
            <TabsTrigger value="security-login">Security & Log in</TabsTrigger>
            <TabsTrigger value="projects-todos">Projects & To-dos</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <OrganizationDetailsTabContent />
          </TabsContent>
          <TabsContent value="security-login">
            <SecurityLoginTabContent />
          </TabsContent>
          <TabsContent value="projects-todos">
            <OrganizationDetailsTabContent />
          </TabsContent>
          <TabsContent value="permissions">
            <SecurityLoginTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
