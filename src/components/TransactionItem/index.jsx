import { useContext } from 'react'
import { IoMdTrash } from "react-icons/io";
import { store } from '../MoneyManager'
import Swal from 'sweetalert2'
import './index.css'

const TransactionItem = (props) => {
    const { transactionDetails } = props
    const { id, type, payload, title } = transactionDetails
    const { dispatch } = useContext(store)

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                text: "Your transaction has been deleted.",
                icon: "success",
                timer : 3000,
                position : "top-end",
                toast : true,
                timerProgressBar : true,
                showConfirmButton : false,
                
              })
              dispatch({type : "remove", payload : {id, payload, type}})
            }else{
                Swal.fire({
                    text : "Changes Not Saved",
                    timer : 3000,
                    position : "top-end",
                    toast : true,
                    timerProgressBar : true,
                    showConfirmButton : false,
                    icon : "info"
                })
            }
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
