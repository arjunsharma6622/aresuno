import React from 'react'
import { useParams } from "react-router-dom";
import BusinessRegister from './BusinessRegister';

const BusinessEdit = () => {
    const { id } = useParams();
  return (
    <div>
        <h1>Business Edit</h1>
        <BusinessRegister />

    </div>
  )
}

export default BusinessEdit