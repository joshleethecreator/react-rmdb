import React from 'react';
import propTypes from 'prop-types';
// Helpers
import { calcTime, convertMoney } from '../../helpers';
// Styles
import { Wrapper, Content } from './MovieInfoBar.styles';

const MovieInfoBar = ({time, budget, revenue, releaseDate}) => {
  return(
    <Wrapper>
      <Content>
        <div className="column">
          <p>Running time: {calcTime(time)}</p>
        </div>
        <div className="column">
          <p>Budget: {convertMoney(budget)}</p>
        </div>
        <div className="column">
          <p>Revenue: {convertMoney(revenue)}</p>
        </div>
        <div className="column">
          <p>Release Date: {releaseDate}</p>
        </div>
       </Content>
      </Wrapper>
  )
}

MovieInfoBar.propTypes = {
  time: propTypes.number,
  budget: propTypes.number,
  revenue: propTypes.number,
  releaseDate: propTypes.string
}

export default MovieInfoBar