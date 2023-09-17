import "./Footer.css"

const Footer: React.FC<{}> = () => {

  return (
    <>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />


      <div className="footer-container">
        <div className="btn-container">
          <button className="addBtn"><span className="material-symbols-outlined">add</span></button>
        </div>
      </div>

    </>
  )
}

export default Footer;