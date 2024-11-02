export const useStyles = {

    bodyContainer: {
        height: '100vh',
        width: '95%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
        padding: "0",
    },
    leftContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    logo: {
        padding: "18px",
        width: "30rem",
        minWidth: "300px",
    },
    textContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pb: "20px",
    },
    bodyH1: {
        color: "white",
        padding: "20px",
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
        lineHeight: "1.7"
    },
    bodyH2: {
        color: "white",
        padding: "5px",
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
        lineHeight: "1.7"
    },

    paper: {
        display: "flex",
        borderRadius: "10px",
        background: "rgba(217, 217, 217, 0.10)",
        justifyContent: "center",
        alignItems: "center",  
        padding: "40px",
     },
    boxPaper: {
        color: "white",
        display: "flex",
        maxWidth: "420px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px",
    },
    textField: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "white ",
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