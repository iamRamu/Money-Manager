import {v4 as uuid} from 'uuid'
import { useContext, useReducer} from 'react'
import { store } from '../MoneyManager'
import './index.css'


const formInitialState = {
    title : "",
    amount : "",
    type : "income"
}

const formReducer = (formState, formAction) => {
    switch (formAction.type) {
        case "title":
            return {
                ...formState,
                title : formAction.payload
            }
        case "amount":
            return {
                ...formState,
                amount : formAction.payload
            }
        case "type":
            return{
                ...formState,
                type : formAction.payload
            }
        case "reset":
            return {
                ...formInitialState
            }
        default:
           return formState
    }
}

const TransactionForm = () => {
    const {dispatch} = useContext(store)
    const [formData, formDispatch] = useReducer(formReducer, formInitialState)

    const handleForm = event => {
        event.preventDefault()
        const money = parseInt(formData.amount)
        if(!isNaN(money) && money > 0 && formData.title){
            dispatch({id : uuid(), type : formData.type, payload : money, title : formData.title})
            formDispatch({type : "reset"})
        }
    }
    return(
        <form className='transaction-from-bg-container' onSubmit={handleForm}>
            <h3 style={{fontFamily:"Roboto", marginTop:"0px"}}>Add Transaction</h3>
            <label className='transaction-label'>TITLE</label>
            <input placeholder='TITLE' className='transaction-input' value={formData.title} onChange={event => formDispatch({type: "title", payload : event.target.value})}/>
            <label className='transaction-label'>AMOUNT</label>
            <input placeholder='AMOUNT' type='number' className='transaction-input' value={formData.amount} onChange={event=>formDispatch({type : "amount", payload : event.target.value})}/>
            <label className='transaction-label'>TYPE</label>
            <select className='transaction-input' style={{width:"95%"}} value={formData.type} onChange={event=>formDispatch({type : "type", payload : event.target.value})}>
                <option className='transaction-input' value="income">Income</option>
                <option className='transaction-input' value="expenses">Expenses</option>
            </select>
            <button className='add-button' type='submit'>Add</button>
        </form>
    )
}

export default TransactionForm