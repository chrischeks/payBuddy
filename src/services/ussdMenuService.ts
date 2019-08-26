
import { NextFunction, Request, Response } from "express";

const UssdMenu = require('ussd-menu-builder');


export class ussdMenuService {

    async ussdMenu(req: Request, res: Response, next: NextFunction) {

        let menu = new UssdMenu();

        this.runMenu(menu, req, res)
        this.startState(menu);
        this.loanState(menu);
        this.requestLoanState(menu);
        this.getBankListState(menu);
        this.confirmLoanState(menu);
        this.confirmState(menu);
        this.confirmDisbursementState(menu);
        this.exitState(menu);
        this.addNewCardState(menu);
        this.sendOTPState(menu);
        this.payLoanState(menu);
        this.payLoanWithPhoneOrCardState(menu);
        this.payLoanWithQuicktellerState(menu);
        this.payLoanWithATMState(menu);
        this.payLoanWithCashState(menu);
        this.checkLoanBalanceState(menu);
        this.extendLoanState(menu);
        this.termsAndConditionsState(menu);
        this.recommendAFriendState(menu);
        this.help(menu)   

    }



    async runMenu(menu, req, res){
        menu.run(req.body, ussdResult => {
            res.send(ussdResult);
        });
        menu.on('error', (err) => {
            // handle errors
            res.status(400).send('An error occurred, try again later');
        });
    }

    async help(menu) {
        menu.state('help', {
            run: () => {
                menu.end('Text Help To 561 For Customer Care')
            }
        })
    }



    async recommendAFriendState(menu) {
        menu.state('recommendAFriend', {
            run: () => {

                recommendAFriend().then(res => {
                    menu.end('responds for recommend a friend')
                })
            }
        })
        async function recommendAFriend() {
            return true
        }
    }

    async termsAndConditionsState(menu) {
        menu.state('terms&Conditions', {
            run: () => {
                termsAndConditions().then(res => {
                    menu.end('responds for terms and conditions')
                })
            }
        })

        async function termsAndConditions() {
            return true
        }
    }


    async extendLoanState(menu) {
        menu.state('extendLoan', {
            run: () => {
                extendLoan().then(res => {
                    menu.end('responds for extend loan')
                })
            }
        })
        async function extendLoan() {
            return true
        }
    }

    async checkLoanBalanceState(menu) {
        menu.state('checkLoanBalance', {
            run: () => {
                checkLoanBalance().then(res => {
                    menu.end('responds for check loan balance')
                })
            }
        })
        async function checkLoanBalance() {
            return true
        }
    }



    async payLoanWithCashState(menu) {
        menu.state('payLoanWithCash', {
            run: () => {
                payWithCash().then(res => {
                    menu.end('responds for pay with cash')
                })
            }
        })

        async function payWithCash() {
            return true
        }

    }


    async payLoanWithATMState(menu) {
        menu.state('payLoanWithATM', {
            run: () => {

                payWithATM().then(res => {
                    menu.end('responds for pay with ATM')
                })
            }
        })

        async function payWithATM() {
            return true
        }
    }


    async payLoanWithQuicktellerState(menu) {
        menu.state('payLoanWithQuickteller', {
            run: () => {
                payWithQuickTeller().then(res => {
                    menu.end('responds for pay with quickteller')
                })
            }
        })

        async function payWithQuickTeller() {
            return true
        }

    }



    async payLoanWithPhoneOrCardState(menu) {
        menu.state('payLoanWithPhone/Card', {
            run: () => {
                menu.con(`${this.getBankList()}
                    \n5. Add new card`
                )
            },
            next: {

                '1': 'getBankList',
                '2': 'addNewCard'
            }
        })
    }


