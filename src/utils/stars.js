import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import {useLocalStorage} from 'react-use';

const StarsContext = createContext();
export function useStars() {
  return useContext(StarsContext);
}

export function StarsProvider(props) {
  const [stars, setStars] = useLocalStorage('stars', {});

  function resetStars(candidates) {
    setStars(prevStars => ({
      ...prevStars,
      ...candidates.reduce(
        (acc, candidate) => ({
          ...acc,
          [candidate.id]: []
        }),
        {}
      )
    }));
  }

  function toggleStar(candidateId, topicId) {
    setStars(prevStars => {
      const prevCandidateStars = prevStars[candidateId];
      return {
        ...prevStars,
        [candidateId]: prevCandidateStars
          ? prevCandidateStars.includes(topicId)
            ? prevCandidateStars.filter(id => id !== topicId)
            : [...prevCandidateStars, topicId]
          : [topicId]
      };
    });
  }

  return (
    <StarsContext.Provider
      value={{
        stars,
        toggleStar,
        resetStars
      }}
    >
      {props.children}
    </StarsContext.Provider>
  );
}

StarsProvider.propTypes = {
  children: PropTypes.node.isRequired
};
