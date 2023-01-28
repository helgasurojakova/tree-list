import '../sass/main.sass'

const navbarItem = (title: string, name?: string) => {
  return (
    <div className={`navbar-item${name ? ' navbar-item-' + name : ''}`}>
      <span className="navbar-item-icon"></span>
      {title}
    </div>
)
  }

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-button">
        <div className="navbar-button-title">
          Название проекта
          <span className="navbar-button-title-abbr">Аббревиатура</span>
        </div>
        <span className="navbar-button-icon"></span>
      </div>
      {navbarItem('Item 1')}
      {navbarItem('Item 2', 'active')}
      {navbarItem('Item 3')}
    </div>
  )
}
export default Navbar
