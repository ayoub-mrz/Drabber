import React from 'react';
import user from './../../assets/ayoub.jpg';
import UserSvg from './../../assets/user';



function Account( {appData, mainTheme, setMainTheme, apdateData, logOut} ) {

  function changeColor (color) {
    setMainTheme({...mainTheme, "color": color});
    apdateData("currentColor", color);
  }


  return (
      
    <div className='setting-account popUpMenu'>
    <div className='account-info popUpMenu'>
        <div className='user-photo popUpMenu'>
          <div className='pic popUpMenu'>
            <UserSvg />
            <img src={user} alt="user" className='popUpMenu'/>
          </div>
        </div>
        <div className='user-name popUpMenu'>{appData[0].currentUser}</div>
    </div>
    <div className='line popUpMenu'></div>
    <div className='control-colors popUpMenu'>
      <div className='title popUpMenu'>Change Color</div>
      <div className='colors popUpMenu'>
        <div className={mainTheme.color === "syan" ? "syan active popUpMenu" : "syan popUpMenu"} onClick={() => {changeColor("syan")}}></div>
        <div className={mainTheme.color === "purple" ? "purple active popUpMenu" : "purple popUpMenu"} onClick={() => {changeColor("purple")}}></div>
        <div className={mainTheme.color === "blue" ? "blue active popUpMenu" : "blue popUpMenu"} onClick={() => {changeColor("blue")}}></div>
        <div className={mainTheme.color === "yellow" ? "yellow active popUpMenu" : "yellow popUpMenu"} onClick={() => {changeColor("yellow")}}></div>
      </div>
    </div>
    <div className='line popUpMenu'></div>
    <div className="logOut popUpMenu">
      <button className='btn-wbc popUpMenu' onClick={() => {logOut()}}>Log Out</button>
      <button className='btn-wbc popUpMenu' onClick={() => {console.log('hi')}}>Save Data</button>
    </div>
  </div>

  )
}

export default Account