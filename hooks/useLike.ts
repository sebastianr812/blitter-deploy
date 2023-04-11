import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();

    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || []

        return list.includes(currentUser?.id)
    }, [currentUser?.id, fetchedPost?.likedIds]);


}