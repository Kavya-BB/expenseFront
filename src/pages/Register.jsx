import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
export default  function Register(props) {
    const { handleRegister } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password:''
        },
        onSubmit: (values, {resetForm}) => {
            console.log("formData", values);
            handleRegister(values, resetForm);
        }
    })

    return (
        <div>
            <h2> Register page component </h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter username" />
                </div>
                <div>
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email" />
                </div>
                <div>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter password" />
                </div>
                <div>
                    <input type="submit" value="register" />
                </div>
            </form>
        </div>
    )
}