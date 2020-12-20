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
import {useStyles} from './Statistics.styles';
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

  const [data, setData] = useState({});

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
        const result = await api.get(
          `http://93.86.249.163:3030/stats?size=10000&startdate=${selectedDateStart}&enddate=${selectedDateEnd}&type=${type}`
        )

        setData(result.data.rows);
        setDownloads(result.data.totalItems);
        
      } catch (error) {
        setData([]);
      }
      // const result = await api.get(
      //   `http://93.86.249.163:3030/stats?size=10000&startdate=${selectedDateStart}&enddate=${selectedDateEnd}&type=${type}`
      // )
      // if (
      //   result.data.rows.length > 0 &&
      //   result.data.rows[0].message !== 'Nothing found.'
      // ) {
      //   setData(result.data.rows);
      //   setDownloads(result.data.totalItems);
      // } else {
      //   setData([]);
      // }
    };
    fetchData();
  }, [selectedDateStart, selectedDateEnd, type]);

  function changeType(type) {
    setType(type);
  }
  return (
    <Grid container className={classes.container}>
      <Grid container item xs={12} justify="space-around"  wrap="wrap" className={classes.heading}>
        <Grid container item justify="space-around" alignItems="center" sm={12} md={6} className={classes.picker}>
          <MuiPickersUtilsProvider   locale={srLocale} utils={DateFnsUtils}>
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
                'aria-label': 'change date'
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
            className={` ${type==0 ? classes.active : classes.typeButton}`}
              onClick={() => changeType(0)}
            >
              <p>Slike</p>
            </div>
            <div className={classes.typeButton}
             className={` ${type==1 ? classes.active : classes.typeButton}`}
              onClick={() => changeType(1)}
            >
              <p>Video</p>
            </div>
            <div
              className={classes.typeButton}
              className={` ${type==2 ? classes.active : classes.typeButton}`}
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

      {data.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <UserChart
              data={data}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></UserChart>
          </div>
          <div className="chart">
            <TopUserChart data={data}></TopUserChart>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="chart-wrapper">
          <div className="chart">
            <ProjectChart
              data={data}
              startDate={selectedDateStart}
              endDate={selectedDateEnd}
            ></ProjectChart>
          </div>
          <div className="chart">
            <TopProjectChart data={data}></TopProjectChart>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default  Statistics;
