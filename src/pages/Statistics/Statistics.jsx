import React, { useState, useEffect } from 'react';

//api
import api from '../../api/api';

//css
import './Statistics.styles.css';

//styles

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import srLocale from 'date-fns/locale/sr-Latn';
import { useStyles } from './Statistics.styles';
import Grid from '@material-ui/core/Grid';

//components
import UserChart from '../../components/UserChart/UserChart';
import ProjectChart from '../../components/ProjectChart/ProjectChart';
import TopUserChart from '../../components/TopUserChart/TopUserChart';
import TopProjectChart from '../../components/TopProjectChart/TopProjectChart';

const Statistics = () => {
  const classes = useStyles();
  var datum = new Date();
  datum.setDate(datum.getDate() - 7);
  const [type, setType] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [selectedDateStart, setSelectedDateStart] = useState(
    datum.getFullYear() + '-' + (datum.getMonth() + 1) + '-' + datum.getDate()
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(
    new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate()
  );

  const [dataProjects, setDataProjects] = useState({});
  const [dataUsers, setDataUsers] = useState({});

  const handleDateChangeStart = (date) => {
    setSelectedDateStart(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };
  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await api.get(
          `http://93.86.249.163:3030/stats/projects?startdate=${selectedDateStart}&enddate=${selectedDateEnd}&type=${type}`
        );
        const users = await api.get(
          `http://93.86.249.163:3030/stats/users?startdate=${selectedDateStart}&enddate=${selectedDateEnd}&type=${type}`
        );
        var countDownloads = 0;
        users.data.statCount.forEach((item) => {
          countDownloads += item.statsCount;
        });
        setDataProjects(projects.data.statCount);
        setDataUsers(users.data.statCount);
        setDownloads(countDownloads);
      } catch (error) {
        setDataProjects([]);
        setDataUsers([]);
        setDownloads(0);
      }
    };
    fetchData();
  }, [selectedDateStart, selectedDateEnd, type]);

  function changeType(type) {
    setType(type);
  }
  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
        xs={12}
        justify="space-around"
        wrap="wrap"
        className={classes.heading}
      >
        <Grid
          container
          item
          justify="space-around"
          alignItems="center"
          sm={12}
          md={6}
          className={classes.picker}
        >
          <MuiPickersUtilsProvider locale={srLocale} utils={DateFnsUtils}>
            <KeyboardDatePicker
              okLabel="U redu"
              clearLabel="Poništi"
              cancelLabel="Odustani"
              id="date-picker-dialog"
              label="Datum pocetka"
              format="dd/MM/yyyy"
              value={selectedDateStart}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            <KeyboardDatePicker
              okLabel="U redu"
              clearLabel="Poništi"
              cancelLabel="Odustani"
              // id="date-picker-dialog"
              label="Datum zavrsetka"
              format="dd/MM/yyyy"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid container item sm={12} md={6} className={classes.buttons}>
          <div
            className={` ${type === 0 ? classes.active : classes.typeButton}`}
            onClick={() => changeType(0)}
          >
            <p>Slike</p>
          </div>
          <div
            className={classes.typeButton}
            className={` ${type === 1 ? classes.active : classes.typeButton}`}
            onClick={() => changeType(1)}
          >
            <p>Video</p>
          </div>
          <div
            className={classes.typeButton}
            className={` ${type === 2 ? classes.active : classes.typeButton}`}
            onClick={() => changeType(2)}
          >
            <p>Audio</p>
          </div>
          <div className="totalCount">
            <p className="totalCount-title">Ukupan broj preuzimanja</p>
            <p className="totalCount-number">{downloads}</p>
          </div>
        </Grid>
      </Grid>

      {dataUsers.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <UserChart
              data={dataUsers}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></UserChart>
          </div>
          <div className="chart">
            <TopUserChart data={dataUsers}></TopUserChart>
          </div>
        </div>
      )}
      {dataProjects.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <ProjectChart
              data={dataProjects}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></ProjectChart>
          </div>
          <div className="chart">
            <TopProjectChart data={dataProjects}></TopProjectChart>
          </div>
        </div>
      )}
      {dataUsers.length === 0 && dataProjects.length === 0 && (
        <h1 className="noResults">Nema rezultata za izabrane kriterijume</h1>
      )}
    </Grid>
  );
};

export default Statistics;
