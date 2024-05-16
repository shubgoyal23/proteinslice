import React, { useEffect, useState } from "react";

function Theme() {
   const [mode, setMode] = useState("");

   function themeswitch(theme) {
      if (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
         setMode("dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
         setMode("light");
      }
   }

   useEffect(() => {
      let theme = localStorage.getItem("theme");
      if (theme) {
         themeswitch(theme);
      } else {
         themeswitch("system");
      }
   }, []);

   const handleThemeChange = () => {
      const newMode = mode === "dark" ? "light" : "dark";
      themeswitch(newMode);
      setMode(newMode);
   };

   return (
      <>
         <div className="block md:h-20 md:pt-4">
            <button
               className="text-2xl font-medium hover:text-amber-400 text-lime-500 py-2 px-2"
               onClick={handleThemeChange}
            >
               <i
                  className={`fa-regular fa-${
                     mode === "dark" ? "moon" : "sun"
                  }`}
               />
               <span className="md:hidden ml-2">{mode}</span>
            </button>
         </div>
      </>
   );
}

export default Theme;
