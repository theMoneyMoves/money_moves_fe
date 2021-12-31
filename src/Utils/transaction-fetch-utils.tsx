
const url = 'https://sleepy-garden-91367.herokuapp.com';

export async function newTransaction(transactionInfo: string){

    const authURL = `${url}/transactions/makeTransaction`

    const response = await fetch(authURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionInfo),
    });

    const data = await response.json();
    // console.log('data', data);
    return data.token;
}

export async function getRecipient(email:string) {
    console.log('email2', email)
    const searchRecipientURL = `${url}/transactions/searchrecipient/${email}`; 
    const response = await fetch(searchRecipientURL, {
        method: 'GET',
        // credentials: 'include',
        headers: {
        //   'Authorization': token,
          'Content-Type': 'application/json'
        }
    });
    const recipientData = await response.json();
    return recipientData;
}

