import "./OrderSummary.css"
import React from 'react'
import { CartProductsSummary } from "../CartProductsSummary/CartProductsSummary"
import { BillingSummary } from "../BillingSummary/BillingSummary"
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress"

export const OrderSummary = () => {
  return (
    <div className="order-details-container">
          <CartProductsSummary />

          <BillingSummary />

          <DeliveryAddress/>
        </div>
  )
}
