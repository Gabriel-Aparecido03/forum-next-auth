import { useProfile } from "@/hooks/use-profile";
import { usePublicationView } from "@/hooks/user-publication-view";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui";

interface PublicationHeaderPropsType {
  handleEdit: () => void;
  handleApproveDelete: () => Promise<void>;
  handleCancelDelete: () => void;
}

export function PublicationHeaderProfileAction({
  handleApproveDelete,
  handleCancelDelete,
  handleEdit,
}: PublicationHeaderPropsType) {
  const profile = useProfile();
  const publication = usePublicationView();

  return (
    <div className="flex items-center justify-end flex-1">
      {profile.id === publication.profileId && (
        <>
          <button onClick={handleEdit}>
            <PencilSimple className="w-5 h-5" weight="thin" />
          </button>
          <Dialog>
            <DialogTrigger>
              <TrashSimple className="w-5 h-5  flex" weight="thin" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
                <DialogFooter>
                  <div className="flex items-center justify-center gap-3">
                    <Button onClick={handleApproveDelete} text="Yes,i do" />
                    <Button
                      onClick={handleCancelDelete}
                      text="No,i dont't"
                      variant="secondary"
                    />
                  </div>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
