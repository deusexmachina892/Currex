import React from 'react';

const SeeAllCast = () => {
    <button style={{ fontSize: '20px' }}>
        See All (42) Cast
    </button>
}

const cast  = ['Javascript', 'JSX', 'Hooks', 'Suspense'];
export default () => {
    return(
        <div>
            <h3>Cast</h3>
            <div className='Cast'>
              {cast.map(castItem => {
                  return(
                      <div className='CastItem' key={castItem}>
                          { castItem }
                      </div>
                  )
              })}
            </div>
            <SeeAllCast />
        </div>
    )
}