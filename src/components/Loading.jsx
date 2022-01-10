import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className="loading">
      <ReactLoading
        type="spinningBubbles"
        color="#d95948"
        width="80vw"
        height="80vh"
      />
    </div>
  );
}
