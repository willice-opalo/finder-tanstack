import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaGithubAlt } from "react-icons/fa";
import { fetchGithubUser } from "../api/githum";

const UserSearch = () => {
    const [userName, setUserName] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState('')

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: () => fetchGithubUser(submittedUsername),
        enabled: !!submittedUsername, 
    })

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmittedUsername(userName.trim())
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

            {data && (
                <div className="user-card">
                    <img src={data.avatar_url} alt={data.name} className="avatar" />
                    <h2>{data.name || data.login}</h2>
                    <div className="bio">{data.bio}</div>
                    <a href={data.html_url} className="profile-btn" target="_blank" rel="noopenner noreferrer">
                        <FaGithubAlt/>View GitHub Profiles
                    </a>
                </div>
            )}
        </>
    );
}
 
export default UserSearch;