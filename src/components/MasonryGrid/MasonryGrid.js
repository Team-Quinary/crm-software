import React from 'react';
import Masonry from 'react-masonry-css';
import { createUseStyles } from 'react-jss';

// styles
const useStyles = createUseStyles((_theme_) => ({
    masonryGrid: {
        display: 'flex',
    },
    masonryColumn: {
        paddingLeft: 20,

        '&:last-child': {
            paddingRight: 20,
        },

        '&>div': {
            marginBottom: 20,
            marginTop: 20,
        },
    },
}));

const MasonryGrid = (props) => {
    const {
        children,
        breakpoints = {
            830: 2,
            1100: 3,
            1400: 4,
            default: 4,
        },
    } = props;

    const styles = useStyles();

    return (
        <Masonry
            breakpointCols={breakpoints}
            className={styles.masonryGrid}
            columnClassName={styles.masonryColumn}
        >
            {children}
        </Masonry>
    )
};

export default MasonryGrid;
