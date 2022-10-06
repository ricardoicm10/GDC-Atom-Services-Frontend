import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader"
import "./Spinner.css"

function Spinner({loading,background}){

    return(
        loading &&
        <div className={background?"spinner-background":"spinner"}>
            <PacmanLoader color="var(--mainColorLight)" loading={loading} size={60}/>
        </div>
    )
}

export default Spinner