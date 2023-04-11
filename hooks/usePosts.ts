import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
    const { data, mutate, isLoading, error } = useSWR(url, fetcher)

    return {
        data,
        mutate,
        isLoading,
        error,
    }
}



export default usePosts;