import React from 'react';
import propTypes from 'prop-types';
import { Wrapper, Content } from './Grid.styles'

const Grid = ({ header, children }) => {
  return(
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  )
}

Grid.propTypes = {
  header: propTypes.string
}

export default Grid