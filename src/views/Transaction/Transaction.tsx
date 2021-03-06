import React,{useState} from "react";
import { amountInput, buttonDiv, header, recipientInformation, searchFormDiv, transactionDiv, transactionFormContainer, transferButton } from './TransactionStyles';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Box, InputAdornment, Button } from '@mui/material';
import RecipientSearchForm from "../../components/Search/RecipientSearchForm";
import { getRecipient, newTransaction } from "../../Utils/transaction-fetch-utils";
import { conversitionCentsToDollars } from "../../Utils/helpers";
import CustomField from "../../components/CustomField/CustomField";

interface recipientInfoProps {
connected_acct_id: string;
email: string;
id: string;
name: string;
password_hash: string;
}

export default function Transaction(){
    const [email, setEmail ] = useState<string>('');
    const [amount, setAmount ] = useState<string>('');
    const [recipientId, setRecipientId] = useState<string>('')
    const [recipientInfo, setRecipientInfo] = useState<recipientInfoProps | undefined>(undefined);
    const [renderRecipientInfo, setRenderRecipientInfo] = useState(false)



    const handleRecipientSearch = async (event: React.FormEvent) =>{
            event.preventDefault();

        const recipientData = await getRecipient(email);
        setRecipientInfo(recipientData);
        setRenderRecipientInfo(true);
        
        if(recipientData.email !== email){
            setEmail('');
            return alert('No users under that email found')
        } 
        
        setRecipientId(recipientData.id);
        setEmail('');
    }

    //*********------------- stripe block ---------------------- ********
    const stripe = useStripe();
    const elements = useElements();
    const convertedAmount = conversitionCentsToDollars(+amount)
    

        const handleTransaction = async (event: React.FormEvent) =>{
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
          });

          if (error) {
            console.log('[error]', error);
          } 
        
          const { client_secret } = await newTransaction({
              recipient_id:+recipientId,
              amount:convertedAmount,
              payment_method_id:paymentMethod!.id
            })


        //*********-------- confirm payment --------------- ********
        await stripe.confirmCardPayment(
            client_secret, {
               payment_method:{
                card
               }
            }
        )
     
        await alert('Your Transaction was Successful')
        setAmount('')
        card.clear()
       
    //*********** ------------- stripe block ---------------------- ***********
     };
    
    return(
        <div>
            <h1 style={header}>Send Money with MoneyMoves</h1>
            <div style={searchFormDiv}>
                <RecipientSearchForm
                    email={email}
                    setEmail ={setEmail}
                    handleRecipientSearch = {handleRecipientSearch}
                />
            </div>
            <div style={recipientInformation}>
               {renderRecipientInfo ? (<p>You are sending money to {recipientInfo!.name}, with the email address: {recipientInfo!.email}</p>): (<p></p>)}
            </div>
            <Box component="form" onSubmit={handleTransaction} style={transactionFormContainer}>
                <div style={transactionDiv}>
                    <CustomField
                        id="amount-textfield"
                        label="Enter Transfer Amount Here:"
                        ariadescribedby={'Enter Transfer Amount Here:'}
                        name={'amout-textfield'}
                        type={'number'}
                        variant={'outlined'}
                        style={amountInput}
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        inputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                    />
                    <CardElement id="card-element"/>
                </div>
                <div style={buttonDiv}>
                    <Button type="submit" variant="contained" style={transferButton}>
                        Transfer
                    </Button>
                </div>
            </Box>
        </div>
       
    )
}