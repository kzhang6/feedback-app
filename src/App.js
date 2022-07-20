import Header from './components/Header'

function App() {
    return (
    <>
        {/* pass props into component Header */}
        <Header text="Hello World"/>
        <div className='container'>
            <h1>My App</h1>
        </div>
    </>
    )
}

Header.defaultProps = {
    text: 'Feedback UI'
}

export default App