import React from 'react'
import LogoSvg from './../../assets/LogoSvg';
import SwitchTheme from './../../components/switchTheme/SwitchTheme';

function Navbar_intro( { mainTheme, setMainTheme, toggleBetweenForms }) {

    return (
    <div className='intro-nav'>
        <div className='logo'>
            <LogoSvg />
            <span>rubber</span>
        </div>
        <div className='btn-ctn'>
            <SwitchTheme mainTheme={mainTheme} setMainTheme={setMainTheme} storage={"sesstion"}/>
            <button id="signin" className='btn-bc signin' onClick={(e) => {toggleBetweenForms(e)}}>Sign In</button>
            <div className='line'></div>
            <button id="signup" className='btn-wbc signup' onClick={(e) => {toggleBetweenForms(e)}}>Sign Up</button>
        </div>
    </div>
)
}

export default Navbar_intro