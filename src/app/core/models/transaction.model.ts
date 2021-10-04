export class Transaction {
    budget_uid: number;
    createdAt: string;
    is_active: boolean;
    payeeName: string;
    transaction_amount: number;
    transaction_category: string;
    transaction_category_id: number;
    transaction_created_date: string;
    transaction_type: string;
    transaction_uid: number;
    updatedAt: string;
    user_uid: number
}

export class TransactionList {
    data: Transaction[]
}
