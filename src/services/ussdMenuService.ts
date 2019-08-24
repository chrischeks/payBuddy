
import { NextFunction, Request, Response } from "express";

const UssdMenu = require('ussd-menu-builder');


export class ussdMenuService {

    async ussdMenu(req: Request, res: Response, next: NextFunction) {

       

        let menu = new UssdMenu();

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

        menu.state('requestLoan', {
            run: async () => {
                menu.con(await showLoanOffer())
            },

            next: {
                '*[1-4]': 'getBankList'
            }
        })

        menu.state('getBankList', {
            run: async () => {
                menu.con(`${await getBankList()}
                    \n5. Add new card`
                )
            },

            next: {
                '*[1-4]': 'confirmLoan',
                '5': 'addNewCard'
            }
        })


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

        menu.state('confirmDisbursement&Repayment', {
            run: () => {
                confirmAmountAndBank().then(res => {
                    menu.end('Payment successfully made')
                })
            }

        });


        menu.state('exit', {
            run: () => {
                menu.end('');
            }

        })

        menu.state('addNewCard', {
            run: () => {
                menu.con('\n1. Send OTP & Validate')
            },

            next: { '1': 'sendOTP&Validate' }
        })

        menu.state('sendOTP&Validate', {
            run: () => {
                sendOTPAndValidate().then(
                    menu.end('Here is the response to send OTP & Validate')
                )

            }
        })

        menu.state('payLoan', {
            run: () => {
                menu.con(
                    '\n1. Pay Loan With Phone/Card' +
                    '\n2. PAY WITH QUICKTELLER' +
                    '\n3. PAY WITH ATM' +
                    '\n4. PAY WITH CASH'
                )
            },

            next: {
                '1': 'payLoanWithPhone/Card',
                '2': 'payWithQuickteller',
                '3': 'payWithATM',
                '4': 'payWithCash'
            }
        })



        menu.state('payLoanWithPhone/Card', {
            run: () => {
                menu.con(
                    '\n1. Get Bank List, Display And Select An Option' +
                    '\n2. Add new card'
                )
            },

            next: {

                '1': 'getBankList',
                '2': 'addNewCard'
            }
        })

        menu.state('payWithQuickteller', {
            run: () => {

                payWithQuickTeller().then(res => {
                    menu.end('responds for pay with quickteller')
                })
            }
        })

        menu.state('payWithATM', {
            run: () => {

                payWithATM().then(res => {
                    menu.end('responds for pay with ATM')
                })
            }
        })

        menu.state('payWithCash', {
            run: () => {

                payWithCash().then(res => {
                    menu.end('responds for pay with cash')
                })
            }
        })



        menu.state('checkLoanBalance', {
            run: () => {

                checkLoanBalance().then(res => {
                    menu.end('responds for check loan balance')
                })
            }
        })

        menu.state('extendLoan', {
            run: () => {

                extendLoan().then(res => {
                    menu.end('responds for extend loan')
                })
            }
        })

        menu.state('terms&Conditions', {
            run: () => {

                termsAndConditions().then(res => {
                    menu.end('responds for terms and conditions')
                })
            }
        })


        menu.state('recommendAFriend', {
            run: () => {

                recommendAFriend().then(res => {
                    menu.end('responds for recommend a friend')
                })
            }
        })


        menu.state('help', {
            run: () => {
                menu.end('Text Help To 561 For Customer Care')
            }
        })


        menu.run(req.body, ussdResult => {
            res.send(ussdResult);
        });
        menu.on('error', (err) => {
            // handle errors
            res.status(400).send('An error occurred, try again later');
        });




        async function confirmAmountAndBank() {
            return true
        }

        async function sendOTPAndValidate() {
            return true
        }

        async function payWithQuickTeller() {
            return true
        }

        async function payWithATM() {
            return true
        }

        async function payWithCash() {
            return true
        }

        async function checkLoanBalance() {
            return true
        }

        async function extendLoan() {
            return true
        }

        async function termsAndConditions() {
            return true
        }

        async function recommendAFriend() {
            return true
        }

        async function showLoanOffer() {
            return `Select an offer 
                    \n1. #5,000 
                    \n2. #10,000  
                    \n3. #20,000             
                    \n4. #50,000  `
        }

       async function getBankList() {
            return `select an option
            \n1. Access Bank
            \n2. UBA
            \n3. First Bank
            \n4. GT Bank  `
        }


    }
}
