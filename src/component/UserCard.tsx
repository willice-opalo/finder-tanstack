import { FaGithubAlt } from "react-icons/fa";

type GitHubUser = {
    login: string,
    name: string,
    avatar_url: string,
    html_url: string,
    bio: string,
}
const UserCard = ({ user }: {user: GitHubUser}) => {
    return (  
        <div className="user-card">
            <img src={user.avatar_url} alt={user.name} className="avatar" />
            <h2>{user.name || user.login}</h2>
            <div className="bio">{user.bio}</div>
            <a href={user.html_url} className="profile-btn" target="_blank" rel="noopenner noreferrer">
                <FaGithubAlt/>View GitHub Profiles
            </a>
        </div>
    );
}
 
export default UserCard;