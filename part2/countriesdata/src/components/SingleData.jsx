import axios from 'axios'
import { useState, useEffect } from 'react'
import CountryDetails from './CountryDetails'

const SingleData = ({ filteredData }) => {
    const country = filteredData[0]

    return (
        <div>
            <h2>{country.name.common}</h2>
            <CountryDetails country={country} />
        </div>
    )

}

export default SingleData