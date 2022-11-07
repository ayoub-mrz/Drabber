import React from 'react'

function Msg( {UndoDelete} ) {
  return (
    
    <div className='msg-container'>
      <div id='main-msg' className='main-msg'>
          
        </div>
        
        <div className='delete-msg'>

          <div className='delete-card'>
            <div className='delete-title'>"<div className='delete-name overFlow-text-hide'>build tha app in 9:00AM</div>" is deleted</div>
            <div className='line'></div>
            <button className='btn-wbc' onClick={(e) => {UndoDelete(); e.target.parentElement.parentElement.style.cssText = ''}}>Undo</button>
          </div>

        </div>

    </div>

  )
}

export default Msg