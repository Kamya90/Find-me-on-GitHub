import React , {useContext, useState} from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from "../../context/alert/alertContext";

const Search =()=> {
  const githubContext= useContext(GithubContext);
  const alertContext=useContext(AlertContext);
    const [text, setText]= useState('');

    // static propTypes={
    //     searchUsers:PropTypes.func.isRequired,
    //     clearUsers:PropTypes.func.isRequired,
    //     showClear:PropTypes.bool.isRequired,
    //     setAlert:PropTypes.func.isRequired
    // }
    const onSubmit= e=>{
        e.preventDefault();
        if(text===''){
            alertContext.setAlert('Please enter something my G', 'light');
        }
        else{
        githubContext.searchUsers(text);
        setText('');
        }
    };
    const onChange=(e)=>
        setText( e.target.value);

  
    // const{showClear, clearUsers}= this.props;
    return (
      <div>
        <form onSubmit={onSubmit} className='form'>
            <input type='text' name='text' placeholder='Search users..' value=
            {text} onChange={onChange}/>
            <input type='submit' value='Search' className='btn btn-dark btn-block'
            />
        </form>
        {githubContext.users && githubContext.users.length >0 &&(
             <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear</button>
        )}
       
      </div>
    ) ;
  
};

export default Search;
