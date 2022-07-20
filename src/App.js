import { useState } from 'react'
import Header from './components/Header'
import PropTypes from 'prop-types';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';

function App() {
const [feedback, setFeedback] = useState(FeedbackData)

    return (
    <>
        {/* pass props into component Header */}
        <Header />
        <div className='container'>
            <FeedbackList feedback={feedback}/>
        </div>
    </>
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