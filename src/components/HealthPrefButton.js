import React from 'react'
import { AppContext } from '../App'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const HealthPrefButton = ({ pref }) => {

  const { setHealth, setPageSelected, handleClearFilters } = useContext(AppContext);

  return (
    <button onClick={() => {
      handleClearFilters()
      setHealth([pref])
      setPageSelected("Recipes")
    }} className='font-dm-sans py-2 px-4 bg-[var(--badge-btn)] text-[var(--text)] hover:bg-[var(--badge-btn-hover)] 2xl:text-2xl transition-colors duration-300 rounded-full text-sm'><Link to={`/${pref}`} className='h-full w-full'>{pref}</Link></button>
  )
}

export default HealthPrefButton