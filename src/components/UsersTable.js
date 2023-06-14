import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockUsers, deleteUsers, getAllUsersAsync, selectIsLoginAuthToken, selectUserToken, selectUsers, unblockUsers } from '../store/reducer/authReducer'
import { Container } from 'react-bootstrap';

const UsersTable = () => {
  
  const allUsers = useSelector(selectUsers)
  const token = useSelector(selectIsLoginAuthToken)
  const dispatch = useDispatch()
  const [checkUsers, setCheckUsers] = useState([])
  const [blocked,setBlocked] = useState(false)
  const [unblocked,setUnblocked] = useState(false)
  const [deleted,setDeleted] = useState(false)

  console.log(checkUsers)
  useEffect(()=>{
    dispatch(getAllUsersAsync())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[blocked])
  useEffect(()=>{
    if(blocked){
      dispatch(blockUsers(checkUsers,true,token))
      setCheckUsers([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[blocked])

  const handleChange = (id) => {
    console.log(id)
    if (checkUsers.includes(id)) {
      setCheckUsers(checkUsers.filter((userId) => userId !== id));
    } else {
      setCheckUsers([...checkUsers, id]);
    }
  }

  const handleDelete = () => {
    dispatch(deleteUsers(checkUsers))
  }
  const handleBlock = () => {
    setBlocked(!blocked)
    console.log(checkUsers)
  }
  const handleUnblock = () => {
    dispatch(unblockUsers(checkUsers))
  }

  const handleSelectAll = () => {
    if (checkUsers.length === allUsers.length) {
      setCheckUsers([]);
    } else {
      const allUserIds = allUsers.map((user) => user._id);
      setCheckUsers(allUserIds);
    }
  };

  
  const formatTimestamp = (timestamp) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(timestamp).toLocaleString(undefined, options);
  };
  
  // console.log(checkUsers.includes(allUsers[1]._id))


  return (
    <Container className="content">
         <div className="row mt-3">
          <div className="col-sm-12">
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button className="btn btn-danger mb-3" onClick={ ()=>{ handleDelete()}}>Delete</button>
            <button className="btn btn-warning mb-3" onClick={ ()=>{ handleBlock()}}>Block</button>
            <button className="btn btn-success mb-3" onClick={ ()=>{ handleUnblock()}}>Unblock</button>
            </div>
            <form className="form w-100">
            <table className="table">
            <thead>            
            <tr>
            <th>
            <input type="checkbox" name="allselect" onChange={handleSelectAll} checked= { checkUsers.length === allUsers.length} />                
            </th>
            <th>Sr. No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Is Blocked</th>
            <th>Updated<br/>Created</th>
            </tr>
            </thead>
            <tbody>
              { allUsers?.map( (getusers, index)=>(         
            <tr  key={getusers.id}>
            <th> <input type="checkbox" name={ getusers.firstName} checked={checkUsers.includes(getusers.id)} onChange={()=>handleChange(getusers.id)} /></th>
            <td>{ index+1} </td>
            <td>{ getusers.firstName} </td>
            <td>{ getusers.lastName} </td>
            <td>{ getusers.email} </td>
            <td>{ JSON.stringify(getusers?.isBlocked)} </td>
            <td>{formatTimestamp(getusers.updatedAt)} <br/> {formatTimestamp(getusers.createdAt)}</td>
            </tr>
              ))
            }
   
            </tbody>
            </table>
            </form>
            </div>
            </div>
            </Container>
  )
}
export default UsersTable