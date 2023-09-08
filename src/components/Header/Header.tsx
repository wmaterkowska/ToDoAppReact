import "./Header.css"

import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";

const Header: React.FC<{}> = () => {

  return (
    <>
      <div className="header-container">
        <div className="logo">TodoList</div>
        <div className="options-container">
          <ThemeSwitch />
        </div>
      </div>
      <hr></hr>
    </>
  )

}

export default Header;