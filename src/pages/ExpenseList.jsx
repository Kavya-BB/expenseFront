import { useSelector, useDispatch } from "react-redux"
import { format } from 'date-fns'
export default function ExpenseList() {
    const { data } = useSelector((state) => {
        return state.expense;
    });
    const { data: categoryData } = useSelector((state) => {
        return state.category;
    });
   

    return (
        <div>
            <h2> Listing Expenses - </h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Title </th>
                        <th> ExpenseDate </th>
                        <th> Amount </th>
                        <th> Description </th>
                        <th> Category </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((exp, i) => {
                            return (
                                <tr key={exp._id}>
                                    <td> { i + 1 } </td>
                                    <td> { exp.title } </td>
                                    <td> { format(new Date(exp.expenseDate), "dd/mm/yyyy") } </td>
                                    <td> { exp.amount } </td>
                                    <td> { exp.description } </td>
                                    <td> { categoryData.find(cat => cat._id == exp.category)?.name } </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}