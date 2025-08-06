import SingleData from './SingleData'
import Country from './Country'

const Filter = ({ filteredData, search }) => {
    if (filteredData.length > 10) {
        return <p>Too many matches, specify another filter!</p>
    } else if (filteredData.length === 1) {
        return <SingleData filteredData={filteredData} />
    } else if (filteredData.length <= 10) {
        return (
            <div>
                {filteredData.map(country => (
                    <Country key={country.area} state={country}/>
                ))}
            </div>
        )
    }
}

export default Filter