import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";

export default  function Dashboard(props) {
    const { user } = useContext(UserContext);

    const { data: categoryData } = useSelector((state) => {
        return state.category;
    });
    const { data: expenseData } = useSelector((state) => {
        return state.expense;
    });

    if(!user) {
        return <p> loading... </p>
    }

    return (
        <div>
            <h2> Dashboard page component </h2>
            <p> welcome, { user.username} </p>
            <p> Total categories - { categoryData.length } </p>
            <p> Total expenses - { expenseData.length } </p>
        </div>
    )
}