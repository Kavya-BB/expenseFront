import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../slices/category-slice";
export default function CategoryForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const { data, errors, editId } = useSelector((state) => {
        return state.category;
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name
        }
        const handleReset = () => {
            setName('');
        }
        if(editId) {
            dispatch(updateCategory({ editId, formData, handleReset }));
        } else {
            dispatch(createCategory({ formData, handleReset }));
        }
    };

    useEffect(() => { // pre filling the form
        if(editId) {
            const category = data.find(ele => ele._id == editId);
            // console.log('category to edit', category);
            setName(category.name);
        } else {
            setName('');
        }
    }, [editId])

    return (
        <div>
            <h2> { editId ? 'edit' : 'Add'} Category </h2>
            { errors && <p> {errors} </p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />

                <input type="submit" value="submit" />
            </form>
        </div>
    )
}