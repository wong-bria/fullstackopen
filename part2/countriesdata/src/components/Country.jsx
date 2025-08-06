import { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ state }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <div>
            {state.name.common + ' '}
            <button onClick={toggleDetails}>Show</button>
            {showDetails && <CountryDetails country={state} />}
        </div>
    )
}

export default Country