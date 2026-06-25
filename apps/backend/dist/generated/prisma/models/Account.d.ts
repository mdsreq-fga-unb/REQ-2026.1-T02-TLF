import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AccountModel = runtime.Types.Result.DefaultSelection<Prisma.$AccountPayload>;
export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
export type AccountAvgAggregateOutputType = {
    balance: number | null;
    closingDay: number | null;
    dueDay: number | null;
    creditLimit: number | null;
};
export type AccountSumAggregateOutputType = {
    balance: number | null;
    closingDay: number | null;
    dueDay: number | null;
    creditLimit: number | null;
};
export type AccountMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    type: $Enums.AccountType | null;
    balance: number | null;
    closingDay: number | null;
    dueDay: number | null;
    creditLimit: number | null;
    currency: $Enums.Currency | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AccountMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    type: $Enums.AccountType | null;
    balance: number | null;
    closingDay: number | null;
    dueDay: number | null;
    creditLimit: number | null;
    currency: $Enums.Currency | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AccountCountAggregateOutputType = {
    id: number;
    institutionId: number;
    name: number;
    type: number;
    balance: number;
    closingDay: number;
    dueDay: number;
    creditLimit: number;
    currency: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AccountAvgAggregateInputType = {
    balance?: true;
    closingDay?: true;
    dueDay?: true;
    creditLimit?: true;
};
export type AccountSumAggregateInputType = {
    balance?: true;
    closingDay?: true;
    dueDay?: true;
    creditLimit?: true;
};
export type AccountMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    balance?: true;
    closingDay?: true;
    dueDay?: true;
    creditLimit?: true;
    currency?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AccountMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    balance?: true;
    closingDay?: true;
    dueDay?: true;
    creditLimit?: true;
    currency?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AccountCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    type?: true;
    balance?: true;
    closingDay?: true;
    dueDay?: true;
    creditLimit?: true;
    currency?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AccountCountAggregateInputType;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccount[P]> : Prisma.GetScalarType<T[P], AggregateAccount[P]>;
};
export type AccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithAggregationInput | Prisma.AccountOrderByWithAggregationInput[];
    by: Prisma.AccountScalarFieldEnum[] | Prisma.AccountScalarFieldEnum;
    having?: Prisma.AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
};
export type AccountGroupByOutputType = {
    id: string;
    institutionId: string;
    name: string;
    type: $Enums.AccountType;
    balance: number;
    closingDay: number | null;
    dueDay: number | null;
    creditLimit: number | null;
    currency: $Enums.Currency;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
};
export type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AccountGroupByOutputType[P]>;
}>>;
export type AccountWhereInput = {
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    OR?: Prisma.AccountWhereInput[];
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    id?: Prisma.StringFilter<"Account"> | string;
    institutionId?: Prisma.StringFilter<"Account"> | string;
    name?: Prisma.StringFilter<"Account"> | string;
    type?: Prisma.EnumAccountTypeFilter<"Account"> | $Enums.AccountType;
    balance?: Prisma.IntFilter<"Account"> | number;
    closingDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    dueDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    creditLimit?: Prisma.IntNullableFilter<"Account"> | number | null;
    currency?: Prisma.EnumCurrencyFilter<"Account"> | $Enums.Currency;
    isActive?: Prisma.BoolFilter<"Account"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    invoices?: Prisma.InvoiceListRelationFilter;
    recurrences?: Prisma.RecurrenceListRelationFilter;
};
export type AccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDay?: Prisma.SortOrderInput | Prisma.SortOrder;
    creditLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    invoices?: Prisma.InvoiceOrderByRelationAggregateInput;
    recurrences?: Prisma.RecurrenceOrderByRelationAggregateInput;
};
export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    OR?: Prisma.AccountWhereInput[];
    NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
    institutionId?: Prisma.StringFilter<"Account"> | string;
    name?: Prisma.StringFilter<"Account"> | string;
    type?: Prisma.EnumAccountTypeFilter<"Account"> | $Enums.AccountType;
    balance?: Prisma.IntFilter<"Account"> | number;
    closingDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    dueDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    creditLimit?: Prisma.IntNullableFilter<"Account"> | number | null;
    currency?: Prisma.EnumCurrencyFilter<"Account"> | $Enums.Currency;
    isActive?: Prisma.BoolFilter<"Account"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    invoices?: Prisma.InvoiceListRelationFilter;
    recurrences?: Prisma.RecurrenceListRelationFilter;
}, "id">;
export type AccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDay?: Prisma.SortOrderInput | Prisma.SortOrder;
    creditLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AccountCountOrderByAggregateInput;
    _avg?: Prisma.AccountAvgOrderByAggregateInput;
    _max?: Prisma.AccountMaxOrderByAggregateInput;
    _min?: Prisma.AccountMinOrderByAggregateInput;
    _sum?: Prisma.AccountSumOrderByAggregateInput;
};
export type AccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.AccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AccountScalarWhereWithAggregatesInput | Prisma.AccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Account"> | string;
    type?: Prisma.EnumAccountTypeWithAggregatesFilter<"Account"> | $Enums.AccountType;
    balance?: Prisma.IntWithAggregatesFilter<"Account"> | number;
    closingDay?: Prisma.IntNullableWithAggregatesFilter<"Account"> | number | null;
    dueDay?: Prisma.IntNullableWithAggregatesFilter<"Account"> | number | null;
    creditLimit?: Prisma.IntNullableWithAggregatesFilter<"Account"> | number | null;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"Account"> | $Enums.Currency;
    isActive?: Prisma.BoolWithAggregatesFilter<"Account"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Account"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Account"> | Date | string;
};
export type AccountCreateInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAccountsInput;
    invoices?: Prisma.InvoiceCreateNestedManyWithoutAccountInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutAccountInput;
};
export type AccountUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.InvoiceUncheckedCreateNestedManyWithoutAccountInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutAccountInput;
};
export type AccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAccountsNestedInput;
    invoices?: Prisma.InvoiceUpdateManyWithoutAccountNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.InvoiceUncheckedUpdateManyWithoutAccountNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutAccountNestedInput;
};
export type AccountCreateManyInput = {
    id?: string;
    institutionId: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AccountListRelationFilter = {
    every?: Prisma.AccountWhereInput;
    some?: Prisma.AccountWhereInput;
    none?: Prisma.AccountWhereInput;
};
export type AccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AccountAvgOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
};
export type AccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AccountSumOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
};
export type AccountScalarRelationFilter = {
    is?: Prisma.AccountWhereInput;
    isNot?: Prisma.AccountWhereInput;
};
export type AccountCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput> | Prisma.AccountCreateWithoutInstitutionInput[] | Prisma.AccountUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInstitutionInput | Prisma.AccountCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.AccountCreateManyInstitutionInputEnvelope;
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
};
export type AccountUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput> | Prisma.AccountCreateWithoutInstitutionInput[] | Prisma.AccountUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInstitutionInput | Prisma.AccountCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.AccountCreateManyInstitutionInputEnvelope;
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
};
export type AccountUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput> | Prisma.AccountCreateWithoutInstitutionInput[] | Prisma.AccountUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInstitutionInput | Prisma.AccountCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.AccountUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.AccountUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.AccountCreateManyInstitutionInputEnvelope;
    set?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    disconnect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    delete?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    update?: Prisma.AccountUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.AccountUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.AccountUpdateManyWithWhereWithoutInstitutionInput | Prisma.AccountUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
};
export type AccountUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput> | Prisma.AccountCreateWithoutInstitutionInput[] | Prisma.AccountUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInstitutionInput | Prisma.AccountCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.AccountUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.AccountUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.AccountCreateManyInstitutionInputEnvelope;
    set?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    disconnect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    delete?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    connect?: Prisma.AccountWhereUniqueInput | Prisma.AccountWhereUniqueInput[];
    update?: Prisma.AccountUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.AccountUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.AccountUpdateManyWithWhereWithoutInstitutionInput | Prisma.AccountUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
};
export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.Currency;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type AccountCreateNestedOneWithoutInvoicesInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInvoicesInput, Prisma.AccountUncheckedCreateWithoutInvoicesInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInvoicesInput;
    connect?: Prisma.AccountWhereUniqueInput;
};
export type AccountUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutInvoicesInput, Prisma.AccountUncheckedCreateWithoutInvoicesInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutInvoicesInput;
    upsert?: Prisma.AccountUpsertWithoutInvoicesInput;
    connect?: Prisma.AccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AccountUpdateToOneWithWhereWithoutInvoicesInput, Prisma.AccountUpdateWithoutInvoicesInput>, Prisma.AccountUncheckedUpdateWithoutInvoicesInput>;
};
export type AccountCreateNestedOneWithoutRecurrencesInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRecurrencesInput, Prisma.AccountUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRecurrencesInput;
    connect?: Prisma.AccountWhereUniqueInput;
};
export type AccountUpdateOneRequiredWithoutRecurrencesNestedInput = {
    create?: Prisma.XOR<Prisma.AccountCreateWithoutRecurrencesInput, Prisma.AccountUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.AccountCreateOrConnectWithoutRecurrencesInput;
    upsert?: Prisma.AccountUpsertWithoutRecurrencesInput;
    connect?: Prisma.AccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AccountUpdateToOneWithWhereWithoutRecurrencesInput, Prisma.AccountUpdateWithoutRecurrencesInput>, Prisma.AccountUncheckedUpdateWithoutRecurrencesInput>;
};
export type AccountCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.InvoiceCreateNestedManyWithoutAccountInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutAccountInput;
};
export type AccountUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.InvoiceUncheckedCreateNestedManyWithoutAccountInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutAccountInput;
};
export type AccountCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput>;
};
export type AccountCreateManyInstitutionInputEnvelope = {
    data: Prisma.AccountCreateManyInstitutionInput | Prisma.AccountCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type AccountUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.AccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.AccountUpdateWithoutInstitutionInput, Prisma.AccountUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutInstitutionInput, Prisma.AccountUncheckedCreateWithoutInstitutionInput>;
};
export type AccountUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutInstitutionInput, Prisma.AccountUncheckedUpdateWithoutInstitutionInput>;
};
export type AccountUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.AccountScalarWhereInput;
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyWithoutInstitutionInput>;
};
export type AccountScalarWhereInput = {
    AND?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
    OR?: Prisma.AccountScalarWhereInput[];
    NOT?: Prisma.AccountScalarWhereInput | Prisma.AccountScalarWhereInput[];
    id?: Prisma.StringFilter<"Account"> | string;
    institutionId?: Prisma.StringFilter<"Account"> | string;
    name?: Prisma.StringFilter<"Account"> | string;
    type?: Prisma.EnumAccountTypeFilter<"Account"> | $Enums.AccountType;
    balance?: Prisma.IntFilter<"Account"> | number;
    closingDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    dueDay?: Prisma.IntNullableFilter<"Account"> | number | null;
    creditLimit?: Prisma.IntNullableFilter<"Account"> | number | null;
    currency?: Prisma.EnumCurrencyFilter<"Account"> | $Enums.Currency;
    isActive?: Prisma.BoolFilter<"Account"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
};
export type AccountCreateWithoutInvoicesInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAccountsInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutAccountInput;
};
export type AccountUncheckedCreateWithoutInvoicesInput = {
    id?: string;
    institutionId: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutAccountInput;
};
export type AccountCreateOrConnectWithoutInvoicesInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutInvoicesInput, Prisma.AccountUncheckedCreateWithoutInvoicesInput>;
};
export type AccountUpsertWithoutInvoicesInput = {
    update: Prisma.XOR<Prisma.AccountUpdateWithoutInvoicesInput, Prisma.AccountUncheckedUpdateWithoutInvoicesInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutInvoicesInput, Prisma.AccountUncheckedCreateWithoutInvoicesInput>;
    where?: Prisma.AccountWhereInput;
};
export type AccountUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: Prisma.AccountWhereInput;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutInvoicesInput, Prisma.AccountUncheckedUpdateWithoutInvoicesInput>;
};
export type AccountUpdateWithoutInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAccountsNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateWithoutInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutAccountNestedInput;
};
export type AccountCreateWithoutRecurrencesInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutAccountsInput;
    invoices?: Prisma.InvoiceCreateNestedManyWithoutAccountInput;
};
export type AccountUncheckedCreateWithoutRecurrencesInput = {
    id?: string;
    institutionId: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.InvoiceUncheckedCreateNestedManyWithoutAccountInput;
};
export type AccountCreateOrConnectWithoutRecurrencesInput = {
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateWithoutRecurrencesInput, Prisma.AccountUncheckedCreateWithoutRecurrencesInput>;
};
export type AccountUpsertWithoutRecurrencesInput = {
    update: Prisma.XOR<Prisma.AccountUpdateWithoutRecurrencesInput, Prisma.AccountUncheckedUpdateWithoutRecurrencesInput>;
    create: Prisma.XOR<Prisma.AccountCreateWithoutRecurrencesInput, Prisma.AccountUncheckedCreateWithoutRecurrencesInput>;
    where?: Prisma.AccountWhereInput;
};
export type AccountUpdateToOneWithWhereWithoutRecurrencesInput = {
    where?: Prisma.AccountWhereInput;
    data: Prisma.XOR<Prisma.AccountUpdateWithoutRecurrencesInput, Prisma.AccountUncheckedUpdateWithoutRecurrencesInput>;
};
export type AccountUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutAccountsNestedInput;
    invoices?: Prisma.InvoiceUpdateManyWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.InvoiceUncheckedUpdateManyWithoutAccountNestedInput;
};
export type AccountCreateManyInstitutionInput = {
    id?: string;
    name: string;
    type?: $Enums.AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: $Enums.Currency;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AccountUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.InvoiceUpdateManyWithoutAccountNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.InvoiceUncheckedUpdateManyWithoutAccountNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutAccountNestedInput;
};
export type AccountUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dueDay?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    creditLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AccountCountOutputType = {
    invoices: number;
    recurrences: number;
};
export type AccountCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoices?: boolean | AccountCountOutputTypeCountInvoicesArgs;
    recurrences?: boolean | AccountCountOutputTypeCountRecurrencesArgs;
};
export type AccountCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountCountOutputTypeSelect<ExtArgs> | null;
};
export type AccountCountOutputTypeCountInvoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
};
export type AccountCountOutputTypeCountRecurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
};
export type AccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    balance?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    creditLimit?: boolean;
    currency?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    invoices?: boolean | Prisma.Account$invoicesArgs<ExtArgs>;
    recurrences?: boolean | Prisma.Account$recurrencesArgs<ExtArgs>;
    _count?: boolean | Prisma.AccountCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    balance?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    creditLimit?: boolean;
    currency?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    balance?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    creditLimit?: boolean;
    currency?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["account"]>;
