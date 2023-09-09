import "./Menu.css"

interface MenuProps {
  hamburgerOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ hamburgerOpen }) => {
  return (
    <>
      <div className="menu-container">
        <p>account</p>
        <div className="menu-item">logout</div>
        <p>other</p>
        <div className="menu-item">about</div>
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