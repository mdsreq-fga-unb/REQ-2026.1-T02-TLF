import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type InvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoicePayload>;
export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type InvoiceAvgAggregateOutputType = {
    referenceMonth: number | null;
    referenceYear: number | null;
    totalAmount: number | null;
    paidAmount: number | null;
    closingDay: number | null;
    dueDay: number | null;
};
export type InvoiceSumAggregateOutputType = {
    referenceMonth: number | null;
    referenceYear: number | null;
    totalAmount: number | null;
    paidAmount: number | null;
    closingDay: number | null;
    dueDay: number | null;
};
export type InvoiceMinAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    status: $Enums.InvoiceStatus | null;
    paymentStatus: $Enums.InvoicePaymentStatus | null;
    referenceMonth: number | null;
    referenceYear: number | null;
    totalAmount: number | null;
    paidAmount: number | null;
    closingDay: number | null;
    dueDay: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceMaxAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    status: $Enums.InvoiceStatus | null;
    paymentStatus: $Enums.InvoicePaymentStatus | null;
    referenceMonth: number | null;
    referenceYear: number | null;
    totalAmount: number | null;
    paidAmount: number | null;
    closingDay: number | null;
    dueDay: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceCountAggregateOutputType = {
    id: number;
    accountId: number;
    status: number;
    paymentStatus: number;
    referenceMonth: number;
    referenceYear: number;
    totalAmount: number;
    paidAmount: number;
    closingDay: number;
    dueDay: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InvoiceAvgAggregateInputType = {
    referenceMonth?: true;
    referenceYear?: true;
    totalAmount?: true;
    paidAmount?: true;
    closingDay?: true;
    dueDay?: true;
};
export type InvoiceSumAggregateInputType = {
    referenceMonth?: true;
    referenceYear?: true;
    totalAmount?: true;
    paidAmount?: true;
    closingDay?: true;
    dueDay?: true;
};
export type InvoiceMinAggregateInputType = {
    id?: true;
    accountId?: true;
    status?: true;
    paymentStatus?: true;
    referenceMonth?: true;
    referenceYear?: true;
    totalAmount?: true;
    paidAmount?: true;
    closingDay?: true;
    dueDay?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    status?: true;
    paymentStatus?: true;
    referenceMonth?: true;
    referenceYear?: true;
    totalAmount?: true;
    paidAmount?: true;
    closingDay?: true;
    dueDay?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceCountAggregateInputType = {
    id?: true;
    accountId?: true;
    status?: true;
    paymentStatus?: true;
    referenceMonth?: true;
    referenceYear?: true;
    totalAmount?: true;
    paidAmount?: true;
    closingDay?: true;
    dueDay?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceCountAggregateInputType;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoice[P]> : Prisma.GetScalarType<T[P], AggregateInvoice[P]>;
};
export type InvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithAggregationInput | Prisma.InvoiceOrderByWithAggregationInput[];
    by: Prisma.InvoiceScalarFieldEnum[] | Prisma.InvoiceScalarFieldEnum;
    having?: Prisma.InvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceCountAggregateInputType | true;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type InvoiceGroupByOutputType = {
    id: string;
    accountId: string;
    status: $Enums.InvoiceStatus;
    paymentStatus: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount: number;
    paidAmount: number;
    closingDay: number;
    dueDay: number;
    createdAt: Date;
    updatedAt: Date;
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]>;
}>>;
export type InvoiceWhereInput = {
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    accountId?: Prisma.StringFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFilter<"Invoice"> | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFilter<"Invoice"> | number;
    referenceYear?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    paidAmount?: Prisma.IntFilter<"Invoice"> | number;
    closingDay?: Prisma.IntFilter<"Invoice"> | number;
    dueDay?: Prisma.IntFilter<"Invoice"> | number;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type InvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
};
export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    accountId?: Prisma.StringFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFilter<"Invoice"> | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFilter<"Invoice"> | number;
    referenceYear?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    paidAmount?: Prisma.IntFilter<"Invoice"> | number;
    closingDay?: Prisma.IntFilter<"Invoice"> | number;
    dueDay?: Prisma.IntFilter<"Invoice"> | number;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type InvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InvoiceCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceSumOrderByAggregateInput;
};
export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    accountId?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    referenceYear?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    paidAmount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    closingDay?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    dueDay?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateInput = {
    id?: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutInvoicesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateInput = {
    id?: string;
    accountId: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutInvoicesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceCreateManyInput = {
    id?: string;
    accountId: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceListRelationFilter = {
    every?: Prisma.InvoiceWhereInput;
    some?: Prisma.InvoiceWhereInput;
    none?: Prisma.InvoiceWhereInput;
};
export type InvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceAvgOrderByAggregateInput = {
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
};
export type InvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceSumOrderByAggregateInput = {
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
};
export type InvoiceNullableScalarRelationFilter = {
    is?: Prisma.InvoiceWhereInput | null;
    isNot?: Prisma.InvoiceWhereInput | null;
};
export type InvoiceCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput> | Prisma.InvoiceCreateWithoutAccountInput[] | Prisma.InvoiceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutAccountInput | Prisma.InvoiceCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.InvoiceCreateManyAccountInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput> | Prisma.InvoiceCreateWithoutAccountInput[] | Prisma.InvoiceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutAccountInput | Prisma.InvoiceCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.InvoiceCreateManyAccountInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput> | Prisma.InvoiceCreateWithoutAccountInput[] | Prisma.InvoiceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutAccountInput | Prisma.InvoiceCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutAccountInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.InvoiceCreateManyAccountInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutAccountInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutAccountInput | Prisma.InvoiceUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput> | Prisma.InvoiceCreateWithoutAccountInput[] | Prisma.InvoiceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutAccountInput | Prisma.InvoiceCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutAccountInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.InvoiceCreateManyAccountInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutAccountInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutAccountInput | Prisma.InvoiceUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus;
};
export type EnumInvoicePaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoicePaymentStatus;
};
export type InvoiceCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutTransactionsInput, Prisma.InvoiceUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateOneWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutTransactionsInput, Prisma.InvoiceUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.InvoiceUpsertWithoutTransactionsInput;
    disconnect?: Prisma.InvoiceWhereInput | boolean;
    delete?: Prisma.InvoiceWhereInput | boolean;
    connect?: Prisma.InvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvoiceUpdateToOneWithWhereWithoutTransactionsInput, Prisma.InvoiceUpdateWithoutTransactionsInput>, Prisma.InvoiceUncheckedUpdateWithoutTransactionsInput>;
};
export type InvoiceCreateWithoutAccountInput = {
    id?: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateWithoutAccountInput = {
    id?: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceCreateOrConnectWithoutAccountInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput>;
};
export type InvoiceCreateManyAccountInputEnvelope = {
    data: Prisma.InvoiceCreateManyAccountInput | Prisma.InvoiceCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type InvoiceUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutAccountInput, Prisma.InvoiceUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutAccountInput, Prisma.InvoiceUncheckedCreateWithoutAccountInput>;
};
export type InvoiceUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutAccountInput, Prisma.InvoiceUncheckedUpdateWithoutAccountInput>;
};
export type InvoiceUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.InvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyWithoutAccountInput>;
};
export type InvoiceScalarWhereInput = {
    AND?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    OR?: Prisma.InvoiceScalarWhereInput[];
    NOT?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    accountId?: Prisma.StringFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFilter<"Invoice"> | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFilter<"Invoice"> | number;
    referenceYear?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    paidAmount?: Prisma.IntFilter<"Invoice"> | number;
    closingDay?: Prisma.IntFilter<"Invoice"> | number;
    dueDay?: Prisma.IntFilter<"Invoice"> | number;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateWithoutTransactionsInput = {
    id?: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutInvoicesInput;
};
export type InvoiceUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    accountId: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutTransactionsInput, Prisma.InvoiceUncheckedCreateWithoutTransactionsInput>;
};
export type InvoiceUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutTransactionsInput, Prisma.InvoiceUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutTransactionsInput, Prisma.InvoiceUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.InvoiceWhereInput;
};
export type InvoiceUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.InvoiceWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutTransactionsInput, Prisma.InvoiceUncheckedUpdateWithoutTransactionsInput>;
};
export type InvoiceUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type InvoiceUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCreateManyAccountInput = {
    id?: string;
    status?: $Enums.InvoiceStatus;
    paymentStatus?: $Enums.InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paymentStatus?: Prisma.EnumInvoicePaymentStatusFieldUpdateOperationsInput | $Enums.InvoicePaymentStatus;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    paidAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCountOutputType = {
    transactions: number;
};
export type InvoiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | InvoiceCountOutputTypeCountTransactionsArgs;
};
export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCountOutputTypeSelect<ExtArgs> | null;
};
export type InvoiceCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type InvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Invoice$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "status" | "paymentStatus" | "referenceMonth" | "referenceYear" | "totalAmount" | "paidAmount" | "closingDay" | "dueDay" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>;
export type InvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Invoice$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
};
export type $InvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Invoice";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        accountId: string;
        status: $Enums.InvoiceStatus;
        paymentStatus: $Enums.InvoicePaymentStatus;
        referenceMonth: number;
        referenceYear: number;
        totalAmount: number;
        paidAmount: number;
        closingDay: number;
        dueDay: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["invoice"]>;
    composites: {};
};
export type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoicePayload, S>;
export type InvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceCountAggregateInputType | true;
};
export interface InvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Invoice'];
        meta: {
            name: 'Invoice';
        };
    };
    findUnique<T extends InvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceCreateArgs>(args: Prisma.SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceCountArgs>(args?: Prisma.Subset<T, InvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceAggregateArgs>(args: Prisma.Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>;
    groupBy<T extends InvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceFieldRefs;
}
export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Invoice$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Invoice$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"Invoice", 'String'>;
    readonly accountId: Prisma.FieldRef<"Invoice", 'String'>;
    readonly status: Prisma.FieldRef<"Invoice", 'InvoiceStatus'>;
    readonly paymentStatus: Prisma.FieldRef<"Invoice", 'InvoicePaymentStatus'>;
    readonly referenceMonth: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly referenceYear: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly totalAmount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly paidAmount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly closingDay: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly dueDay: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
}
export type InvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
};
export type InvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
    include?: Prisma.InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
};
export type InvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type Invoice$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type InvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
};
