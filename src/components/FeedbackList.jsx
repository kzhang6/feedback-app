import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from "./FeedbackItem"
import Spinner from "./shared/Spinner"
import FeedbackContext from '../Context/FeedbackContext'

function FeedbackList() {
    /* getting data from FeedbackContext.Provider value rather than passed in as a prop from App.js */
    const {feedback, isLoading} = useContext(FeedbackContext) //

    if (!isLoading && (!feedback || feedback.length === 0)) { //not loading, and no feedback or length is 0
        return <p>No Feedback Yet</p>
    }

    return isLoading ? ( <Spinner /> )  : ( //load spinner component if isLoading
        <div className='feedback-list'>
                    <AnimatePresence>
                        {feedback.map((item) => (
                            <motion.div 
                                key={item.id}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >                    
                                <FeedbackItem key={item.id} item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
    )

//without animation
//     return (
//     <div className='feedback-list'>
//         {feedback.map((item) => (
//             <FeedbackItem key={item.id} item={item} handleDelete={(handleDelete)}/>
//         ))}
//     </div>
//   )
}

export default FeedbackList