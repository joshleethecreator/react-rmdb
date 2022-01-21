import React from 'react';

import { Wrapper } from './Button.styles';

const button = ({text, callback}) => {
  return(
    <Wrapper type='button' onClick={callback}>
      {text}
    </Wrapper>
  )
}

export default button