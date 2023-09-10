import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./SingleTransfer.css";

const SingleTransfer = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const [user, setUser] = useState({});
  const [transactions,setTransactions]=useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, usersResponse,transactionsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${path}`),
          axios.get("http://localhost:5000/api/users/"),
          axios.get(`http://localhost:5000/api/transfers/${path}`)
        ]);

        setTransactions(transactionsResponse.data.map(transaction => ({
            ...transaction,
            senderUsername: usersResponse.data.find(user => user._id === transaction.sender).username,
            receiverUsername: usersResponse.data.find(user => user._id === transaction.receiver).username
          })));

        setUser(userResponse.data);
        setUsers(usersResponse.data);
        console.log(transactionsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [path]);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (recipient && amount > 0) {
        console.log(typeof amount)
      try {
        const response = await axios.post(
          "http://localhost:5000/api/transfers/transfer",
          {
            sender: path,
            receiver: recipient,
            amount: parseInt(amount),
          }
        );

        if (response.status === 200) {
            alert("Transfer Successful")
          console.log('Transfer successful:', response.data);
          setRecipient('');
          setAmount('');
        } else {
          console.error('Transfer failed:', response.data);
        }
      } catch (error) {
        console.error('Transfer error:', error.message);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div className='singleUser'>
      <p className='head'>Account Details</p>
      <div >
        <div className='details' >Name : {user.username}</div>
        <div className='details'>Email : {user.email}</div>
        <div className='details'>Phone : {user.phone}</div>
        <div className='details'>Balance : {user.amount}</div>
        <div className='details'>Date : {user.createdAt}</div>
      </div>
      <div className="prevTrans">
        <p className='transferhead'>Debits</p>
        <div className="d-flex justify-content-center " >
          <table className="table text-center align-items-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Transaction No</th>
              
              <th scope="col">Receiver</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
               {transaction.sender === path?(
                    <>
                        
                        <td >{transaction.tno}</td>
                        
                        <td>{transaction.receiverUsername}</td>
                        <td>{transaction.amount}</td>
                        <td>{new Date(transaction.createdAt).toDateString()}</td>
                    </>
                    ):<></>}
            </tr>
          ))}  
          </tbody>
        </table>
        </div>
        <p className='transferhead'>Credits</p>
        <div className="d-flex justify-content-center " >
          <table className="table text-center align-items-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Transaction No</th>
              
              <th scope="col">Sender</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
               {transaction.receiver === path?(
                    <>
                        
                        <td >{transaction.tno}</td>
                        
                        <td>{transaction.senderUsername}</td>
                        <td>{transaction.amount}</td>
                        <td>{new Date(transaction.createdAt).toDateString()}</td>
                    </>
                    ):<></>}
            </tr>
          ))}  
          </tbody>
        </table>
        </div>
      </div>
      <div className='transferTo'>
        <p className='transferhead'>Transfer</p>
        <form onSubmit={handleTransfer}>
          <div className='recipient'>
            <label>Recipient:</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="">Select a recipient</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className='transferBtn submit' type="submit">Transfer</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTransfer;
