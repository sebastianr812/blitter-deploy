import useSWR from 'swr';
import fetcher from '@/libs/fetcher'


const useNotifications = (userId?: string) => {
    const url = userId ? `/api/notifications/${userId}` : null;

    const { data, mutate, error, isLoading } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        error,
        isLoading
    };
}

export default useNotifications;