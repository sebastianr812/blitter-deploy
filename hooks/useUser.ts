import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
    const { data, error, mutate, isLoading } = useSWR(userId ? `/api/user/${userId}` : null, fetcher);

    return {
        data,
        error,
        mutate,
        isLoading,
    }
}