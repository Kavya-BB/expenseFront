import { Link, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import UsersList from "./pages/UsersList";
import Dashboard from "./pages/Dashboard";
import CategoryContainer from "./pages/CategoryContainer";
import ExpenseContainer from "./pages/ExpenseContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserCategories, resetCategory } from "./slices/category-slice";
import { fetchUserExpenses, resetExpense } from "./slices/expense-slice";

export default function App() {
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);
  const dispatch = useDispatch();

   useEffect(() => {
        if(localStorage.getItem('token')) {
            // make api call to get the categories data of that user
            dispatch(fetchUserCategories());
            dispatch(fetchUserExpenses());
        }
    }, [dispatch])

  return (
    <div>
      <h1> Expensify </h1>
      <ul>
        <li> <Link to="/"> Home </Link> </li>

        { (isLoggedIn || localStorage.getItem('token')) && (
          <>
            <li> <Link to="/account"> Account </Link></li>
            <li> <Link to="/dashboard"> Dashboard </Link></li>
            { (user?.role === "admin" || user?.role === "moderator") && <li> <Link to="/users-list"> List users </Link> </li> }
            <li> <Link to="/categoryContainer"> Category Container </Link></li>
            <li> <Link to="/expenseContainer"> Expense Container </Link></li>
            <li> <Link to="/" onClick={() =>{
              handleLogout();
              dispatch(resetCategory());
              dispatch(resetExpense());
            }} > Logout </Link> </li>
          </>
        )}

        { (!isLoggedIn && !localStorage.getItem('token')) && (
          <>
            <li> <Link to="/register"> Register </Link></li>
            <li> <Link to="/login"> Login </Link></li>
          </>
        )}        
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute allowRoles={['admin', 'moderator', 'user']}>
          <Dashboard />
        </PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute allowRoles={['admin', 'moderator', 'user']}>
          <Account />
        </PrivateRoute>} />
        <Route path="/users-list" element={<PrivateRoute allowRoles={['admin', 'moderator']}>
          <UsersList />
        </PrivateRoute>} />
        <Route path="/categoryContainer" element={<PrivateRoute allowRoles={['user']}>
          <CategoryContainer />
        </PrivateRoute>} />
        <Route path="/expenseContainer" element={<PrivateRoute allowRoles={['user']}>
          <ExpenseContainer />
        </PrivateRoute>} />
      </Routes>
    </div>
  )
}