import React, { Component } from 'react';
import {Pie, Bar} from 'react-chartjs-2';
import axios from 'axios';


class ChartsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            spieChart: undefined,
            sbarChart: undefined
        };

        this.statsData = {
            country: undefined,
            deaths: undefined,
            tests: undefined,
            cases: undefined,
            lastUpdate: undefined
        };

        this.duration = [
            'Last One Week',
            'Last Two Weeks',
            'Last Three Weeks',
            'Last One Month',
        ];
        
        this.selectedDuration = this.duration[0];
        this.historicData = [];
        // this.sbarChart = undefined;
        // this.spieChart = undefined;
        
        this.CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(26, 17, 9)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
          };
    };

    
    componentDidUpdate(prevProps){
        // let country = this.props.country
        // console.log('coun2' + this.props.country)
        
        if(this.props.country !== prevProps.country){

            this.fetchChartData(this.props.country)
        }
        
        // // console.log('stat' + this.statsData.cases)
        // console.log('spie' + this.spieChart)
    };

    createStatisticsPieChart = () => {

        this.setState({spieChart: { 
              labels: ['New', 'Critical', 'Recovered', 'Active'],
              datasets: [
                {
                  backgroundColor: Object.values(this.CHART_COLORS),
                  data: [
                     this.removePlusSign(this.statsData.cases.new),
                     this.statsData.cases.critical,
                     this.statsData.cases.recoverd,
                     this.statsData.cases.active,
                  ]
                }
              ]
            }});       
    };
    
    createStatisticsBarChart = () => {

        this.setState({sbarChart: { 
            labels: ['New', 'Critical', 'Recovered', 'Active'],
            datasets: [
              {
                backgroundColor: Object.values(this.CHART_COLORS),
                data: [
                   this.removePlusSign(this.statsData.cases.new),
                   this.statsData.cases.critical,
                   this.statsData.cases.recoverd,
                   this.statsData.cases.active,
                ]
              }
            ]
          }});     

    }
    
    fetchChartData = (country) => {
        if (country === null) {
            return
        }

        axios.get(`/api/statistics/${country}`).then(res=>{
            if(res){

                console.log( res.data.response[0])

                this.statsData = {
                    country: res.data.response[0].country,
                    deaths: res.data.response[0].deaths,
                    tests: res.data.response[0].tests,
                    cases: res.data.response[0].cases,
                    lastUpdate: (new Date(res.data.response[0].time)).toUTCString()
                };
                

                
                this.createStatisticsPieChart()
                this.createStatisticsBarChart()
            }
        })
    }

    removePlusSign = (item) => {
        if(item){

            if(item.includes('+')){
               return parseInt(item.split('+')[1]);
            }else{
                return item;
            }
        }else{
           return item
        }
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className='row flex-justify-content charts-component'>
                    <div className='stats-bar cell-6 fg-grayBlue'>
                        <Bar
                            data={this.state.sbarChart}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                        />
                    </div>
                    <div className='stats-bar cell-6 fg-grayBlue'>
                        <Pie
                        data={this.state.spieChart}
                        options={{
                        responsive: true,
                        title:{
                            display:true,
                            position:'top',
                            text: this.statsData.country + ' - Last Updated: ' + this.statsData.lastUpdate,
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'top',
                            
                        }
                        }}
                    />
                    </div>
                </div>
        
            </div>
        )
    }
};


export default ChartsComponent
