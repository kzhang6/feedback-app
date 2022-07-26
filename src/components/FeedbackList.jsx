import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from '../Context/FeedbackContext'

function FeedbackList({handleDelete}) {
    /* getting data from FeedbackContext.Provider value rather than passed in as a prop from App.js */
    const {feedback} = useContext(FeedbackContext) //

    if (!feedback || feedback.length === 0) {
        return <p>No Feedback Yet</p>
    }

    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div 
                        key={item.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >                    
                        <FeedbackItem key={item.id} item={item} handleDelete={(handleDelete)}/>
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