import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        columnGap: "20px"
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "270px 1fr"
    },
    secondaryCards: {
        display: "flex",
        alignItems: "flex-start",
    },
    chartContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginTop: "20px"
    },
});
