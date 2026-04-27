// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import axios from "../config/axios";
// export default function CategoryContainer() {
//     const [categories, setCategories] = useState([]);
//     const [editId, setEditId] = useState(null);

//     const formik = useFormik({
//         initialValues: {
//             name: ""
//         },
//         onSubmit: (values, { resetForm }) => {
//             // console.log(values);
//             if(editId) {
//                 axios.put(`/api/categories/${editId}`, values, { headers: { Authorization: localStorage.getItem('token')}})
//                     .then((response) => {
//                         console.log(response.data);
//                         const updatedName = categories.map((ele) => ele._id === editId ? response.data : ele);
//                         setCategories(updatedName);
//                         setEditId(null);
//                         resetForm();
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             } else {
//                 axios.post('api/categories', values, { headers: { Authorization: localStorage.getItem('token')}})
//                 .then((response) => {
//                     console.log(response.data);
//                     setCategories([...categories, response.data]);
//                     resetForm();
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//             }
//         }
//     })

//     useEffect(() => {
//         axios.get('/api/categories', { headers: { Authorization: localStorage.getItem('token')}})
//             .then((response) => {
//                 console.log(response.data);
//                 setCategories(response.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }, [])
    
//     const handleEdit = (editId) => {
//         const newName = categories.find((ele) => ele._id === editId);
//         if(newName) {
//             formik.setValues({ name: newName.name });
//             setEditId(editId);
//         }
//     }

//     const handleRemove = async (id) => {
//         const userConfirmation = window.confirm("Are you sure?");
//         if(userConfirmation) {
//             try {
//                 const response = await axios.delete(`/api/categories/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
//                 const newArr = categories.filter((ele) => ele._id != response.data._id);
//                 setCategories(newArr);
//             } catch(err) {
//                 console.log(err);
//                 alert("Error", err.message);
//             }
//         }
//     }

//     if(!categories) {
//         return <p> loading... </p>
//     }
    
//     return (
//         <div>
//             <h2> Listing Categories - { categories.length } </h2>
//             {
//                 categories.map((ele) => {
//                     return <li key={ele._id}> { ele.name } 
//                         <button onClick={() => {handleEdit(ele._id)}}> edit </button> 
//                         <button onClick={() => {handleRemove(ele._id)}}> remove </button> </li>
//                 })
//             }

//             <form onSubmit={formik.handleSubmit}>
//                 <label> name </label>
//                 <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
//                 <br />
//                 <input type="submit" value={ editId ? "Update name" : "Add name"} />
//             </form>
//         </div>
//     )
// }


import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
export default function CategoryContainer() {
    return (
        <div>
            <h2> Catogory Container </h2>

            <CategoryList />
            <CategoryForm />
        </div>
    )
}