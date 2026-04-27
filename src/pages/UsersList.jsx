import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
export default function UsersList() {
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('/users', { headers: { Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    // const handleRemove = (id) => {
    //     // console.log(id);
    //     const userConfirmation = window.confirm("Are you sure?");
    //     if(userConfirmation) {
    //     axios.delete(`/users/${id}`, { headers: { Authorization: localStorage.getItem('token') }})
    //         .then((response) => {
    //             console.log(response.data)
    //             const newArr = users.filter((ele) => ele._id != response.data._id)
    //             setUsers(newArr);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // }

    const handleRemove = async (id, email) => {
        // console.log(id);
        const userConfirmation = window.confirm("Are you sure?");
        if(userConfirmation) {
            const userEmail = window.prompt("Enter email of the user");
                if( userEmail == email ) {
                    try {
                    const response = await axios.delete(`/users/${id}`, { headers: { Authorization: localStorage.getItem('token') }})
                    console.log(response.data);
                    const newArr = users.filter((ele) => ele._id != response.data._id);
                    setUsers(newArr);
                }
                catch(err) {
                    console.log(err);
                }
            } else {
                alert("Enter is incorrect");
            }
        }
    }

    if(!user) {
        return <p> loading... </p>
    }
    

    return (
        <div>
            <h2> users list component </h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th> username </th>
                        <th> email </th>
                        <th> role </th>
                        { user.role == "admin" && <th> action </th> }
                    </tr>
                </thead>
                <tbody>
                    { users.map((ele) => {
                    return (
                            <tr key={ele._id}>
                                <td> {ele.username} </td>
                                <td> {ele.email} </td>
                                <td> {ele.role} </td>
                               { user.role == "admin" && <td> { user._id != ele._id && <button onClick={() => {
                                handleRemove(ele._id, ele.email)
                               }}> remove </button>}</td>}
                            </tr>
                    )
                })}
                </tbody>
                
            </table>
        </div>
    )
}