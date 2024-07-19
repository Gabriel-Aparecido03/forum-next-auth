"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ViewerMarkdown,
} from "@/components/ui";
import { useProfileView } from "@/hooks/use-profile-view";
import { PublicationOfProfile } from "./publication-of-profile";

export function ProfileSwitchter() {

  const { description } = useProfileView()

  return (
    <div className="mt-5 w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">
            Description
          </TabsTrigger>
          <TabsTrigger value="publication">
            Publications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ViewerMarkdown value={description ?? ""} />
        </TabsContent>
        <TabsContent value="publication">
          <PublicationOfProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
}
