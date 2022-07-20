import Header from './components/Header'
import PropTypes from 'prop-types';

function App() {
    return (
    <>
        {/* pass props into component Header */}
        <Header text={3}/>
        <div className='container'>
            <h1>My App</h1>
        </div>
    </>
    )
}

Header.defaultProps = {
    text: 'Feedback UI',
}

Header.propTypes = {
    text: PropTypes.string
}

export default App