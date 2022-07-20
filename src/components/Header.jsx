function Header({text}) {
    const headStyles = {
        backgroundColor: 'blue', color: 'red'
    }

  return (
    <header style={headStyles}>
        <div className="container">
            <h2>{text}</h2>
        </div>
    </header>
  )
}

export default Header