import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);






export function Cinema(props) {
    let moviePrice = [];
    let num = 0;
    const labels = [];
    props.movie.map((elm,key)=>{
        if(key < 17){
            labels.push(elm.name_CN);
        }
    });
    let array =[];
    props.screen.map((elm) => {
        if (elm.cinemasName === props.cinemaName && labels.includes(elm.movieName_CN)) {
                
            num = 0;
            props.ticket.map((elm1) => {
                if (elm1.screen_id === elm.screen_id && elm1.seat_name !== "") {
                    let ticket = elm1.seat_name.split(",").length;
                    num += ticket;
                }
            });
            // console.log(num);
            if(!array.includes(elm.movieName_CN)){
                array.push(elm.movieName_CN);
                moviePrice.push([elm.movieName_CN,num]);
            }else{
                moviePrice.forEach((elm3,key3)=>{
                    if(elm3[0] === `${elm.movieName_CN}`){
                        moviePrice[key3][1] = elm3[1]+num;
                        // console.log(elm3);
                    }

                })
            }
            
        }
    });
    console.log(moviePrice);
    moviePrice.sort((a,b)=>{
        return b[1] - a[1];
    })
    console.log(moviePrice);
    moviePrice.map((elm,key)=>{
        // console.log(elm,labels[key]);
        labels[key] = elm[0];
    });
    // console.log(labels);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: "black",
                    font: {
                        size: 20
                    }
                }
            },
            title: {
                display: true,
                text: `${props.cinemaName}`,
                font: {
                    size: 35
                }
            },

        },
        scales: {
            x: {
                ticks: {
                    color: "black",
                    font: {
                        size: 24
                    }
                }

            }

        }
    };
    function salay(movieName) {
        // console.log(movieName, props.cinemaName);
        let seatNum = 0;
        let ticketNum = 0;
        let arr = "";
        // console.log(labels);
        props.screen.map((elm) => {
          if (elm.cinemasName === props.cinemaName && elm.movieName_CN === movieName) {
            props.ticket.map((elm1) => {
                if (elm1.screen_id === elm.screen_id && elm1.seat_name !== "") {
                    // console.log(elm1);
                    ticketNum = elm1.seat_name.split(",").length;
                    seatNum += ticketNum * 250 ;
                    // console.log(movieName,ticketNum);
                }
            });
          }
        });
        return seatNum;
      }
    // console.log(props);
    const data = {
        labels,
        datasets: [
          {
            label: '電影總銷售額',
            data: labels.map((elm) => {return salay(elm)}),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };
    return <Bar options={options} data={data} />;
}
