import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                const url = `/api/follow?userId=${userId}`

                request = () => axios.get(url);

            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Success');
        } catch (e) {
            toast.error('Something went wrong');
        }

    }, [isFollowing, currentUser, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow;