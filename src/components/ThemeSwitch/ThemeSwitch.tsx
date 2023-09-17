import "./ThemeSwitch.css"

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ThemeSwitch: React.FC<{}> = () => {

  // const [theme, setTheme] = useState("light");
  const [isDark, setIsDark] = useState(false)

  const systemPreferDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: light)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );

  useEffect(() => {
    if (!isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  function handleSwitchClick(event: React.MouseEvent) {
    event.preventDefault();
    let newTheme = !isDark;
    setIsDark(newTheme);
  }

  return (
    <>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />

      <button className="switchBtn" onClick={handleSwitchClick}>
        {isDark == false ? (
          <span className="material-symbols-outlined">light_mode</span>
        ) : (
          <span className="material-symbols-outlined">dark_mode</span>
        )}
      </button>

    </>
  )
}

export default ThemeSwitch;