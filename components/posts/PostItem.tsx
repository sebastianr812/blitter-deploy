import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
    userId?: string;
    data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({
    userId,
    data,
}) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

    const goToUser = useCallback((e: any) => {
        e.stopPropagation();

        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`)
    }, [router, data.id]);


    const onLike = useCallback((e: any) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();

        }
        toggleLike();

    }, [loginModal, currentUser, toggleLike]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);


    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;


    return (
        <div onClick={goToPost} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={goToUser} className="font-semibold text-white cursor-pointer hover:underline">{data.user.name}</p>
                        <span onClick={goToUser} className="hidden cursor-pointer text-neutral-500 hover:underline md:block">@{data.user.username}</span>
                        <span className="text-sm text-neutral-500">{createdAt}</span>
                    </div>
                    <div className="mt-1 text-white">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center gap-10 mt-3">
                        <div className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-sky-500">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comment?.length || 0}
                            </p>
                        </div>
                        <div onClick={onLike} className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-red-500">
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                            <p>
                                {data.likedIds?.length || 0}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;