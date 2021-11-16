import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet, ThemeService } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DataManagerService } from './services/data-manager.service';


@Component({
  selector: 'mf-dashboard',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-dashboard';

  // Doughnut - artistas reproducidos
  public doughnutChartLabels: Label[] = ['Crazy', 'Lost', 'Love'];
  public doughnutChartData: MultiDataSet = [
    [350, 460, 20],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // Bar - canciones reproducidas
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // PolarArea - scores de palabras
  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
  
  constructor(private dataManager: DataManagerService, private themeService: ThemeService) { }

  ngOnInit(): void {
    let artists = this.dataManager.getArtistsReady();
    let songs = this.dataManager.getSongsReady();
    let words = this.dataManager.getWordsReady();
    this.doughnutChartLabels = <Label[]>artists.labels;
    this.doughnutChartData = <MultiDataSet>artists.values;
    
    this.barChartData = songs.values;
    this.barChartLabels = <Label[]>songs.labels;
    
    this.polarAreaChartLabels = <Label[]>words.labels;
    this.polarAreaChartData = words.values;

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public barChartOptions: ChartOptions = {
    legend: {
      labels: { fontColor: 'white' }
    },
    scales: {
      xAxes: [ {
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      } ],
      yAxes: [ {
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      } ]
    },
  };
}
