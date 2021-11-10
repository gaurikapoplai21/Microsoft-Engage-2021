import {useEffect} from 'react'
import {pageTitles} from '../../../constants/app'

// helper functions
import {setWindowTitle} from '../../../utils/misc'
const StudentDashboard = () => {
     useEffect(()=>{
        setWindowTitle(pageTitles.STUDENT_DASHBOARD)
    },[])
    return (
        <div>
            student dashboard
        </div>
    )
}

export default StudentDashboard
