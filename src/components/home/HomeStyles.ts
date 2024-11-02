export const useStyles = {

    logo: {
        padding: "10px",
        width: "2em",
        minWidth: "150px",
    },


    bodyH2: {
        color: "white",
        padding: "5px",
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
        lineHeight: "1.7"
    },

    boxDrawer: {
        backgroundColor: '#060606',
        color: "#FFF"
    },
    toolbarDrawer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    boxMain: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        display: "flex",
        flexGrow: 1,
        borderRadius: "10px",
        background: "rgba(217, 217, 217, 0.10)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,

    },
    boxPaper: {
        color: "white",
        display: "flex",
        maxWidth: "380px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "60px",
    },
    textField: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "white ",
        margin: "6px",
    },
    button: {
        mt: 5,
        mb: 2,
        color: "white",
        backgroundColor: "#000",
        border: '2px solid',
        borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        padding: '10px',
        boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
        '&:hover': {
            backgroundColor: "#211f42"
        }
    },



};