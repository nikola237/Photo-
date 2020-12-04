import React from 'react';
// import { useHistory } from 'react-router-dom';

// component
import VideoCard from '../VideoCard/VideoCard';
import ErrorCard from '../ErrorCard/ErrorCard';

//utils
// import { handleDownloadItem, removeItem } from '../utils.js';

//styles
import { Grid } from '@material-ui/core';
// import { useStyles } from './Video.styles';

const Video = ({ items, dispatch, tab }) => {
  // const history = useHistory();

  // const classes = useStyles();

  // const handleItem = () => {
  //   dispatch({ type: 'EDIT_ITEM', payload: id });
  //   history.push(`/edit/${id}`);
  // };

  return (
    <Grid item container>
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
              />
            );
          }
        })}
    </Grid>
  );
};

export default Video;
