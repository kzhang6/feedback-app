import {v4 as uuidv4} from 'uuid'
import { createContext, useState } from "react";
// import matchers from '@testing-library/jest-dom/matchers';

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10,
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating:9,
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 7,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,    //true when clicking on the edit button
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4() //generate a unique ID for each feedback
        setFeedback([newFeedback,...feedback]) //adding a new feedback to the current array of old feedbacks
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const updateFeedback = (id, updItem) => {
        /* if the id matchers, then replace the old item with the new updItem  */
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} :item))

        setFeedbackEdit({
            item: {},
            edit: false,
          })
    }

    /* when user clicks on the edit button */
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value = {{
        feedback, //shorthand for feedback: feedback
        feedbackEdit, //state that holds the item and the boolean

        /* functions */
        deleteFeedback,
        addFeedback,
        editFeedback, //function
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext