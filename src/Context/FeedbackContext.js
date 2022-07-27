import {v4 as uuidv4} from 'uuid'
import { createContext, useState, useEffect } from "react";
// import matchers from '@testing-library/jest-dom/matchers';

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)    //isLoading default to true
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,    //true when clicking on the edit button
    })

    useEffect(() => {
        fetchFeedback()
    }, []) //empty dependency: to run only once when the page loads

    const fetchFeedback = async () => {
        const response = await fetch("http://localhost:3001/feedback?_sort=id&_oder=desc") //query parameters from the json server
        const data = await response.json()

        // console.log(data);
        setFeedback(data)
        setIsLoading(false)
    }

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
        isLoading,
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