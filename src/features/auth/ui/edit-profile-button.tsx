"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { ProfileEditDialog } from "@/features/auth";
import { Button } from "@/shared/ui/button";

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
