import React from 'react';
import { useSelector } from 'react-redux';

// local imports
import { useStyles } from './Styles';
import { CardWithcount, Chart } from '../../components';

export default function Admin() {
    const {
        projectCount,
        customerCount,
        techLeadCount,
        completed,
        ongoing,
        suspended,
        lastDays,
        newProjects,
        payments
    } = useSelector(state => state.login.dashboardData);

    const styles = useStyles();

    const newProjectsData = newProjects.map((item, index) => {
        return {
            day: lastDays[index],
            projects: item
        }
    });

    const paymentsData = payments.map((item, index) => {
        return {
            day: lastDays[index],
            payments: item
        }
    });

    console.log(paymentsData);

    return (
        <div className='admin'>
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
                            <CardWithcount
                                title='# of Tech Leads'
                                count={techLeadCount}
                            />
                        </div>
                    </div>
                    <div className={styles.chartContainer}>
                        <Chart
                            title='Projects Started'
                            data={newProjectsData}
                            xDataKey='day'
                            areaDataKey='projects'
                        />
                        <Chart
                            title='Payments Received (USD)'
                            data={paymentsData}
                            xDataKey='day'
                            areaDataKey='payments'
                        />
                    </div>
                </div>
                <div className={styles.requirements}>
                    
                </div>
            </div>
        </div >
    )
}
