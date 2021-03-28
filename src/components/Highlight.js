import * as React from 'react';
import PropTypes from 'prop-types';

function Highlight({ children, toHighlight }) {
  const targetWithPlusSignSanitized = React.useMemo(
    () => toHighlight.replace(/\+/g, '\\+'),
    [toHighlight]
  );

  const regex = React.useMemo(
    () => new RegExp(`(${targetWithPlusSignSanitized})`, 'i'),
    [targetWithPlusSignSanitized]
  );

  return children.split(regex).map((chunk, index) => {
    if (toHighlight && chunk.toLowerCase() === toHighlight.toLowerCase()) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <mark key={`${chunk}-${index}`} className="bg-info text-white">
          {chunk}
        </mark>
      );
    }

    return chunk;
  });
}

Highlight.propTypes = {
  children: PropTypes.string.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default Highlight;
