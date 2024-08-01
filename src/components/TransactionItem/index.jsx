import { useContext } from 'react'
import { IoMdTrash } from "react-icons/io";
import { store } from '../MoneyManager'
import './index.css'

const TransactionItem = (props) => {
    const { transactionDetails } = props
    const { id, type, payload, title } = transactionDetails
    const { dispatch } = useContext(store)

    const handleDelete = () => {
        dispatch({
            type: "remove",
            payload: { id, type, payload }
        })
    }

    return (
        <tr>
            <td className='transaction-title'>{title}</td>
            <td className='transaction-amount'>RS {payload}</td>
            <td className='transaction-type'>{type}</td>
            <td>
                <button className='delete-button' onClick={handleDelete}>
                    <IoMdTrash />
                </button>
            </td>
        </tr>
    )
}

export default TransactionItem
