import React from 'react'
import LogoSvg from './../../assets/LogoSvg'
import HomeSvg from './../../assets/HomeSvg'
import TodaySvg from './../../assets/TodaySvg'
import ThisWeekSvg from './../../assets/ThisWeekSvg'
import PomodoroSvg from './../../assets/PomodoroSvg'
import HistorySvg from './../../assets/HistorySvg'
import GoalSvg from './../../assets/GoalSvg'

function Sidebar( {appData, setCurrentSection, userProfile, setGoalData, updateProgressDay} ) {

    let goals = userProfile[0].goals.filter(goal => !goal.itsDone)

    const barInfo = [
        {title: "home"},
        {title: "today"},
        {title: "thisWeek"},
        {title: "goal"},
        {title: "pomodoro"},
        {title: "history"},
    ]

    function ChangeActive(e, section) {

        setTimeout(() => {
            let linksArray = document.querySelectorAll('.sideBar .links .link')
            // remove active class
            linksArray.forEach(link => {
                link.classList.remove('active');
            })
            // add active to clicked link
            linksArray.forEach(link => {
                if (link.classList.value.includes(e)) {
                link.classList.add('active');
                }
            })

            // Return App Name
            document.querySelector('head title').textContent = 'Drabber'

            // Change Current Section
            setCurrentSection(section)
        }, 400);

        // transition animation 
        const content = document.querySelector(".content")
        const sideBar = document.querySelector(".sideBar");
        fadeInFadeOut(content, sideBar);
    
    }

    function fadeInFadeOut(e, sideBar) {
        e.style.opacity = '0';
        sideBar.style.pointerEvents = 'none';
        setTimeout(() => {
            e.style.opacity = '1';
            sideBar.style.pointerEvents = 'unset';
        }, 500);
    }

    let date = new Date().getDay();

    let letters = ["S", "M", "T", "W", "T", "F", "S"]

    // appdate reward 
    const arrayDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let localDate = arrayDays[new Date().getDay()];
    

    return (
        <div className={appData[0].animation ? "sideBar unsetTransform" : "sideBar"}>

            <div className='head'>
                <div className='logo'>
                    <LogoSvg />
                    <span>rubber</span>
                </div>
            </div>

            <div className='links'>

                {barInfo.map((link, i) => (

                    <div className={link.title} key={link.title}>

                        {link.title !== "goal" ?
                        <div className={`link ${link.title}`} onClick={() => {ChangeActive(link.title, link.title); updateProgressDay(userProfile[0].thisWeek[localDate]);}} >
                            <div className='bg'></div>
                            <div className='img'>
                                {i === 0 ? <HomeSvg /> : null}
                                {i === 1 ? <TodaySvg /> : null}
                                {i === 2 ? <ThisWeekSvg /> : null}
                                {i === 4 ? <PomodoroSvg /> : null}
                                {i === 5 ? <HistorySvg /> : null}
                                {link.title === "today" ? <span>{letters[date]}</span> : null}
                            </div>
                            <p>{link.title}</p>
                        </div>
                        : 
                        <div className='goals-links'>
                                <div className='title'>Goals({goals.length})</div>
                                <div className="links-bar">
                                    {goals.map(goal => (
                                        <div id={goal.id} className={`link ${goal.id}`} key={goal.id} onClick={(e) => {ChangeActive(goal.id, goal);setGoalData(goal.id)}}>
                                            <div className='bg'></div>
                                            <div className='img'>
                                                <GoalSvg />
                                            </div>
                                            <p className='overFlow-text-hide'>{goal.title}</p>
                                        </div>
                                    ))}
                                </div>
                        </div> 
                        }

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Sidebar