import react from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ReportIcon from '@mui/icons-material/Subject';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

export const SidebarData = [
    {
        title:"Dashboard",
        icon:<DashboardIcon/>,
        link:"/Dashboard"
    },
    {
        title:"Questions",
        icon:<UploadFileIcon/>,
        link:"/Questions"
    },
    {
        title:"Reports",
        icon:<ReportIcon/>,
        link:"/Report"
    },
    {
        title:"Plans",
        icon:<SubscriptionsIcon/>,
        link:"/Plans"
    },
    {
        title:"Authentication",
        icon:<PeopleIcon/>,
        link:"/Authentication"
    },
    {
        title:"Statistics",
        icon:<BarChartIcon/>,
        link:"/Statistics"
    },
]