import { Transaction } from "..";

export class Budget {
    public budget_uid: number;
    public budget_category: string;
    public budget_category_id: number;
    public budget_name: string;
    public budget_created_date: string;
    public budget_amount: number;
    public created_user_uid: number;
    public is_active: boolean = true;
    public createdAt?: string;
    public updatedAt?: string;
    public transactions?: Transaction[];
    public totalTransactionAmount?: number;
    public completedBudgetPercentage?: number
}

export class BudgetList {
    data: Budget[]
}