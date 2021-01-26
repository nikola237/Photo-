import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import ImageIcon from '@material-ui/icons/Image';

function TopProjectChart({ data }) {
  const [dataProj, setDataProj] = useState({});
  const optionsProject = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      titleFontSize: 20,
      bodyFontSize: 20,
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'black',
        fontSize: 25,
      },
    },
    title: {
      display: true,
      fontColor: 'black',
      text: 'Top 5 Projekata',
      fontSize: 20,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: 'black',
          },
          ticks: {
            fontColor: 'black',
            fontSize: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: 'black',
          },
          ticks: {
            fontColor: 'black',
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  };
  let dataProject = {
    labels: [],
    datasets: [
      {
        hoverBackgroundColor: '#959799',
        hoverBorderColor: '#959799',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (data.length > 0) {
      var countProjects = {};
      var countTopProjects = {};

      data.forEach((item) => {
        countProjects[item.projectname] = item.statsCount;
      });

      for (let index = 0; index < 5; index++) {
        if (Object.keys(countProjects).length > 0) {
          var project = Object.keys(countProjects).reduce((a, b) =>
            countProjects[a] > countProjects[b] ? a : b
          );
          countTopProjects[project] = countProjects[project];
          delete countProjects[project];
        }
      }

      var colorsProjects = [];
      var borderColorsProject = [];
      for (let prop in countTopProjects) {
        // if (countTopProjects[prop] >= 2) {
        colorsProjects.push(random_rgba());
        borderColorsProject.push(
          colorsProjects[colorsProjects.length - 1].replace('0.3', '1')
        );
        // }
      }

      dataProject.labels.push(...Object.keys(countTopProjects));
      dataProject.datasets[0].data = Object.values(countTopProjects);
      dataProject.datasets[0].backgroundColor = colorsProjects;
      dataProject.datasets[0].borderColor = borderColorsProject;

      setDataProj(dataProject);
    }
  }, [data]);

  function random_rgba() {
    // var o = Math.round,
    //   r = Math.random,
    //   s = 255;
    return (
      'hsla(' + Math.random() * 360 + ', 100%, 75%,0.7)'
      // 'rgba(' + r() * s + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')'
    );
  }
  function downloadChart() {
    const linkSource = document.getElementById('bar').toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'bar' + '.png';
    downloadLink.click();
  }

  return (
    <>
      <button className="downloadButton" onClick={downloadChart}>
        <ImageIcon />
      </button>
      <HorizontalBar data={dataProj} options={optionsProject} id="bar" />
    </>
  );
}

export default TopProjectChart;
