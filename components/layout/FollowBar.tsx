import useUsers from "@/hooks/useUsers";

const FollowBar = () => {

    const { data: users = [] } = useUsers();

    if (users.length === 0) {
        return null
    }

    return (
        <div className="hidden px-6 py-4 lg:block">
            <div className="p-4 bg-neutral-800 rounded-xl">
                <h2 className="text-xl font-semibold text-white">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.map((user: Record<string, any>) => (
                        <div></div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowBar;