import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchGithubUser, searchGithubUser } from "../api/github";
import UserCard, { type GitHubUser } from "./UserCard";
import RecentSearchUsers from "./RecentSearchUsers";
import { useDebounce } from "use-debounce";

const UserSearch = () => {
    const [userName, setUserName] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState('')
    const [recentUsers, setRecentUsers] = useState<string[]>(() => {
        const savedData = localStorage.getItem('savedUserData')
        return savedData ? JSON.parse(savedData) : []
    })

    const [debounceUserName] = useDebounce(userName, 300)
    const [suggestions, setSuggestions] = useState(false)
    
    //Query to fetch the users
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: () => fetchGithubUser(submittedUsername),
        enabled: !!submittedUsername, 
    })

    //Query for suggetion users
     const { data:suggestionsData} = useQuery({
        queryKey: ['users-suggetions', debounceUserName],
        queryFn: () => searchGithubUser(debounceUserName),
        enabled: debounceUserName.length > 1, 
    })

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataTrimmed = userName.trim()
        if (!dataTrimmed) return;
        setSubmittedUsername(dataTrimmed)
        setUserName('')
        setRecentUsers(prev => [dataTrimmed, ...prev.filter(u => u !== dataTrimmed)].slice(0, 5));
    }

    useEffect(() => {
        localStorage.setItem('savedUserData', JSON.stringify(recentUsers))
    }, [recentUsers])

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <div className='dropdown-wrapper'> 
                    <input
                        type="text"
                        placeholder="Enter The username..."
                        value={userName}
                        onChange={(e) => {
                            const val = e.target.value
                            setUserName(val)
                            setSuggestions(val.trim().length > 1)
                         }}
                    />
                
                    {suggestions && suggestionsData?.length > 0 && (
                        <ul className='suggestions'>
                            {suggestionsData.slice(0, 5).map((user: GitHubUser) => (
                                <li key={user.login} onClick={() => {
                                    setUserName(user.login)
                                    setSuggestions(false)

                                    if (submittedUsername !== user.login) {
                                        setSubmittedUsername(user.login)
                                    } else {
                                        refetch()
                                    }

                                    setRecentUsers(prev => [user.login, ...prev.filter(u => u !== user.login)].slice(0, 5));
                                }}>
                                    <img src={user.avatar_url} alt={user.login} className="avatar-xs"/>
                                    {user.login}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>    
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