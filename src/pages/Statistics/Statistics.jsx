import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';

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
      <div className={classes.sidebarWrapper}>
        <SideBar />
      </div>

      <Grid
        container
        item
        xs={11}
        justify="space-between"
        wrap="wrap"
        className={classes.heading}
      >
        <Grid
          container
          item
          justify="space-around"
          alignItems="center"
          sm={12}
          md={5}
          className={classes.picker}
        >
          <div className="datePickerBackground"></div>
          <MuiPickersUtilsProvider locale={srLocale} utils={DateFnsUtils}>
            <KeyboardDatePicker
              okLabel="У реду"
              clearLabel="Поништи"
              cancelLabel="Одустани"
              id="date-picker-dialog"
              label="Датум почетка"
              format="dd/MM/yyyy"
              value={selectedDateStart}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            <KeyboardDatePicker
              okLabel="У реду"
              clearLabel="Поништи"
              cancelLabel="Одустани"
              // id="date-picker-dialog"
              label="Датум завршетка"
              format="dd/MM/yyyy"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid
          container
          justify="space-around"
          item
          sm={12}
          md={7}
          className={classes.buttons}
        >
          <div className={classes.typeButton} onClick={() => changeType(0)}>
            <div className="buttonBackground"></div>
            <p>Слике</p>
          </div>
          <div className={classes.typeButton} onClick={() => changeType(1)}>
            <div className="buttonBackground"></div>
            <p>Видео</p>
          </div>
          <div className={classes.typeButton} onClick={() => changeType(2)}>
            <div className="buttonBackground"></div>
            <p>Аудио</p>
          </div>
          <div className="totalCount">
            <p className="totalCount-title">Укупан број преузимања</p>
            <p className="totalCount-number">{downloads}</p>
            <div className="totalCountBottom"></div>
          </div>
        </Grid>
      </Grid>

      {dataUsers.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <div className="chart1stLevel"></div>
            <div className="chart2stLevel"></div>
            <UserChart
              data={dataUsers}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></UserChart>
          </div>
          <div className="chart">
            <div className="chart1stLevel"></div>
            <div className="chart2stLevel"></div>
            <TopUserChart data={dataUsers}></TopUserChart>
          </div>
        </div>
      )}
      {dataProjects.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <div className="chart1stLevel"></div>
            <div className="chart2stLevel"></div>
            <ProjectChart
              data={dataProjects}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></ProjectChart>
          </div>
          <div className="chart">
            <div className="chart1stLevel"></div>
            <div className="chart2stLevel"></div>
            <TopProjectChart data={dataProjects}></TopProjectChart>
          </div>
        </div>
      )}
      {dataUsers.length === 0 && dataProjects.length === 0 && (
        <h1 className="noResults">Нема резултата за изабране критеријуме</h1>
      )}
    </Grid>
  );
};

export default Statistics;
