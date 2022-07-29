import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import PropTypes from 'prop-types';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink.jsx'
import AboutPage from './pages/AboutPage'
import {FeedbackProvider} from './Context/FeedbackContext' //FeedbackProvider is not a default export in that component

function App() {
    return (
        <FeedbackProvider>
            <Router>
                {/* pass props into component Header */}
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={
                            <>
                            <FeedbackForm />
                            <FeedbackStats />
                            <FeedbackList />
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
    text: 'Kristine\'s Feedback UI Exercise',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default App