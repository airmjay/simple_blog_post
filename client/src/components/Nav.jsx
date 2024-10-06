import {Link} from 'react-router-dom';
import '../App.css';

export function Nav(nav)
{
    let status = nav.auth.Auth.status;
    let setStatus = (nav.auth.SetAuth)
    const submit = () => {
        localStorage.removeItem('accessToken')
        setStatus({
            ...nav.auth.Auth,
            username: "",
            id: 0,
            status: false
        })
    }
    return (
        <nav>
        <ul>
            <li><Link to='/' >App</Link></li>
            <li><Link to='/create' >Create Post</Link></li>
            {!status ? (
            <>
            <li><Link to='/register' >Register</Link></li>
            <li><Link to='/login' >Login</Link></li>
            </>
            ): (
                <li><button onClick={submit} className='logout'>Logout</button></li>
            )
            }
            <li style={{
                color:'white'
            }}>{nav.auth.Auth.username}</li>
        </ul>
        </nav>);
}