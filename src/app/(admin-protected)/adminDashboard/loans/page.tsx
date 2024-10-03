'use client'
import { LoansInterface } from '@/types/LoansTypes'
import React, { useState } from 'react'

const Loans = () => {
  const [allLoans, setAllLoans] = useState<LoansInterface[]>([])
  const columns = ['Monto', 'Estado', 'Plan', 'Prestamista', ]
  return (
    <div>Prestamos</div>
  )
}

export default Loans;