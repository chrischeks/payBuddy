
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
                "2": "showAndSelectLoanOffer",
                '3': 'getBankList',
                "4": "exit"
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
                    \n4. #50,000              `
        }

        async function getBankList() {
            return `select an option
            \n1. Access Bank
            \n2. UBA
            \n3. First Bank
            \n4. GT Bank  `
        }




    }

    // async ussdMenu(req: Request, res: Response, next: NextFunction) {

    //     let menu = new UssdMenu();

    //     // Define menu states
    //     await this.startMenu(menu);
    //     await this.showBalanceMenu(menu);
    //     await this.buyAirtimeMenu(menu);
    //     await this.makePaymentMenu(menu)


    //    // Registering USSD handler with Express

    //     let args = {
    //         phoneNumber: req.body.phoneNumber,
    //         sessionId: req.body.sessionId,
    //         serviceCode: req.body.serviceCode,
    //         text: req.body.text
    //     };
    //     menu.run(args, resMsg => {
    //         res.send(resMsg);
    //     });


    //     // menu.run(req.body, ussdResult => {
    //     //     res.send(ussdResult);
    //     // });
    //     // menu.on('error', (err) => {
    //     //     // handle errors
    //     //     res.status(400).send('An error occurred');
    //     // });
    // }



    // public async startMenu(menu) {
    //     menu.startState({
    //         run: () => {
    //             // use menu.con() to send response without terminating session      
    //             menu.con('Welcome to Pay Vice:' +
    //                 '\n1. Show Balance' +
    //                 '\n2. Buy Airtime' +
    //                 '\n3. Make Payment'
    //             );
    //         },
    //         // next object links to next state based on user input
    //         next: {
    //             '1': 'showBalance',
    //             '2': 'buyAirtime',
    //             '3': 'MakePayment'
    //         }
    //     });
    // }



    // public async showBalanceMenu(menu) {
    //     menu.state('showBalance', {
    //         run: () => {
    //             // fetch balance
    //             this.fetchBalance(menu.args.phoneNumber).then(bal => {
    //                 menu.end('Your balance is NGN ' + bal);
    //             }
    //             ).catch(err=>{
    //                 menu.end('Your request can not be proccessed at the moment, try again later')
    //             })
    //         }
    //     });
    // }



    // public async buyAirtimeMenu(menu) {
    //     menu.state('buyAirtime', {
    //         run: () => {
    //             menu.con('Enter amount:');
    //         },
    //         next: {
    //             // using regex to match user input to next state
    //             '*\\d+': 'buyAirtime.amount'
    //         }
    //     });

    //     // nesting states
    //     menu.state('buyAirtime.amount', {
    //         run: () => {
    //             // use menu.val to access user input value
    //             var amount = Number(menu.val);
    //             this.buyAirtime(menu.args.phoneNumber, amount).then(res => {
    //                 menu.end('Airtime bought successfully.');
    //             }).catch(err=>{
    //                 menu.end('Your request can not be proccessed at the moment, try again later')
    //             })
    //         }
    //     });
    // }


    // public async makePaymentMenu(menu) {
    //     // nesting states
    //     menu.state('MakePayment', {
    //         run: () => {
    //             menu.con('Enter Amount-CardNumber-MM-YY-CVV2');
    //             // var amount = Number(menu.val);
    //             // savePaymentAmount(menu.args.phoneNumber, amount).then(res=>{});
    //         },
    //         next: {
    //             // using regex to match user input to next state
    //             '*\\d+-\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d-\\d\\d-\\d\\d-\\d\\d\\d': 'MakePayment.cardDetails'
    //         }
    //     });

    //     // nesting states
    //     menu.state('MakePayment.cardDetails', {
    //         run: async () => {
    //             var card_details = "1234-234-56"
    //             let result = await this.makePayment(menu.args.phoneNumber, card_details)
    //             if (result['body']['status']=='success') {
    //                 menu.end('Payment successfully made with reference: ' + result['body']['reference']);
    //             } else {
    //                 menu.end('Payment was NOT successfully! Please try again');
    //             }
    //         },
    //         next: {
    //             // using regex to match user input to next state
    //             //  '*\\d+': 'MakePayment.cardDetails'
    //         }
    //     });
    // }



    // public async makePayment(phoneNumber, card_details) {
    //     //2000,1234567676543212,12,18,123

    //     return new Promise((resolve, reject) => {
    //         console.log("card Details : " + card_details);
    //         card_details[0]
    //         //initiate Payment
    //         request.post({
    //             url: `${pvURL}api/transaction/initiate`,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pvToken,
    //                 "Content-Type": "application/json"
    //             },
    //             body: {
    //                 "amount": card_details[0] + '00',
    //                 "currency": "NGN",
    //                 "customer_email": 'templar@3nitix.guru', //templar@3nitix.guru ernest.uduje@iisysgroup.com
    //                 "description": 'Payment by ' + phoneNumber + ' from USSD'
    //             },
    //             json: true
    //         }, function (ierror, iresponse, body) {
    //             console.log('Initialise payment Error for ' + phoneNumber + ' ' + ierror);
    //             console.log('Initialise Response ' + JSON.stringify(iresponse));
    //             //Charge Card
    //             request.post({
    //                 url: `${pvURL}api/transaction/chargeCard/${iresponse.body.data.gateway_code}`,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pvToken,
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: {
    //                     "card_number": card_details[1],
    //                     "card_month": card_details[2],
    //                     "card_year": card_details[3],
    //                     "security_code": card_details[4]
    //                 },
    //                 json: true
    //             }, function (rerror, rresponse, body) {
    //                 console.log('Charge payment Error for ' + phoneNumber + ' ' + rerror);
    //                 console.log('Charge Response ' + JSON.stringify(rresponse));
    //                 // resolve(rresponse);  
    //                 //Send Message
    //                 request.post({
    //                     url: `${infobipURL}sms_gate`,
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: {
    //                         "from": "Payvice",
    //                         "to": "2348182447114",//2348054400003 2348098367527, 8098367527
    //                         "text": `USSD Payment of ${card_details[0]} was successful\n\nRefno:${rresponse.body.data.reference}`
    //                     },
    //                     json: true
    //                 }, function (serror, sresponse, body) {
    //                     console.log('Charge SMS Error for ' + phoneNumber + ' ' + serror);
    //                     console.log('SMS Response ' + JSON.stringify(sresponse));
    //                     resolve(rresponse);
    //                     reject('An error occurred, try again later')
    //                 });
    //             });
    //         });
    //         // resolve(ref); 
    //     })
    // }


    // async buyAirtime(phoneNumber, amount) {
    //     return new Promise((resolve, reject) => {
    //         console.log("buyAirtime Amount: " + amount);
    //         console.log("buyAirtime Mobile: " + phoneNumber)
    //         resolve(amount);
    //         reject("An error occurred, try again later")
    //     })
    // }


    // async fetchBalance(phoneNumber) {
    //     return new Promise((resolve, reject) => {
    //         console.log("FetchBalance Mobile: " + phoneNumber)
    //         resolve(50000);
    //         reject("An error occurred, try again later");
    //     })
    // }
}
