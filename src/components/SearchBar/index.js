import React, { useState, useEffect, useRef} from 'react';
import propTypes from 'prop-types';
//images
import searchIcon from '../../images/search-icon.svg'
//Styles
import { Wrapper, Content } from './SearchBar.styles'

const SearchBar = ({setSearchTerm}) => {
  //state is the value of search bar
  const [state, setState] = useState('')
  const initial = useRef(true)
  
  useEffect(() => {
    if(initial.current) {
      initial.current = false
      return
    }

    const timer = setTimeout(() => {
      setSearchTerm(state)
    }, 500)
    return () => clearTimeout(timer)
  }, [setSearchTerm, state])

  return(
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input 
          type="text" 
          placeholder='Search Movie'
          onChange={event => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  )
}

SearchBar.propTypes = {
  callback: propTypes.func
}

export default SearchBar
