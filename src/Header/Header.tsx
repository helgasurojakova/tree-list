import './Header.style.sass'

export const Header = () => {
  return (
    <div className="header">
      <button className="menu-button"></button>
      <button className="return-button"></button>
      <button className="button button-active">Просмотр</button>
      <button className="button">Управление</button>
    </div>
  )
}
