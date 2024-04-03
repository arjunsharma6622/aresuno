import { validationRules } from './constants'


const FormValidation =()=>{
return {
  // couponCode: {
  //   required: t('PLEASE_ENTER_COUPON_CODE'),
  //   pattern: {
  //     value: /^[^\s][A-Za-z0-9]+$/ ,
  //     message: t('CANNOT_START_WITH_A_SPACE_AND_USE_ONLY_CAPITAL_LETTERS')
  //   },
  //   minLength: {
  //     value: 15,
  //     message: t('MINIMUM_LENGTH_MUST_BE_15')
  //   },
  // },
  // couponAmount: {
  //   required: t('PLEASE_ENTER_COUPON_AMOUNT'),
  //   pattern: {
  //     value: /^[^\s].*/,
  //     message: t('CANNOT_START_WITH_A_SPACE')
  //   }
  // },
  // rewardAmount: {
  //   required: t('PLEASE_ENTER_REWARD_AMOUNT'),
  //   pattern: {
  //     value: /^[^\s].*/,
  //     message: t('CANNOT_START_WITH_A_SPACE')
  //   }
  // },
  name: {
    required: 'Please enter name.',
    pattern: {
      value: /^[^\s].*/,
      message: 'Name cannot start with white space.'
    },
    minLength: {
      value: 2,
      message: 'Minimum length should be 2.'
    },
    validate: {
      whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
    }
  },
 
 
  // lastName: {
  //   required: t('PLEASE_ENTER_LAST_NAME'),
  //   pattern: {
  //     value: /^[^\s].*/,
  //     message: t('CANNOT_START_WITH_A_SPACE')
  //   },
  //   minLength: {
  //     value: 2,
  //     message: t('MINIMUM_LENGTH_MUST_BE_2')
  //   },
  //   maxLength: {
  //     value: 20,
  //     message: t('MAXIMUM_LENGTH_SHOULD_BE_20_CHARACTERS')
  //   },
  //   validate: {
  //     whiteSpace: value => (value.trim() ? true : t('WHITE_SPACES_NOT_ALLOWED'))
  //   }
  // },
 
  email: {
    required: 'Please enter email ID.',
    pattern: {
      value: validationRules.email,
      message: 'Please enter valid email ID.'
    },
    validate: {
      whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
    }
  },

  password: {
    required: 'Please enter password.',
    pattern: {
      value: validationRules.password,
      message: validationRules.passwordMessage
    },
    validate: {
      whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
    }
  },


  ConfirmPassword: {
    required: 'Please enter confirm password.',
    pattern: {
      value: validationRules.password,
      message: validationRules.confirmPasswordMessage
    },
    // validate: {
    //   whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
    // }
  },




 
 
  mobile: {
    required: 'Please enter phone number.',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Please enter valid phone number.'
    },   
  },
  // description: {
  //   required: 'Please enter description.',
  //   minLength: {
  //     value: 10,
  //     message: 'Description should contains at least 10 characters.'
  //   },
  //   maxLength: {
  //     value: 300,
  //     message: 'Description should not exceed 300 characters.'
  //   },
  //   validate: {
  //     whiteSpace: value => (value.trim() ? true : t('WHITE_SPACES_NOT_ALLOWED'))
  //   }
  // },
  // title: {
  //   required: t('PLEASE_ENTER_TITLE'),
  //   minLength: {
  //     value: 2,
  //     message: 'Title should contains at least 2 characters.'
  //   },
  //   maxLength: {
  //     value: 100,
  //     message: 'Title should not exceed 100 characters.'
  //   },
  //   validate: {
  //     whiteSpace: value => (value.trim() ? true : t('WHITE_SPACES_NOT_ALLOWED'))
  //   }
  // },
  // address: {
  //   required: 'Please enter address.',
  //   minLength: {
  //     value: 10,
  //     message: 'Address should contains at least 10 characters.'
  //   },
  //   maxLength: {
  //     value: 250,
  //     message: 'Description should not exceed 250 characters.'
  //   },
  //   validate: {
  //     whiteSpace: value => (value.trim() ? true : t('WHITE_SPACES_NOT_ALLOWED'))
  //   }
  // },
  // url: {
  //   required: t('PLEASE_ENTER_URL'),
  //   pattern: {
  //     value: validationRules.url,
  //     message: t('INVALID_URL')
  //   },
  //   validate: {
  //     whiteSpace: value => (value.trim() ? true : t('WHITE_SPACES_NOT_ALLOWED'))
  //   }
  // },
 
}
}

export default FormValidation
