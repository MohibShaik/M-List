export class TransactionCategory {
    transaction_category_uid: number;
    transaction_category_name: string;
    is_active: boolean;
    createdAt: string;
    UpdatedAt: string;
}

export class TransactionCategoryList {
    data: TransactionCategory[]
}
