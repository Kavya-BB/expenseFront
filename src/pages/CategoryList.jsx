import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeCategory, assignEditId, resetEditId } from "../slices/category-slice";
export default function CategoryList() {
    const dispatch = useDispatch();
    const { data, loading, editId } = useSelector((state) => {
        return state.category;
    });

    useEffect(() => {
        return () => {
            // dispatch(assignEditId(null)); // cleanup code
            dispatch(resetEditId());
        }
    }, []);

    const handleCancel = () => {
        dispatch(resetEditId());
    };

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if(userConfirm) {
            dispatch(removeCategory(id));
        }
    };

    if(loading) {
        return <p> loading... </p>
    }

    return (
        <div>
            <h2> Listing Categories - { data.length } </h2>
            <ul>
                {
                    data.map((ele) => {
                        return <li key={ele._id}> { ele.name } 
                        <button onClick={() => {
                            dispatch(assignEditId(ele._id))
                        }}> edit </button> 
                        <button onClick={() => {
                            handleRemove(ele._id);
                        }}> remove </button> 

                        { ele._id == editId && <button onClick={handleCancel}> cancel </button> }
                        </li>
                    })
                }
            </ul>
        </div>
    )
}