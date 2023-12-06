import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.css']
})
export class FixedDepositComponent {
  fixedDepositForm: FormGroup;  // Form group declaration
  accounts: any[] = [];  // To hold the accounts data


  interestRates = [
    { duration: { min: 7, max: 14 }, roi: 3.00 },
    { duration: { min: 15, max: 29 }, roi: 3.00 },
    { duration: { min: 30, max: 45 }, roi: 3.50 },
    { duration: { min: 46, max: 60 }, roi: 4.25 },
    { duration: { min: 61, max: 90 }, roi: 4.50 },
    { duration: { min: 91, max: 120 }, roi: 4.75 },
    { duration: { min: 121, max: 150 }, roi: 4.75 },
    { duration: { min: 151, max: 184 }, roi: 4.75 },
    { duration: { min: 185, max: 210 }, roi: 5.75 },
    { duration: { min: 211, max: 270 }, roi: 5.75 },
    { duration: { min: 271, max: 289 }, roi: 6.00 },
    { duration: { min: 290, max: 364 }, roi: 6.00 },
    { duration: { min: 365, max: 389 }, roi: 6.70 },
    { duration: { min: 390, max: 449 }, roi: 6.70 },
    { duration: { min: 450, max: 539 }, roi: 7.10 },
    { duration: { min: 540, max: 730 }, roi: 7.10 },
    { duration: { min: 731, max: 1095 }, roi: 7.00 },
    { duration: { min: 1096, max: 1825 }, roi: 7.00 },
    { duration: { min: 1826, max: 3650 }, roi: 6.90 }
  ];


  // Define arrays for dropdown options
  yearOptions = Array.from({ length: 11 }, (_, i) => i); // 0 to 10 years
  monthOptions = Array.from({ length: 13 }, (_, i) => i); // 0 to 12 months
  dayOptions = Array.from({ length: 31 }, (_, i) => i); // 0 to 30 days

  durationError: string = '';



  constructor(
    private accountService: AccountServiceService,
    private dataService: DataServiceService,
    public modalService: NgbModal
  ) {
    // Initialize the form group
    this.fixedDepositForm = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1000),
        Validators.max(9999999),
        this.amountValidator()

      ])
    });
    this.fixedDepositForm.addControl('years', new FormControl('', [Validators.min(0), Validators.max(10)]));
    this.fixedDepositForm.addControl('months', new FormControl('', [Validators.max(120)])); // 120 months in 10 years
    this.fixedDepositForm.addControl('days', new FormControl('', [Validators.max(3650)])); // 3650 days in 10 years
    this.fixedDepositForm.addControl('roi', new FormControl({ }));
  }

  ngOnInit() {
    this.loadAccounts();  // Load accounts on component initialization
    this.subscribeToDurationChanges();
    this.subscribeToAccountChanges();
    
  }





  // Method to load accounts
  loadAccounts() {
    this.accountService.AccountIdGetByCustomerId(this.dataService.customerId)
      .subscribe(data => {
        this.accounts = data as any[];
      });
  }

 // Getter for selected account balance
get selectedAccountBalance(): number {
  const selectedAccountNumber = Number(this.fixedDepositForm.get('fromAccount')?.value);
  const selectedAccount = this.accounts.find(account => account.accountNumber === selectedAccountNumber);
  return selectedAccount ? selectedAccount.accountBalance : 0;
}



  // Subscribe to changes in the 'fromAccount' field
subscribeToAccountChanges() {
  this.fixedDepositForm.get('fromAccount')?.valueChanges.subscribe(() => {
    console.log('Selected Account Balance:', this.selectedAccountBalance);
    this.fixedDepositForm.get('amount')?.updateValueAndValidity(); // Trigger re-validation
  });
}



amountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = control.value;
    if (!amount) {
      return null;  // Let the required validator handle empty values
    }

    const selectedBalance = Number(this.selectedAccountBalance);
    if (selectedBalance > 0 && amount > selectedBalance) {
      // Amount exceeds the balance
      return { exceedsBalance: true };
    }

    return null;  // No error
  };
}



  // Method to get the error message for the amount field
  get amountError(): string {
    const amountControl = this.fixedDepositForm.get('amount');
    if (!amountControl) {
      return ''; // or an appropriate default error message
    }

    // Debugging: Log the entire form state and validation status
  // console.log("Form State:", this.fixedDepositForm.value);
  // console.log("Is Amount Control Valid?", amountControl.valid);
  
    // Convert both values to numbers to ensure a proper comparison
    const selectedBalance = Number(this.selectedAccountBalance);
    const amountValue = Number(amountControl.value);
    // console.log("AccBalance:",selectedBalance);
    // console.log("Deposit:",amountValue);
    
    // var calculatedValue = selectedBalance > 0 && amountValue > selectedBalance
    // console.log(calculatedValue)
    // console.log(selectedBalance+100);
    // console.log(amountValue+100);
  
    if (amountControl.hasError('required')) {
      return 'Amount is required.';
    } else if (amountControl.hasError('min')) {
      return 'Amount must be at least ₹1000.';
    } else if (amountControl.hasError('max')) {
      return 'Amount must be less than or equal to ₹99,99,999.';
    } else if (amountControl.hasError('exceedsBalance')) {
      return 'Amount cannot exceed the selected account balance.';
    }
  
    return ''; // Return an empty string if there are no errors
  }
  


  // Subscribe to changes in the duration fields
  subscribeToDurationChanges() {
    const yearsControl = this.fixedDepositForm.get('years');
    const monthsControl = this.fixedDepositForm.get('months');
    const daysControl = this.fixedDepositForm.get('days');

    yearsControl?.valueChanges.subscribe(() => this.onDurationChange());
    monthsControl?.valueChanges.subscribe(() => this.onDurationChange());
    daysControl?.valueChanges.subscribe(() => this.onDurationChange());
  }

  onDurationChange() {
    const years = this.fixedDepositForm.get('years')?.value ?? 0;
    const months = this.fixedDepositForm.get('months')?.value ?? 0;
    const days = this.fixedDepositForm.get('days')?.value ?? 0;
    const totalDays = (years * 365) + (months * 30) + (days * 1);

    // console.log(totalDays);
    

    if (totalDays < 7) {
      this.durationError = 'Duration must be at least 7 days.';
    } else if (totalDays > 3650) {
      this.durationError = 'The total duration should not exceed 10 years.';
    } else {
      this.durationError = '';
      this.calculateROI();
    }
  
    // Manually trigger form control validation check
    // this.fixedDepositForm.get('years')?.updateValueAndValidity();
    // this.fixedDepositForm.get('months')?.updateValueAndValidity();
    // this.fixedDepositForm.get('days')?.updateValueAndValidity();
  }


  get durationExceedsError(): boolean {
    return this.fixedDepositForm.hasError('durationExceeds');
  }



  calculateROI() {
    const years = this.fixedDepositForm.get('years')?.value ?? 0;
    const months = this.fixedDepositForm.get('months')?.value ?? 0;
    const days = this.fixedDepositForm.get('days')?.value ?? 0;
  
    // Calculate the total number of days
    const totalDays = (years * 365) + (months * 30) + (days*1); // Simple approximation
  
    // Find the matching interest rate
    const matchingRate = this.interestRates.find(rate => totalDays >= rate.duration.min && totalDays <= rate.duration.max);
  
    console.log("outside:",matchingRate?.roi);
    var aVariable = matchingRate?.roi
    
    // Update the roi field with the found rate or reset if not found
    if (aVariable) {
      console.log("if:",matchingRate?.roi);
      this.fixedDepositForm.get('roi')?.setValue(aVariable);
    } else {
      this.fixedDepositForm.get('roi')?.setValue('');
    }
  }



  // Method to open Interest Rates Modal
  openInterestRatesModal(content: any) {
    this.modalService.open(content);
  }


