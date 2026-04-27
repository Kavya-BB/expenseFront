import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createExpense } from "../slices/expense-slice";
export default function ExpenseForm() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => {
        return state.category;
    });

    const [form, setForm] = useState({
        title: '',
        expenseDate: '',
        amount: '',
        category: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const handleReset = () => setForm({
            title: '',
            expenseDate: '',
            amount: '',
            category: '',
            description: ''
        })
        dispatch(createExpense({ form, handleReset }));
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value  })
    }

    return (
        <div>
            <h2> Add Expense </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={form.title}
                        name="title"
                        placeholder="Enter title"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="Date"
                        value={form.expenseDate}
                        name="expenseDate"
                        placeholder="Enter expenseDate"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="description"
                        value={form.description}
                        name="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="Number"
                        value={form.amount}
                        name="amount"
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select value={form.category} name="category" onChange={handleChange}>
                        <option value=""> Select Category </option>
                        {
                            data.map((ele) => {
                                return <option key={ele._id} value={ele._id}> { ele.name } </option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <input type="submit" value="submit" /> 
                </div>
                
            </form>
        </div>
    )
}