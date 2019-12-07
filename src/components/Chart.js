import React,{ Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class Chart extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartData : {
                labels:['San Francisco', 'Boston', 'Portland', 'Denver', 'New York', 'Seattle', 'Washington'],
                datasets:[
                    {
                        label:'Popular Cities',
                        data:[
                            0.83593513032623,
                            0.78613827409426,
                            0.58539017826642,
                            0.50551522383989,
                            0.38356813671417,
                            0.34769639142884,
                            0.31375729500747
                        ],
                        backgroundColor:[
                            'rgb(236, 112, 99 )',
                            'rgb(247, 220, 111)',
                            'rgb(88, 214, 141)',
                            'rgb(175, 122, 197)',
                            'rgba(240, 178, 122)',
                            'rgba(93, 109, 126 )',
                            'rgb(93, 173, 226)'
                        ]
                    }
                ]
            }
        }
    }

    render() {
        return(
            <div>
                <br/>
                <br/>
                    <div>
                        <Doughnut
                            data={this.state.chartData}
                            width={80}
                            height={50}
                            options={{ 
                                title:{
                                    display:true,
                                    text: 'Popular cities visited in the US'
                                },
                                legend:{
                                    display:false,

                                }
                            }}
                        />
                    </div>
            </div>

        
        );
    }
}

export default Chart;