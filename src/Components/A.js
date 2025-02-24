import React from 'react';
import { Mixpanel } from '../Mixpanel';

const A = ({ href, children }) => {
    return (
      <a style={{
        display: 'flex',
        alignItems: 'center',
      }} onClick={() => {
        Mixpanel.track(href);
      }} href={href}>
        {children}
      </a>
    )
  }

export default A;