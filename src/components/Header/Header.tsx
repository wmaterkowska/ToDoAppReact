import "./Header.css"

import { useState } from "react";

import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";
import Menu from "components/Menu/Menu"

const Header: React.FC<{}> = () => {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger(event: React.MouseEvent) {
    event.preventDefault();
    let openClose = !hamburgerOpen;
    setHamburgerOpen(openClose);
  }


  return (
    <>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />

      <div className="header-container">
        <div className="logo">TodoList</div>
        {/* <div className="options-container"> */}
        <ThemeSwitch />
        <Menu hamburgerOpen={hamburgerOpen}></Menu>

        {/* <div className="menu-container">
          <div>logout</div>
          <hr></hr>
          <div>About</div>
        </div> */}

        <div onClick={toggleHamburger} className="menu"><span className="material-symbols-outlined">menu</span> </div>

        {/* </div> */}
      </div>

      <hr></hr>

    </>
  )

}

export default Header;