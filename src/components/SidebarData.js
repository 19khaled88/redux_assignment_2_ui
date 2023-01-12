import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressCard,faGauge,faComment,faChartPie,faBars} from '@fortawesome/free-solid-svg-icons'
export  const menuItem=[
    {
        path:'/dashboard',
        name:"dashboard",
        icon:<FontAwesomeIcon icon={faGauge}/>
    },
    {
        path:'/analytics',
        name:"analytics",
        icon:<FontAwesomeIcon icon={faChartPie}/>
    },
    {
        path:'/comment',
        name:"comment",
        icon:<FontAwesomeIcon icon={faComment}/>
    },
    {
        path:'/about',
        name:"about",
        icon:<FontAwesomeIcon icon={faAddressCard}/>
    },
]
    
