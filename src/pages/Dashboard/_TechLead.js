import React from 'react';
import { useSelector } from 'react-redux';

// local imports
import { useStyles } from './Styles';
import { CardWithcount } from '../../components';

export default function TechLead() {
    const {
        projectCount,
        customerCount,
        completed,
        ongoing,
        suspended,
    } = useSelector(state => state.login.dashboardData);

    const styles = useStyles();

    return (
        <div className='tech-lead'>
            <div className={styles.container}>
                <div>
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
                        <div className={styles.secondaryCards}>
                            <CardWithcount
                                title='# of Customers'
                                count={customerCount}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.requirements}>

                </div>
            </div>
        </div>
    )
}
