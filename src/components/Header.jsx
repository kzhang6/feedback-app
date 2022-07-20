function Header({text, bgColor, textColor}) {
    const headStyles = {
        backgroundColor: bgColor, color: textColor
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