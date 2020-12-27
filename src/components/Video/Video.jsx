import React from 'react';

// component
import VideoCard from '../VideoCard/VideoCard';
import ErrorCard from '../ErrorCard/ErrorCard';

//styles
import { Grid } from '@material-ui/core';

const Video = ({ items, dispatch, tab, editMode }) => {
  return (
    <Grid item container spacing={2} justify="center">
      {items &&
        items.map((item) => {
          if (items[0]?.message) {
            return <ErrorCard key={1} {...item} />;
          } else {
            return (
              <VideoCard
                key={item.id}
                {...item}
                dispatch={dispatch}
                tab={tab}
                editMode={editMode}
                items={items}
              />
            );
          }
        })}
    </Grid>
  );
};

export default Video;
