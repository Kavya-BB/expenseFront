import { useReducer, useEffect } from "react";
import UserContext from "../context/UserContext";
import { fetchUserCategories } from "../slices/category-slice";
import { fetchUserExpenses } from "../slices/expense-slice";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useDispatch } from "react-redux";
const userReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": {
            return {...state, isLoggedIn: true, user: action.payload, serverError: '' };
        }
        case "LOGOUT": {
            return {...state, isLoggedIn: false};
        }
        case "SET_SERVER_ERRORS": {
            return {...state, serverError: action.payload};
        }
        default: {
            return {...state}
        }
    }
}


export default function AuthProvider(props) {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const [ state, dispatch] = useReducer(userReducer, {
        user: null,
        isLoggedIn: false,
        serverError: ''
    })

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/users/account', { headers: { Authorization: localStorage.getItem('token')}});
                    dispatch({ type: "LOGIN", payload: response.data});
                } catch(err) {
                    alert(err.message);
                }
            }
            fetchUser();
        }
    }, [])

    

    const handleRegister = async (formData, resetForm) => {
        // api call
        try {
            const response = await axios.post('/users/register', formData);
            console.log(response.data);
            alert('successfully registered');
            resetForm();
            dispatch({ type: "SET_SERVER_ERRORS", payload: '' });
            navigate('/login');
        } catch(err) {
            console.log(err.message);
            dispatch({ type: "SET_SERVER_ERRORS", payload: err.response.data.error });
        }
    } 

    const handleLogin = async (formData, resetForm) => {
        try {
            const response = await axios.post('/users/login', formData);
            localStorage.setItem('token', response.data.token);
            const userResponse = await axios.get('/users/account', { headers: { Authorization: localStorage.getItem('token')}});
            // console.log(userResponse.data)
            resetForm();
            alert('successfully logged in');

            // redux dispatch
            reduxDispatch(fetchUserCategories());
            reduxDispatch(fetchUserExpenses());

            // useReducer hook dispatch
            dispatch({ type: "LOGIN", payload: userResponse.data });
            navigate('/dashboard');
        } catch(err) {
            // console.log(err);
            dispatch({ type: "SET_SERVER_ERRORS", payload: err.response.data.error });
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
    }

    // functionality
    return (
            <UserContext.Provider value={{ ...state, handleRegister, handleLogin, handleLogout }}>
                { props.children }
            </UserContext.Provider>
    )
}