import "./Menu.css"

interface MenuProps {
  hamburgerOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ hamburgerOpen }) => {

  function handleLogOut() {
    document.cookie = "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/';
  }

  return (
    <>
      <div className="menu-container">
        <p>account</p>
        <button className="menu-item" onClick={handleLogOut}>logout</button>
        <p>other</p>
        <button className="menu-item">about</button>
      </div>

      <style>{`
      .menu-container {
        display: ${hamburgerOpen ? 'inline' : 'none'}
      }
      `} </style>
    </>
  )
}

export default Menu;