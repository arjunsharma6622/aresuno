import ErrorMessage from '../ErrorMessage'
import React from 'react'

const OInputField = props => {
  const {
    wrapperClassName,
    name,
    businessMargin,
    inputLabel,
    selectOptions,
    type,
    labelType,
    placeholder,
    maxLength = 50,
    register,
    disable,
    errors,
    inputClass,
    ...rest
  } = props
  switch (type) {
    case 'hidden':
      return (
        <input
          type={type}
          name={name}
          id={name}
          {...register}
          {...rest}
          disabled={disable}
        />
      )
    case 'text':
    case 'url':
    case 'email':
    case 'password':
      return (
        <>
           {/* <label
            htmlFor={name}
            className='block text-gray-700 font-semibold mb-2'
          >
            {inputLabel}
            {labelType && <span className='text-red-500'>*</span>}
          </label>  */}
          
          <input
            name={name}
            type={type}
            className='w-full  border flex-[8] border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-500'
            placeholder={placeholder || ' '}
            maxLength={maxLength}
            id={name}
            {...register}
            {...rest}
            disabled={disable}
          />

          <ErrorMessage message={errors?.[name]?.message} />
        </>
      )

    case 'textarea':
      return (
        <div className={wrapperClassName || 'relative z-0 mb-6 w-full group'}>
          <label
            htmlFor={name}
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {inputLabel}
            {labelType && <span className='text-red-500'>*</span>}
          </label>
          <textarea
            type={type}
            name={name}
            id={name}
            className={`dark:bg-gray-900 block py-4 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0  peer ${inputClass ? inputClass : ''}`}
            placeholder={placeholder || ' '}
            maxLength={maxLength}

            {...register}
            {...rest}
            disabled={disable}
          />

          <ErrorMessage message={errors?.[name]?.message} />
        </div>
      )

    case 'select':
      return (
        <>
          <div className={wrapperClassName || 'relative z-0 mb-6 w-full group'}>
            <select
              id={name}
              className='block py-4 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0  peer'
              placeholder=' '
              {...register}
              {...rest}
              disabled={disable}
            >
              {selectOptions?.map(item => item)}
            </select>

            <label
              htmlFor={name}
              className='peer-focus:font-normal absolute text-sm text-[#A5A5A5] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'
            >
              {inputLabel}
              {labelType && <span className='text-red-500'>*</span>}
            </label>
          </div>

          <ErrorMessage message={errors?.[name]?.message} />
        </>
      )

    case 'number':
      return (
        <>
          <div className={wrapperClassName || 'relative z-0 mb-6 w-full group'}>
            <label
              htmlFor={name}
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {inputLabel}
              {labelType && <span className='text-red-500'>*</span>}
            </label>
            <input
              type={type}
              id={name}
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={placeholder || ' '}
              {...register}
              {...rest}
              disabled={disable}
            />

            <ErrorMessage message={errors?.[name]?.message} />
          </div>
        </>
      )

    default:
      return <div>Please provide some input props.</div>
  }
}

export default OInputField
