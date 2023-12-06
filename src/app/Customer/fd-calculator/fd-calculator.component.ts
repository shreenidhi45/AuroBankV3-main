import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-fd-calculator',
  templateUrl: './fd-calculator.component.html',
  styleUrls: ['./fd-calculator.component.css']
})
export class FdCalculatorComponent implements OnInit {
  fdForm: FormGroup;
  finalAmount: number = 0;
  estimatedReturns: number = 0;
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie', number[], string | string[]>;
  pieChartLabels = ['Invested Amount', 'Estimated Returns'];

  constructor() {
    // Initialize the form controls
    this.fdForm = new FormGroup({
      amount: new FormControl(10000),
      years: new FormControl(1),
      roi: new FormControl(5)
    });

    
    // Initial pie chart data setup
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{ data: [0, 0] }]
    };
  }

  ngOnInit() {
    // Subscribe to form changes to calculate FD values
    this.fdForm.valueChanges.subscribe(formData => {
      this.calculateFD(formData);
      this.updateChart(formData);
    });
    this.updateChart(this.fdForm.value);
    this.calculateFD(this.fdForm.value);
  }

  calculateFD(formData: any) {
    const investedAmount = formData.amount;
    const years = formData.years;
    const roi = formData.roi/100;
    if(investedAmount<0)
    {
      alert("Please give a positive value");
      this.finalAmount=0;
      this.estimatedReturns=0;
      
      return;
    }

    if (years < 0) {
      alert('Please enter a positive time period');
      this.finalAmount = 0;
      this.estimatedReturns = 0;
      return;
    }

    if (roi < 0) {
      alert('Please enter a positive interest rate');
      this.finalAmount = 0;
      this.estimatedReturns = 0;
      return;
    }
    //this.estimatedReturns = (investedAmount * roi * years) / 100;
    // Compound interest formula
    const finalAmount = investedAmount * Math.pow((1 + roi), years);
    this.estimatedReturns = finalAmount - investedAmount;
    this.finalAmount = investedAmount + this.estimatedReturns;

    // TODO: Update pie chart here if using a chart library
    // Chart variables
  }
    updateChart(formData: any) {
      const amount = formData.amount;
      const years = formData.years;
      const roi = formData.roi;
  
      const estimatedReturns = (amount * roi * years) / 100;
      const finalAmount = amount + estimatedReturns;
  
      // Update pie chart data
      this.pieChartData = {
        ...this.pieChartData,
        datasets: [{ data: [amount, estimatedReturns] }]
      };

      

      // this.pieChartData = {
      //   labels: ['Invested Amount', 'Estimated Returns'],
      //   datasets: [{ data: [30000, 5000] }]
        
      // };
    }
  }