export type AccountSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    type?: boolean;
    balance?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    creditLimit?: boolean;
    currency?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "name" | "type" | "balance" | "closingDay" | "dueDay" | "creditLimit" | "currency" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>;
export type AccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    invoices?: boolean | Prisma.Account$invoicesArgs<ExtArgs>;
    recurrences?: boolean | Prisma.Account$recurrencesArgs<ExtArgs>;
    _count?: boolean | Prisma.AccountCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type AccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type $AccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Account";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        invoices: Prisma.$InvoicePayload<ExtArgs>[];
        recurrences: Prisma.$RecurrencePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        name: string;
        type: $Enums.AccountType;
        balance: number;
        closingDay: number | null;
        dueDay: number | null;
        creditLimit: number | null;
        currency: $Enums.Currency;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["account"]>;
    composites: {};
};
export type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountPayload, S>;
export type AccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountCountAggregateInputType | true;
};
export interface AccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Account'];
        meta: {
            name: 'Account';
        };
    };
    findUnique<T extends AccountFindUniqueArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AccountFindFirstArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AccountFindManyArgs>(args?: Prisma.SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AccountCreateArgs>(args: Prisma.SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AccountCreateManyArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AccountDeleteArgs>(args: Prisma.SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AccountUpdateArgs>(args: Prisma.SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AccountUpdateManyArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AccountUpsertArgs>(args: Prisma.SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AccountCountArgs>(args?: Prisma.Subset<T, AccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AccountCountAggregateOutputType> : number>;
    aggregate<T extends AccountAggregateArgs>(args: Prisma.Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>;
    groupBy<T extends AccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AccountGroupByArgs['orderBy'];
    } : {
        orderBy?: AccountGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AccountFieldRefs;
}
export interface Prisma__AccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invoices<T extends Prisma.Account$invoicesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Account$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    recurrences<T extends Prisma.Account$recurrencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Account$recurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AccountFieldRefs {
    readonly id: Prisma.FieldRef<"Account", 'String'>;
    readonly institutionId: Prisma.FieldRef<"Account", 'String'>;
    readonly name: Prisma.FieldRef<"Account", 'String'>;
    readonly type: Prisma.FieldRef<"Account", 'AccountType'>;
    readonly balance: Prisma.FieldRef<"Account", 'Int'>;
    readonly closingDay: Prisma.FieldRef<"Account", 'Int'>;
    readonly dueDay: Prisma.FieldRef<"Account", 'Int'>;
    readonly creditLimit: Prisma.FieldRef<"Account", 'Int'>;
    readonly currency: Prisma.FieldRef<"Account", 'Currency'>;
    readonly isActive: Prisma.FieldRef<"Account", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Account", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Account", 'DateTime'>;
}
export type AccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type AccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
};
export type AccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.AccountCreateManyInput | Prisma.AccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput;
    limit?: number;
};
export type AccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountUpdateManyMutationInput, Prisma.AccountUncheckedUpdateManyInput>;
    where?: Prisma.AccountWhereInput;
    limit?: number;
    include?: Prisma.AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountCreateInput, Prisma.AccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AccountUpdateInput, Prisma.AccountUncheckedUpdateInput>;
};
export type AccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where: Prisma.AccountWhereUniqueInput;
};
export type AccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
    limit?: number;
};
export type Account$invoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type Account$recurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    where?: Prisma.RecurrenceWhereInput;
    orderBy?: Prisma.RecurrenceOrderByWithRelationInput | Prisma.RecurrenceOrderByWithRelationInput[];
    cursor?: Prisma.RecurrenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecurrenceScalarFieldEnum | Prisma.RecurrenceScalarFieldEnum[];
};
export type AccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
};
