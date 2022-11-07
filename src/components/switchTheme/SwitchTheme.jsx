import React from 'react'
import Sun from './../../assets/Sun'
import Moon from './../../assets/Moon'

function SwitchTheme( {mainTheme, setMainTheme, apdateData, storage} ) {

    function switchTheme() {
        if (mainTheme.theme === 'dark') {
            setMainTheme({...mainTheme, "theme": "light"})
            if (storage ==="local") {
                apdateData("currentTheme", "light")
            }
        } else {
            setMainTheme({...mainTheme, "theme": "dark"})
            if (storage === "local") {
                apdateData("currentTheme", "dark")
            }
        }
    }


    return (
        <button className='toggleTheme dataUpdate' onClick={() => {switchTheme()}}>
            {mainTheme.theme === "dark" ? <Sun color={"#ffffff"} /> : <Moon color={"#000000"} />}
        </button>

)
}

export default SwitchTheme