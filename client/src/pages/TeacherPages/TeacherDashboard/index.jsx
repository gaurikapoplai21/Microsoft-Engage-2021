import {useEffect} from 'react'
import {pageTitles} from '../../../constants/app'

// helper functions
import {setWindowTitle} from '../../../utils/misc'
const TeacherDashboard = () => {
     useEffect(()=>{
        setWindowTitle(pageTitles.TEACHER_DASHBOARD)
    },[])
    return (
        <div>
            teacher dashboard
        </div>
    )
}

export default TeacherDashboard
