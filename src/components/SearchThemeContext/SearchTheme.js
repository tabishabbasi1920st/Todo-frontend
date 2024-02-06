import React from 'react'

const SearchThemeContext = React.createContext({
    searchInput:"",
    onChangeSearchInput:() => {}
})

export default SearchThemeContext