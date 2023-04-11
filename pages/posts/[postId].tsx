import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = () => {

    const router = useRouter();
    const { postId } = router.query;

    const { isLoading, data: fetchedPost } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex items-center justify-center h-full">
                <ClipLoader size={80} color="lightblue" />
            </div>
        )
    }


    return (
        <>
            <Header label="Tweet" showBackArrow />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
        </>
    );
}

export default PostView;