import { Card, CardContent } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { SettingsSectionDescription } from "./settings-section-description";

export const AppsURLsSettingsForm = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-y-4 gap-x-8 my-3">
          <SettingsSectionDescription
            title="Track apps & URLs"
            subTitle="Control whether the names of apps used and the URLs visited are tracked when using Hubnity Desktop app"
            className="col-span-3"
          />

          <div className="col-span-3 xl:col-span-2 xl:col-start-4 place-self-end flex flex-col sm:flex-row items-end gap-3 w-full xl:w-full">
            <Tabs defaultValue="apps-url" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="off">Off</TabsTrigger>
                <TabsTrigger value="apps">Apps</TabsTrigger>
                <TabsTrigger value="apps-url">Apps & URLs</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
