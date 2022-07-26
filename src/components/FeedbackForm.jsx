import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../Context/FeedbackContext'

function FeedbackForm() {
const[text, setText] = useState('')
const[rating, setRating] = useState(10)
const[btnDisabled, setbtnDisabled] = useState(true)
const[message, setMessage] = useState('')

const{addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

useEffect(() => {
    // console.log('Hello')
    if (feedbackEdit.edit === true) { //if user is trying to edit
        setbtnDisabled(false) //enable send button
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
}, [feedbackEdit]) //side effect when clicking on the edit button

const handleTextChange = (e) => {
    if (text === '') {
        setbtnDisabled(true)
        setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
        setbtnDisabled(true)
        setMessage('Text must be at least 10 characters')
    } else {
        setMessage(null)
        setbtnDisabled(false)
    }
    
    setText(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10 ){
        const newFeedback = {   //construct a new Feedback object
            text, //shorthand for text: text, which means setting the text field of this object to the text state of this class
            rating,
        }
        // console.log(newFeedback)

        if (feedbackEdit.edit === true) {
            /* pass in the newly constructed feedback object if we're updating the feedback */
            updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
            addFeedback(newFeedback)
        }

        setText('')
    }
}
  return (
    <Card>
    <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className='input-group'>
            <input 
                onChange={handleTextChange} 
                type='text' 
                placeholder='Write a review' 
                value={text}  /* view at components extension */
            />
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className='message'>{message}</div>}
    </form>
    </Card>

  )
}

export default FeedbackForm