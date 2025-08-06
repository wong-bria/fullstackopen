import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      allCountries.filter(country =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )
    )
  }, [allCountries, newFilter])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      Find countries:{' '}
      <input value={newFilter} onChange={handleFilterChange} />
      <Filter filteredData={filteredCountries} search={newFilter} />
    </div>
  )
}

export default App