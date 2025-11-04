import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";
// import { FaClock, FaUser } from "react-icons/fa";
import RecentSearchUsers from "./RecentSearchUsers";

const UserSearch = () => {
    const [userName, setUserName] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState('')
    const [recentUsers, setRecentUsers] = useState<string[]>([])

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: () => fetchGithubUser(submittedUsername),
        enabled: !!submittedUsername, 
    })

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataTrimmed = userName.trim()
        if (!dataTrimmed) return;
        setSubmittedUsername(dataTrimmed)
        
        setRecentUsers(prev => [dataTrimmed, ...prev.filter(u => u !== dataTrimmed)].slice(0, 5));

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="enter the username..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {isLoading && <p className="status">Loadding...</p>}

            {isError && <p className="status error">{error.message}</p>}

            {data && <UserCard user={data} />}
            
            {recentUsers.length > 0 && (
                <RecentSearchUsers
                    users={recentUsers}
                    onselect={(userName) => {
                            setUserName(userName);
                            setSubmittedUsername(userName)
                        }
                    }
                />
            )}
        </>
    );
}
 
export default UserSearch;