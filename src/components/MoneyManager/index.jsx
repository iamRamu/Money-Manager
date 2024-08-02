import TransactionForm from '../TransactionForm'
import TransactionItem from '../TransactionItem'
import { FaWallet } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney} from "react-icons/gi";
import './index.css'
import { createContext, useReducer } from 'react';

export const store = createContext()

const initialState = {
    balance : 0,
    income : 0,
    expenses : 0,
    transactionList : []
}

const reducer = (state, action) => {
    switch (action.type) {
        case "income":
           return {
            ...state,
            balance : state.balance + action.payload,
            income : state.income + action.payload,
            transactionList : [...state.transactionList, {...action}]
           }
        case "expenses":
            return {
                ...state,
                balance : state.balance - action.payload,
                expenses : state.expenses + action.payload,
                transactionList : [...state.transactionList, {...action}]
            }
        case "remove":
            const updatedList = state.transactionList.filter(transaction => transaction.id !== action.payload.id);
            const updatedBalance = action.payload.type === "income" ? 
                state.balance - action.payload.payload : 
                state.balance + action.payload.payload;
            const updatedIncome = action.payload.type === "income" ? 
                state.income - action.payload.payload : 
                state.income;
            const updatedExpenses = action.payload.type === "expenses" ? 
                state.expenses - action.payload.payload : 
                state.expenses;
            return {
                ...state,
                balance: updatedBalance,
                income: updatedIncome,
                expenses: updatedExpenses,
                transactionList: updatedList
            }
        default:
            return state
    }
}

const MoneyManager = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <store.Provider value={{state, dispatch}}>
            <div className='money-manager-bg-container'>
                <div className='money-manager-money-cards'>
                    <div className='money-manager-each-card'>
                        <div className='icon-container'>
                            <FaWallet className='icon'/>
                        </div>
                        <div className='money-manager-balance-container'>
                            <p className='balance'>Your Balance</p>
                            <h2 className='amount'>RS {state.balance}</h2>
                        </div>
                    </div>

                    <div className='money-manager-each-card2'>
                        <div  className='icon-container'>
                            <GiReceiveMoney className='icon'/>
                        </div>
                        <div className='money-manager-balance-container'>
                            <p className='balance'>Your Income</p>
                            <h2 className='amount'>RS {state.income}</h2>
                        </div>
                    </div>

                    <div className='money-manager-each-card3'>
                        <div  className='icon-container'>
                            <GiPayMoney className='icon'/>
                        </div>
                        <div className='money-manager-balance-container'>
                            <p className='balance'>Your Expenses</p>
                            <h2 className='amount'>RS {state.expenses}</h2>
                        </div>
                    </div>
                </div>
                <div className='money-manager-transaction-form-items-container'>
                    <div className='transation-sub-container'>
                        <TransactionForm/>
                    </div>
                    <div className='transation-sub-container1'>
                        <div style={{margin:"20px"}}>
                            <h3 style={{fontFamily:"Roboto"}}>History</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='transaction-title'>Title</th>
                                        <th className='transaction-amount'>Amount</th>
                                        <th className='transaction-type'>Type</th>
                                        <th className='transaction-delete'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.transactionList.length > 0 &&
                                        state.transactionList.map(eachTransaction => <TransactionItem transactionDetails={eachTransaction} key={eachTransaction.id}/>)
                                    }
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </store.Provider>
    )
}

export default MoneyManager