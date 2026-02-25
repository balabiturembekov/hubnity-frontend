import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { ProfileEditDialog } from "./change-profile-dialog";

export const EditProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <Edit className="h-4 w-4" />
        Edit Profile
      </Button>

      <ProfileEditDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