    async payLoanState(menu) {
        menu.state('payLoan', {
            run: () => {
                menu.con(
                    '\n1. Pay Loan With Phone/Card' +
                    '\n2. Pay with Qucikteller' +
                    '\n3. Pay with ATM' +
                    '\n4. Pay with Cash'
                )
            },

            next: {
                '1': 'payLoanWithPhone/Card',
                '2': 'payLoanWithQuickteller',
                '3': 'payLoanWithATM',
                '4': 'payLoanWithCash'
            }
        })

    }

    async sendOTPState(menu) {
        menu.state('sendOTP&Validate', {
            run: () => {
                sendOTPAndValidate().then(
                    menu.end('Here is the response to send OTP & Validate')
                )

            }
        })

        async function sendOTPAndValidate() {
            return true
        }
    }



    async addNewCardState(menu) {
        menu.state('addNewCard', {
            run: () => {
                menu.con('\n1. Send OTP & Validate')
            },

            next: { '1': 'sendOTP&Validate' }
        })
    }



    async exitState(menu) {
        menu.state('exit', {
            run: () => {
                menu.end('');
            }

        })
    }



    async confirmDisbursementState(menu) {
        menu.state('confirmDisbursement&Repayment', {
            run: () => {
                confirmAmountAndBank().then(res => {
                    menu.end('Payment successfully made')
                })
            }

        });

        async function confirmAmountAndBank() {
            return true
        }

    }


    async confirmState(menu) {
        menu.state('confirm', {
            run: () => {
                menu.con('\n1. Confirm Amount & bank')
            },

            next: { '1': 'confirmAmount&Bank' }
        })


        menu.state('confirmAmount&Bank', {
            run: () => {
                menu.con('\n1. Confirm Disbursement & Repayment')
            },
            next: {
                '1': 'confirmDisbursement&Repayment'
            }

        });
    }

    async confirmLoanState(menu) {
        menu.state('confirmLoan', {
            run: () => {
                menu.con('Confirm your loan details' +
                    '\n1. Confirm' +
                    '\n2. Change Amount' +
                    '\n3. Change Card' +
                    '\n4. Exit'
                )
            },

            next: {
                '1': 'confirm',
                "2": 'requestLoan',
                '3': 'getBankList',
                "4": 'exit'
            }
        })
    }

    async getBankListState(menu) {
        menu.state('getBankList', {
            run: async () => {
                menu.con(`${await this.getBankList()}
                    \n5. Add new card`
                )
            },

            next: {
                '*[1-4]': 'confirmLoan',
                '5': 'addNewCard'
            }
        })
    }

    async requestLoanState(menu) {
        menu.state('requestLoan', {
            run: async () => {
                menu.con(await this.showLoanOffer())
            },

            next: {
                '*[1-4]': 'getBankList'
            }
        })
    }

    async loanState(menu) {
        menu.state('loans', {
            run: () => {
                menu.con(
                    '\n1. Request Loan' +
                    '\n2. Pay Loan' +
                    '\n3. Check Loan Balance' +
                    '\n4. Extend Loan' +
                    '\n5. Terms & Conditions' +
                    '\n6. Recommend A Friend'


                );
            },

            next: {
                '1': 'requestLoan',
                '2': 'payLoan',
                '3': 'checkLoanBalance',
                '4': 'extendLoan',
                '5': 'terms&conditions',
                '6': 'recommendAFriend'
            }
        });

    }

    async startState(menu) {
        menu.startState({
            run: () => {
                menu.con('Welcome to payBuddy' +
                    '\n1. Loans' +
                    '\n2. Savings' +
                    '\n3. Info' +
                    '\n4. Help'

                );
            },

            next: {
                '1': 'loans',
                '2': 'savings',
                '3': 'info',
                '4': 'help'
            }
        })
    }


    async getBankList() {
        return `select an option
        \n1. Access Bank
        \n2. UBA
        \n3. First Bank
        \n4. GT Bank  `
    }


    async showLoanOffer() {
        return `Select an offer 
                \n1. #5,000 
                \n2. #10,000  
                \n3. #20,000             
                \n4. #50,000  `
    }
}
