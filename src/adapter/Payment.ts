import { AppDataSource } from "../repository/app_data_DB";
import { Payment } from "../repository/Payment";
import { PaymentModel } from "../server/model";

const PaymentRepository = AppDataSource.getRepository(Payment)

export function PaymentPost(payment: PaymentModel) {
    const paymentcreate = PaymentRepository.create({
        method: payment.method,
        amount: Number(payment.amount),
        order: {id: payment.orderId},
        status: payment.status
    })

    return PaymentRepository.save(paymentcreate)
}