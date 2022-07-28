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
        const response = await fetch("/feedback?_sort=id&_order=desc") //1. use proxy for domain name in json server 2. query parameters from the json server
        const data = await response.json()

        // console.log(data);
        setFeedback(data)
        setIsLoading(false)
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })
        const data = await response.json()  //get data from json response
        setFeedback([data,...feedback]) //adding a new feedback to the current array of old feedbacks
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`, { method: 'DELETE' })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(updItem),
        })

        const data = await response.json()
        console.log(data)

        /* if the id matchers, then replace the old item with the new updItem  */
        setFeedback(feedback.map((item) => (item.id === id ? data : item)))

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