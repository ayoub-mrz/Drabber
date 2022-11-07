import React from 'react'

function ShortCuts( {currentSection, switchInputPopUp} ) {

    let body = document.querySelector("body");
    body.addEventListener('keyup', (e) => {

    if (e.code === "NumpadAdd" && currentSection === "home") {
        switchInputPopUp("goal");
    } else if (e.code === "NumpadAdd" && currentSection === "today") {
        switchInputPopUp("task");
    }

    })
    
return (
    ""
)
}

export default ShortCuts