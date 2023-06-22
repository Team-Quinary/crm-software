import React from 'react';
import { useSelector } from 'react-redux';

// local imports
import { useStyles } from './Styles';
import { CardWithcount } from '../../components';

export default function Customer() {
    const {
        projectCount,
        completed,
        ongoing,
        suspended,
    } = useSelector(state => state.login.dashboardData);

    const styles = useStyles();

    return (
        <div className='customer'>
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    <CardWithcount
                        title='# of Projects'
                        count={projectCount}
                        summary={[
                            { title: 'Completed', count: completed },
                            { title: 'Ongoing', count: ongoing },
                            { title: 'Suspended', count: suspended }
                        ]}
                    />
                </div>
            </div >
        </div >
    )
}
