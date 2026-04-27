import { useContext } from "react";
import UserContext from "../context/UserContext";
export default  function Account(props) {
    const { user } = useContext(UserContext);

    if(!user) {
        return <p> loading... </p>
    }
    
    return (
        <div>
            <h2> Account page component </h2>
            <p> username - { user.username } </p>
            <p> email - { user.email } </p>
            <p> role - { user.role } </p>
        </div>
    )
}