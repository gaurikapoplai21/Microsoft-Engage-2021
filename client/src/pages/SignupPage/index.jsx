import {useEffect} from 'react'
import {pageTitles} from '../../constants/app'

// helper functions
import {setWindowTitle} from '../../utils/misc'
const SignupPage = () => {
     useEffect(()=>{
        setWindowTitle(pageTitles.SIGNUP)
    },[])
    return (
        <div>
           sign up page 
        </div>
    )
}

export default SignupPage
