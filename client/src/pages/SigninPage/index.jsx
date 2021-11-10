import {useEffect} from 'react'
import {pageTitles} from '../../constants/app'

// helper functions
import {setWindowTitle} from '../../utils/misc'
const SigninPage = () => {
     useEffect(()=>{
        setWindowTitle(pageTitles.SIGNIN)
    },[])
    return (
        <div>
            Sign in page
        </div>
    )
}

export default SigninPage
