import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import PropTypes from 'prop-types';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink.jsx'
import AboutPage from './pages/AboutPage'
import FeedbackData from './data/FeedbackData';
import {FeedbackProvider} from './Context/FeedbackContext' //FeedbackProvider is not a default export in that component

function App() {
const [feedback, setFeedback] = useState(FeedbackData)

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4() //generate a unique ID for each feedback
        setFeedback([newFeedback,...feedback]) //adding a new feedback to the current array of old feedbacks
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    return (
        <FeedbackProvider>
            <Router>
                {/* pass props into component Header */}
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={
                            <>
                            <FeedbackForm handleAdd={addFeedback}/>
                            <FeedbackStats feedback={feedback} />
                            <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
                            </>
                        }> 

                        </Route>

                        {/* <AboutPage /> */}
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                    <AboutIconLink />
                </div>
            </Router>
    </FeedbackProvider>
    )
}

Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default App