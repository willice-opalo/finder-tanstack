import { FaClock, FaUser } from "react-icons/fa";

type SearcherProps = {
    users: string[],
    onselect: (username:string) => void
}
const RecentSearchUsers = ({users, onselect}: SearcherProps) => {
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