import { useState } from 'react';

export const useGraphhoperToken = () => {
  const tokens = process.env.REACT_APP_ROUTING_API_KEY?.split(',');
  const randIndex = Math.floor(Math.random() * tokens.length);

  const [token, setToken] = useState(tokens[randIndex]);

  const getToken = () => {
    const index = tokens?.findIndex((t) => t === token);

    if (index === tokens?.length - 1) setToken(tokens[0]);
    else setToken(tokens[index + 1]);

    return token;
  };

  return { getToken };
};
