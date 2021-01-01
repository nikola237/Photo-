import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import ImageIcon from '@material-ui/icons/Image';

<<<<<<< HEAD
function TopProjectChart({ data }) {
=======
function TopProjectChart({data}) {
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
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
        fontColor: '#ffff',
        fontSize: 25,
      },
    },
    title: {
      display: true,
      fontColor: 'white',
      text: 'Top 5 Projekata',
      fontSize: 20,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: '#ffff',
          },
          ticks: {
            fontColor: '#ffff',
            fontSize: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: '#ffff',
          },
          ticks: {
            fontColor: '#ffff',
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
<<<<<<< HEAD
        countProjects[item.projectname] = item.statsCount;
=======
          countProjects[item.projectname] = item.statsCount

>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
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
<<<<<<< HEAD
        colorsProjects.push(random_rgba());
        borderColorsProject.push(
          colorsProjects[colorsProjects.length - 1].replace('0.3', '1')
        );
=======
          colorsProjects.push(random_rgba());
          borderColorsProject.push(
            colorsProjects[colorsProjects.length - 1].replace('0.3', '1')
          );
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
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
<<<<<<< HEAD
      'hsla(' + Math.random() * 360 + ', 100%, 75%,0.7)'
=======
      "hsla(" + Math.random() * 360 + ", 100%, 75%,0.7)"
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
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
<<<<<<< HEAD
      <HorizontalBar data={dataProj} options={optionsProject} id="bar" />
=======
      <HorizontalBar
        data={dataProj}
        options={optionsProject}
        id="bar"
      />
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
    </>
  );
}

export default TopProjectChart;
