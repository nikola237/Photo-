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
import { Grid } from '@material-ui/core';
import srLocale from 'date-fns/locale/sr-Latn';

//components
import UserChart from '../../components/UserChart/UserChart';
import ProjectChart from '../../components/ProjectChart/ProjectChart';
import TopUserChart from '../../components/TopUserChart/TopUserChart';
import TopProjectChart from '../../components/TopProjectChart/TopProjectChart';

const Statistics = () => {
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

  const [data, setData] = useState([]);

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
      const result = await api.get(
        `http://93.86.249.163:3030/stats?size=10000&startdate=${selectedDateStart}&enddate=${selectedDateEnd}&type=${type}`
      );

      if (
        result.data.rows.length > 0 &&
        result.data.rows[0].message !== 'Nothing found.'
      ) {
        setData(result.data.rows);
        setDownloads(result.data.totalItems);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, [selectedDateStart, selectedDateEnd, type]);

  function changeType(type) {
    setType(type);
  }
  return (
    <div className="container">
      <div className="heading">
        <div className="picker">
          <MuiPickersUtilsProvider locale={srLocale} utils={DateFnsUtils}>
            <KeyboardDatePicker
              className="date-input"
              margin="normal"
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
              className="date-input"
              margin="normal"
              okLabel="U redu"
              clearLabel="Poništi"
              cancelLabel="Odustani"
              id="date-picker-dialog"
              label="Datum zavrsetka"
              format="dd/MM/yyyy"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div
          className={`typeButton ${type === 0 ? 'active' : ''}`}
          onClick={() => changeType(0)}
        >
          <p className="typeButton-text">Slike</p>
        </div>
        <div
          className={`typeButton ${type === 1 ? 'active' : ''}`}
          onClick={() => changeType(1)}
        >
          <p className="typeButton-text">Video</p>
        </div>
        <div
          className={`typeButton ${type === 2 ? 'active' : ''}`}
          onClick={() => changeType(2)}
        >
          <p className="typeButton-text">Audio</p>
        </div>
        <div className="totalCount">
          <p className="totalCount-title">Ukupan broj preuzimanja</p>
          <p className="totalCount-number">{downloads}</p>
        </div>
      </div>

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
    </div>
  );
};

export default Statistics;
