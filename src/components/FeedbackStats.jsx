import { useContext } from 'react'
import FeedbackContext from '../Context/FeedbackContext'

function FeedbackStats() {
    /* getting data from FeedbackContext.Provider value rather than passed in as a prop from App.js */
    const {feedback} = useContext(FeedbackContext) //

    //calculate ratings average
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/, '') //replace trailing zeros with ''

    return (
        <div className="feedback-stats">
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average)? 0 : average}</h4> {/* Display 0 if no feedback*/}
        </div>
    )
}

export default FeedbackStats