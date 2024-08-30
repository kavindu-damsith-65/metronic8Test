import * as Yup from 'yup'

export interface ICreateAccount {
 
  businessName: string
  businessAddress: string
  businessLocation: string,
  businessCountry:string,
  businessDescription: string
  businessEmail: string
  nameOnCard: string
  cardNumber: string
  cardExpiryMonth: string
  cardExpiryYear: string
  cardCvv: string
  saveCard: string
}

const createAccountSchemas = [
  
  Yup.object({
    businessName: Yup.string().required().label('Business Name'),
    businessAddress: Yup.string().required().label('Shortened Descriptor'),
    businessLocation: Yup.string().required().label('Corporation Type'),
    businessCountry: Yup.string().required().label('Corporation Type'),
    businessEmail: Yup.string().required().label('Contact Email'),
  }),
  Yup.object({
    nameOnCard: Yup.string().required().label('Name On Card'),
    cardNumber: Yup.string().required().label('Card Number'),
    cardExpiryMonth: Yup.string().required().label('Expiration Month'),
    cardExpiryYear: Yup.string().required().label('Expiration Year'),
    cardCvv: Yup.string().required().label('CVV'),
  }),
]

const inits: ICreateAccount = {
 
  businessName: '',
  businessAddress: '',
  businessLocation: '5',
  businessCountry: 'LK',
  businessDescription: '',
  businessEmail: '',
  nameOnCard: '',
  cardNumber: '',
  cardExpiryMonth: '',
  cardExpiryYear: '',
  cardCvv: '',
  saveCard: '1',
}

export {createAccountSchemas, inits}