//Issue with fetching the maturity from the form fields, so just using totalDays to find it.
  // getMaturityDate(): string {
  //   const totalDays = this.calculateTotalDays();
  //   let maturityDate = new Date();
  //   maturityDate.setDate(maturityDate.getDate() + totalDays);
  
  //   // Format the date as dd-mm-yyyy and include the day
  //   const dayOfWeek = maturityDate.toLocaleString('en-US', { weekday: 'long' });
  //   const formattedDate = `${this.padZero(maturityDate.getDate())}-${this.padZero(maturityDate.getMonth() + 1)}-${maturityDate.getFullYear()}`;
  
  //   return `${formattedDate}`;
  // }

  getDisplayMaturityDate(): string {
    const totalDays = this.calculateTotalDays();
    let maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + totalDays);
  
    // Format the date as dd-mm-yyyy for display
    const formattedDate = maturityDate.toLocaleDateString('en-GB'); // 'en-GB' uses day-month-year format
  
    return formattedDate;
  }
  
  
  getMaturityDate(): string {
    const totalDays = this.calculateTotalDays();
    let maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + totalDays);
  
    // Convert to ISO 8601 DateTime format
    return maturityDate.toISOString();
  }
  
  
  
  // Helper function to ensure day and month are always two digits
  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  

  calculateMaturityAmount(): number {
    const principal = this.fixedDepositForm.get('amount')?.value ?? 0;
    const roi = this.fixedDepositForm.get('roi')?.value ?? 0;
    const totalDays = this.calculateTotalDays();
  
    // Convert days to years for interest calculation
    const years = totalDays / 365;
  
    // Compound interest formula: A = P(1 + r/n)^(nt)
    // Assuming interest is compounded annually
    const maturityAmount = principal * Math.pow(1 + roi / 100, years);
  
    // Truncate to 2 decimal places and convert back to number
    return Number(maturityAmount.toFixed(2));
  }
  
  calculateInterestReturns(): number {
    const principal = this.fixedDepositForm.get('amount')?.value ?? 0;
    const maturityAmount = this.calculateMaturityAmount();
    const interestReturns = maturityAmount - principal;
  
    // Truncate to 2 decimal places and convert back to number
    return Number(interestReturns.toFixed(2));
  }
  
  
  calculateTotalDays(): number {
    const years = this.fixedDepositForm.get('years')?.value ?? 0;
    const months = this.fixedDepositForm.get('months')?.value ?? 0;
    const days = this.fixedDepositForm.get('days')?.value ?? 0;
  
    return years * 365 + months * 30 + (days*1); // Simple approximation
  }


  // Inside your FixedDepositComponent class

// Method to format and submit data
submitData() {
  if (this.fixedDepositForm.valid) {
    const formData = this.fixedDepositForm.value;
    const totalDays = this.calculateTotalDays();

    // Make sure ROI is calculated based on the duration
    this.calculateROI();

    // Create the JSON object
    const submissionData = {
      fdAccountId: 0, // Assuming this is a static value or needs to be fetched from elsewhere
      accountId: formData.fromAccount, // Assuming account ID is same as 'fromAccount'
      amount: formData.amount,
      duration: totalDays,
      roi: formData.roi,
      maturityDate: this.getMaturityDate(), // Already in the required format
      maturityAmount: this.calculateMaturityAmount(),
      interestReturns: this.calculateInterestReturns()
    };

    // Console log for debugging, replace this with your API call
    console.log('Formatted Submission Data:', submissionData);

    // Call your API submission function here
    this.submitToApi(submissionData);
  } else {
    console.log('Form is not valid');
  }
}

  // requestFDAccount() {
  //   if (this.fixedDepositForm.valid) {
  //     const formData = this.fixedDepositForm.value;
  //     const submissionData = {
  //       fromAccount: formData.fromAccount,
  //       amount: formData.amount,
  //       duration: {
  //         years: formData.years,
  //         months: formData.months,
  //         days: formData.days
  //       },
  //       roi: formData.roi,
  //       maturityDate: this.getMaturityDate(),
  //       maturityAmount: this.calculateMaturityAmount(),
  //       interestReturns: this.calculateInterestReturns()
  //       // Include any other fields that your API expects
  //     };
  
  //     console.log("Data:",submissionData);
      
  //     this.submitToApi(submissionData);
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }


  submitToApi(data: any) {
    this.accountService.CustomerRequestFD(data).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        // Handle success, maybe navigate to another page or show a success message
      },
      error: (error) => {
        console.error('API Error:', error);
        // Handle error, maybe show an error message to the user
      }
    });
  }
  
  
}
