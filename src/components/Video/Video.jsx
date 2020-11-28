import React from 'react';
import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import { useHistory } from 'react-router-dom';

import { handleDownloadItem, removeItem } from '../utils.js';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { useStyles } from './Video.styles';

const Video = ({ pathShort, originalname, tags, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  const classes = useStyles();

  const handleItem = () => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    history.push(`/edit/${id}`);
  };

  console.log('VIDEO');
  return (
    <Card className={classes.root} variant="outlined">
      {items[0]?.message ? (
        <div>{items[0].message}</div>
      ) : (
        <div onContextMenu={(e) => e.preventDefault()}>
          <CardHeader
            style={{ fontSize: 1.2 }}
            className={classes.title}
            title={`${originalname}`}
          />
          <CardMedia
            component="video"
            controlsList="nodownload"
            controls
            image={`http://93.86.249.163:3030/items/display/${pathShort}`}
            type="/video.mp4"
          />
          <CardContent className={classes.content}>
            <Typography
            // variant="body1"
            // color="textSecondary"
            // component="p"
            >{`TAGOVI: ${tags}`}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={handleItem}>
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleDownloadItem(pathShort, filename)}
            >
              Download
            </Button>
            <Button size="small" color="primary" onClick={() => removeItem()}>
              Delete
            </Button>
          </CardActions>
        </div>
      )}
    </Card>
  );
};

export default Video;
