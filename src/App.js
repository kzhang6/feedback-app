import Header from './components/Header'
import PropTypes from 'prop-types';

function App() {
    return (
    <>
        {/* pass props into component Header */}
        <Header />
        <div className='container'>
            <h1>My App</h1>
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