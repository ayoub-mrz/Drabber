import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Loading_page() {
  return (
    <div className='loading-background'>
        <div>
          <ScaleLoader color="var(--drb-Main-Color)" />
          <h4>Loading...</h4>
        </div>
    </div>
  )
}

export default Loading_page