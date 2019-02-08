import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../services/websocket.service';

export interface IDot {
    x: number;
    y: number;
}

@Injectable()
export class LineChartService {
    messages: Subject<any>;

    constructor(private wsService: WebsocketService) {
        this.messages = <Subject<any>>wsService
            .connect()
            .map((response: any): any => {
                return response;
            })
    }

    sendMsg(msg) {
        this.messages.next(msg);
    }

    getData() {
        return [
            {
                "date": "24-Apr-07",
                "close": 93.24
            },
            {
                "date": "25-Apr-07",
                "close": 95.35
            },
            {
                "date": "26-Apr-07",
                "close": 98.84
            },
            {
                "date": "27-Apr-07",
                "close": 99.92
            },
            {
                "date": "30-Apr-07",
                "close": 99.8
            },
            {
                "date": "1-May-07",
                "close": 99.47
            },
            {
                "date": "2-May-07",
                "close": 100.39
            },
            {
                "date": "3-May-07",
                "close": 100.4
            },
            {
                "date": "4-May-07",
                "close": 100.81
            },
            {
                "date": "7-May-07",
                "close": 103.92
            },
            {
                "date": "8-May-07",
                "close": 105.06
            },
            {
                "date": "9-May-07",
                "close": 106.88
            },
            {
                "date": "10-May-07",
                "close": 107.34
            },
            {
                "date": "11-May-07",
                "close": 108.74
            },
            {
                "date": "14-May-07",
                "close": 109.36
            },
            {
                "date": "15-May-07",
                "close": 107.52
            },
            {
                "date": "16-May-07",
                "close": 107.34
            },
            {
                "date": "17-May-07",
                "close": 109.44
            },
            {
                "date": "18-May-07",
                "close": 110.02
            },
            {
                "date": "21-May-07",
                "close": 111.98
            },
            {
                "date": "22-May-07",
                "close": 113.54
            },
            {
                "date": "23-May-07",
                "close": 112.89
            },
            {
                "date": "24-May-07",
                "close": 110.69
            },
            {
                "date": "25-May-07",
                "close": 113.62
            },
            {
                "date": "29-May-07",
                "close": 114.35
            },
            {
                "date": "30-May-07",
                "close": 118.77
            },
            {
                "date": "31-May-07",
                "close": 121.19
            },
            {
                "date": "1-Jun-07",
                "close": 118.4
            },
            {
                "date": "4-Jun-07",
                "close": 121.33
            },
            {
                "date": "5-Jun-07",
                "close": 122.67
            },
            {
                "date": "6-Jun-07",
                "close": 123.64
            },
            {
                "date": "7-Jun-07",
                "close": 124.07
            },
            {
                "date": "8-Jun-07",
                "close": 124.49
            },
            {
                "date": "11-Jun-07",
                "close": 120.19
            },
            {
                "date": "12-Jun-07",
                "close": 120.38
            },
            {
                "date": "13-Jun-07",
                "close": 117.5
            },
            {
                "date": "14-Jun-07",
                "close": 118.75
            },
            {
                "date": "15-Jun-07",
                "close": 120.5
            },
            {
                "date": "18-Jun-07",
                "close": 125.09
            },
            {
                "date": "19-Jun-07",
                "close": 123.66
            },
            {
                "date": "20-Jun-07",
                "close": 121.55
            },
            {
                "date": "21-Jun-07",
                "close": 123.9
            },
            {
                "date": "22-Jun-07",
                "close": 123
            },
            {
                "date": "25-Jun-07",
                "close": 122.34
            },
            {
                "date": "26-Jun-07",
                "close": 119.65
            },
            {
                "date": "27-Jun-07",
                "close": 121.89
            },
            {
                "date": "28-Jun-07",
                "close": 120.56
            },
            {
                "date": "29-Jun-07",
                "close": 122.04
            },
            {
                "date": "2-Jul-07",
                "close": 121.26
            },
            {
                "date": "3-Jul-07",
                "close": 127.17
            },
            {
                "date": "5-Jul-07",
                "close": 132.75
            },
            {
                "date": "6-Jul-07",
                "close": 132.3
            },
            {
                "date": "9-Jul-07",
                "close": 130.33
            },
            {
                "date": "10-Jul-07",
                "close": 132.35
            },
            {
                "date": "11-Jul-07",
                "close": 132.39
            }
        ]
    }
}