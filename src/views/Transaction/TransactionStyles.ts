import { borderRadius } from '@mui/system';
import * as CSS from 'csstype';

export const header: CSS.Properties = { 
    textAlign: 'center',
    color: '#6A7FDB',

   
}

export const searchFormDiv: CSS.Properties = { 
    backgroundColor: 'pink',
    width: '32rem',
    height: '5rem',
    margin: '0 auto',
}

export const transactionFormContainer: CSS.Properties = { 
    backgroundColor: 'transparent',
    boxShadow: '0 0 50px #45CB85',
    display: 'flex',
    flexDirection: 'column',
    width: '32rem',
    height: '32rem',
    margin: '0 auto',
    marginTop: '3rem',
    borderRadius: '.4rem',
    border: '.1rem solid #153131',
    justifyContent: 'space-between',

}

export const transferButton: CSS.Properties = { 
    backgroundColor: '#6A7FDB',
    width: '9rem'
    
}

export const buttonDiv: CSS.Properties = { 
    paddingBottom: '2rem',
    margin: '0 auto',
}

export const transactionDiv: CSS.Properties = { 
    padding: '2rem',
}

export const amountInput: CSS.Properties = { 
    width: '100%',
    marginBottom: '3rem',
    backgroundColor: 'transparent',

}