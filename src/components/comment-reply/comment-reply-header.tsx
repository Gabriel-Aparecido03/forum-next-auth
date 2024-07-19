import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { deleteCommentReply } from "@/services/comment-reply/delete-reply-comment-reply";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { DateShow } from "../date-show";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";

interface CommentHeader {
  username: string;
  createdAt: Date;
  profileId: string;
  commentReplyId: string;
  handleEdit: () => void;
  commentId: string;
}

export function CommentReplyHeader({
  createdAt,
  username,
  profileId,
  commentReplyId,
  handleEdit,
  commentId,
}: CommentHeader) {
  const profile = useProfile();

  const { toast } = useToast();

  async function handleDelete() {
    const res = await deleteCommentReply({ commentReplyId });
    if (res.status === 204) {
      queryClient.refetchQueries({ queryKey: [`comment-${commentId}-reply`] });
      toast({
        title: "Comment deleted with success!",
        variant: "success",
      });
    }
  }

  return (
    <div className="flex items-start justify-start w-full gap-2">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col items-start justify-start">
          <Link href={username === profile.username ? `/app/profile/me` : `/app/profile/${username}`} className="text-base text-zinc-800 font-bold">{username}</Link>
          <DateShow createdAt={createdAt} />
        </div>
        {profile.id && (
          <div className="flex items-center justify-end">
            {profile.id === profileId && (
              <>
                <button onClick={handleEdit}>
                  <PencilSimple className="w-4 h-4" weight="thin" />
                </button>
                <Dialog>
                  <DialogTrigger>
                    <TrashSimple className="w-4 h-4 flex" weight="thin" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                      <DialogFooter>
                        <div className="flex items-center justify-center gap-3">
                          <Button text="Yes,i do" onClick={handleDelete} />
                          <Button text="No,i dont't" variant="secondary" />
                        </div>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
