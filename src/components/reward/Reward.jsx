/* eslint-disable default-case */
import React from 'react'


function Reward( {reward, setReward} ) {

    function updataReward(e, type) {
        let TargetValue = e.target.value;
        
        if (TargetValue >= 0 && TargetValue <= 100) {
            switch (type) {
                case "bronze":
                    TargetValue !== '' ? setReward({...reward, bronze: TargetValue}) : setReward({...reward, bronze: reward.bronze})
                    break;
                case "gold":
                    TargetValue !== '' ? setReward({...reward, gold: TargetValue}) : setReward({...reward, gold: reward.gold})
                break;
                case "diamond":
                    TargetValue !== '' ? setReward({...reward, diamond: TargetValue}) : setReward({...reward, diamond: reward.diamond})
                break;
            }
        } 

    }

    return (
    
        <div className='setting-control popUpMenu'>
        <div className='bronze popUpMenu'>
            <p className='popUpMenu'>Bronze</p>
            <input className='popUpMenu' type="number" placeholder={reward.bronze} min={0} max={100} onChange={(e) => {updataReward(e, "bronze")}}/>
            <span className='popUpMenu'>%</span>
        </div>
        <div className='gold popUpMenu'>
            <p className='popUpMenu'>Gold</p>
            <input className='popUpMenu' type="number" placeholder={reward.gold} min={0} max={100} onChange={(e) => {updataReward(e, "gold")}}/>
            <span className='popUpMenu'>%</span>
        </div>
        <div className='diamond popUpMenu'>
            <p className='popUpMenu'>Diamond</p>
            <input className='popUpMenu' type="number" placeholder={reward.diamond} min={0} max={100} onChange={(e) => {updataReward(e, "diamond")}}/>
            <span className='popUpMenu'>%</span>
        </div>
    </div>

)
}

export default Reward