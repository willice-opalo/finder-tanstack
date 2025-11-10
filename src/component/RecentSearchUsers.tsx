import { FaClock, FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";

type SearcherProps = {
    users: string[],
    onselect: (username:string) => void
}

const RecentSearchUsers = ({ users, onselect }: SearcherProps) => {
    const queryClient = useQueryClient()
    return (
        <>
            <div className="recent-searches">
                <div className="recent-header">
                    <FaClock /><h3>Recent Users</h3>
                </div>
                <ul>
                    {users.map((user) => (
                        <li key={user}>
                            <button onClick={() => {
                                onselect(user)
                            }} onMouseEnter={() => {
                                queryClient.prefetchQuery({
                                    queryKey: ['users', user],
                                    queryFn: () => fetchGithubUser(user)
                                })
                            }}>
                                <FaUser className="user-icon"/>
                                {user}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
 
export default RecentSearchUsers;