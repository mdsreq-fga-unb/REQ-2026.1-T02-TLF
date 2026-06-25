import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InstitutionModel = runtime.Types.Result.DefaultSelection<Prisma.$InstitutionPayload>;
export type AggregateInstitution = {
    _count: InstitutionCountAggregateOutputType | null;
    _min: InstitutionMinAggregateOutputType | null;
    _max: InstitutionMaxAggregateOutputType | null;
};
export type InstitutionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    color: string | null;
    icon: string | null;
    logoUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InstitutionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    color: string | null;
    icon: string | null;
    logoUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InstitutionCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    color: number;
    icon: number;
    logoUrl: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InstitutionMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    color?: true;
    icon?: true;
    logoUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InstitutionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    color?: true;
    icon?: true;
    logoUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InstitutionCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    color?: true;
    icon?: true;
    logoUrl?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InstitutionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstitutionCountAggregateInputType;
    _min?: InstitutionMinAggregateInputType;
    _max?: InstitutionMaxAggregateInputType;
};
export type GetInstitutionAggregateType<T extends InstitutionAggregateArgs> = {
    [P in keyof T & keyof AggregateInstitution]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstitution[P]> : Prisma.GetScalarType<T[P], AggregateInstitution[P]>;
};
export type InstitutionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithAggregationInput | Prisma.InstitutionOrderByWithAggregationInput[];
    by: Prisma.InstitutionScalarFieldEnum[] | Prisma.InstitutionScalarFieldEnum;
    having?: Prisma.InstitutionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstitutionCountAggregateInputType | true;
    _min?: InstitutionMinAggregateInputType;
    _max?: InstitutionMaxAggregateInputType;
};
export type InstitutionGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    color: string;
    icon: string | null;
    logoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InstitutionCountAggregateOutputType | null;
    _min: InstitutionMinAggregateOutputType | null;
    _max: InstitutionMaxAggregateOutputType | null;
};
export type GetInstitutionGroupByPayload<T extends InstitutionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstitutionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstitutionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstitutionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstitutionGroupByOutputType[P]>;
}>>;
export type InstitutionWhereInput = {
    AND?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    OR?: Prisma.InstitutionWhereInput[];
    NOT?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    id?: Prisma.StringFilter<"Institution"> | string;
    userId?: Prisma.StringFilter<"Institution"> | string;
    name?: Prisma.StringFilter<"Institution"> | string;
    color?: Prisma.StringFilter<"Institution"> | string;
    icon?: Prisma.StringNullableFilter<"Institution"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Institution"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    accounts?: Prisma.AccountListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    transferDestinations?: Prisma.TransactionListRelationFilter;
};
export type InstitutionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    accounts?: Prisma.AccountOrderByRelationAggregateInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
    transferDestinations?: Prisma.TransactionOrderByRelationAggregateInput;
};
export type InstitutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    OR?: Prisma.InstitutionWhereInput[];
    NOT?: Prisma.InstitutionWhereInput | Prisma.InstitutionWhereInput[];
    userId?: Prisma.StringFilter<"Institution"> | string;
    name?: Prisma.StringFilter<"Institution"> | string;
    color?: Prisma.StringFilter<"Institution"> | string;
    icon?: Prisma.StringNullableFilter<"Institution"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Institution"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    accounts?: Prisma.AccountListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    transferDestinations?: Prisma.TransactionListRelationFilter;
}, "id">;
export type InstitutionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InstitutionCountOrderByAggregateInput;
    _max?: Prisma.InstitutionMaxOrderByAggregateInput;
    _min?: Prisma.InstitutionMinOrderByAggregateInput;
};
export type InstitutionScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstitutionScalarWhereWithAggregatesInput | Prisma.InstitutionScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstitutionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstitutionScalarWhereWithAggregatesInput | Prisma.InstitutionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    color?: Prisma.StringWithAggregatesFilter<"Institution"> | string;
    icon?: Prisma.StringNullableWithAggregatesFilter<"Institution"> | string | null;
    logoUrl?: Prisma.StringNullableWithAggregatesFilter<"Institution"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Institution"> | Date | string;
};
export type InstitutionCreateInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInstitutionsInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionUncheckedCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInstitutionsNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUncheckedUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InstitutionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionListRelationFilter = {
    every?: Prisma.InstitutionWhereInput;
    some?: Prisma.InstitutionWhereInput;
    none?: Prisma.InstitutionWhereInput;
};
export type InstitutionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstitutionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InstitutionScalarRelationFilter = {
    is?: Prisma.InstitutionWhereInput;
    isNot?: Prisma.InstitutionWhereInput;
};
export type InstitutionNullableScalarRelationFilter = {
    is?: Prisma.InstitutionWhereInput | null;
    isNot?: Prisma.InstitutionWhereInput | null;
};
export type InstitutionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput> | Prisma.InstitutionCreateWithoutUserInput[] | Prisma.InstitutionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUserInput | Prisma.InstitutionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
};
export type InstitutionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput> | Prisma.InstitutionCreateWithoutUserInput[] | Prisma.InstitutionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUserInput | Prisma.InstitutionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
};
export type InstitutionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput> | Prisma.InstitutionCreateWithoutUserInput[] | Prisma.InstitutionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUserInput | Prisma.InstitutionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    disconnect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    delete?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    connect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    update?: Prisma.InstitutionUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionScalarWhereInput | Prisma.InstitutionScalarWhereInput[];
};
export type InstitutionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput> | Prisma.InstitutionCreateWithoutUserInput[] | Prisma.InstitutionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutUserInput | Prisma.InstitutionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    disconnect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    delete?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    connect?: Prisma.InstitutionWhereUniqueInput | Prisma.InstitutionWhereUniqueInput[];
    update?: Prisma.InstitutionUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionScalarWhereInput | Prisma.InstitutionScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type InstitutionCreateNestedOneWithoutAccountsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutAccountsInput, Prisma.InstitutionUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutAccountsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutAccountsInput, Prisma.InstitutionUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutAccountsInput;
    upsert?: Prisma.InstitutionUpsertWithoutAccountsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutAccountsInput, Prisma.InstitutionUpdateWithoutAccountsInput>, Prisma.InstitutionUncheckedUpdateWithoutAccountsInput>;
};
export type InstitutionCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutTransactionsInput, Prisma.InstitutionUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionCreateNestedOneWithoutTransferDestinationsInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedCreateWithoutTransferDestinationsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutTransferDestinationsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutTransactionsInput, Prisma.InstitutionUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.InstitutionUpsertWithoutTransactionsInput;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutTransactionsInput, Prisma.InstitutionUpdateWithoutTransactionsInput>, Prisma.InstitutionUncheckedUpdateWithoutTransactionsInput>;
};
export type InstitutionUpdateOneWithoutTransferDestinationsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionCreateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedCreateWithoutTransferDestinationsInput>;
    connectOrCreate?: Prisma.InstitutionCreateOrConnectWithoutTransferDestinationsInput;
    upsert?: Prisma.InstitutionUpsertWithoutTransferDestinationsInput;
    disconnect?: Prisma.InstitutionWhereInput | boolean;
    delete?: Prisma.InstitutionWhereInput | boolean;
    connect?: Prisma.InstitutionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionUpdateToOneWithWhereWithoutTransferDestinationsInput, Prisma.InstitutionUpdateWithoutTransferDestinationsInput>, Prisma.InstitutionUncheckedUpdateWithoutTransferDestinationsInput>;
};
export type InstitutionCreateWithoutUserInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: Prisma.AccountCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionUncheckedCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutUserInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput>;
};
export type InstitutionCreateManyUserInputEnvelope = {
    data: Prisma.InstitutionCreateManyUserInput | Prisma.InstitutionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type InstitutionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutUserInput, Prisma.InstitutionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutUserInput, Prisma.InstitutionUncheckedCreateWithoutUserInput>;
};
export type InstitutionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutUserInput, Prisma.InstitutionUncheckedUpdateWithoutUserInput>;
};
export type InstitutionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.InstitutionScalarWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateManyMutationInput, Prisma.InstitutionUncheckedUpdateManyWithoutUserInput>;
};
export type InstitutionScalarWhereInput = {
    AND?: Prisma.InstitutionScalarWhereInput | Prisma.InstitutionScalarWhereInput[];
    OR?: Prisma.InstitutionScalarWhereInput[];
    NOT?: Prisma.InstitutionScalarWhereInput | Prisma.InstitutionScalarWhereInput[];
    id?: Prisma.StringFilter<"Institution"> | string;
    userId?: Prisma.StringFilter<"Institution"> | string;
    name?: Prisma.StringFilter<"Institution"> | string;
    color?: Prisma.StringFilter<"Institution"> | string;
    icon?: Prisma.StringNullableFilter<"Institution"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Institution"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Institution"> | Date | string;
};
export type InstitutionCreateWithoutAccountsInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInstitutionsInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutAccountsInput = {
    id?: string;
    userId: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionUncheckedCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutAccountsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutAccountsInput, Prisma.InstitutionUncheckedCreateWithoutAccountsInput>;
};
export type InstitutionUpsertWithoutAccountsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutAccountsInput, Prisma.InstitutionUncheckedUpdateWithoutAccountsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutAccountsInput, Prisma.InstitutionUncheckedCreateWithoutAccountsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutAccountsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutAccountsInput, Prisma.InstitutionUncheckedUpdateWithoutAccountsInput>;
};
export type InstitutionUpdateWithoutAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInstitutionsNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUncheckedUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionCreateWithoutTransactionsInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInstitutionsInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    userId: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutInstitutionInput;
    transferDestinations?: Prisma.TransactionUncheckedCreateNestedManyWithoutDestinationInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutTransactionsInput, Prisma.InstitutionUncheckedCreateWithoutTransactionsInput>;
};
export type InstitutionCreateWithoutTransferDestinationsInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInstitutionsInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionUncheckedCreateWithoutTransferDestinationsInput = {
    id?: string;
    userId: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutInstitutionInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionCreateOrConnectWithoutTransferDestinationsInput = {
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedCreateWithoutTransferDestinationsInput>;
};
export type InstitutionUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutTransactionsInput, Prisma.InstitutionUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutTransactionsInput, Prisma.InstitutionUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutTransactionsInput, Prisma.InstitutionUncheckedUpdateWithoutTransactionsInput>;
};
export type InstitutionUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInstitutionsNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUncheckedUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUpsertWithoutTransferDestinationsInput = {
    update: Prisma.XOR<Prisma.InstitutionUpdateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedUpdateWithoutTransferDestinationsInput>;
    create: Prisma.XOR<Prisma.InstitutionCreateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedCreateWithoutTransferDestinationsInput>;
    where?: Prisma.InstitutionWhereInput;
};
export type InstitutionUpdateToOneWithWhereWithoutTransferDestinationsInput = {
    where?: Prisma.InstitutionWhereInput;
    data: Prisma.XOR<Prisma.InstitutionUpdateWithoutTransferDestinationsInput, Prisma.InstitutionUncheckedUpdateWithoutTransferDestinationsInput>;
};
export type InstitutionUpdateWithoutTransferDestinationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInstitutionsNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutTransferDestinationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionCreateManyUserInput = {
    id?: string;
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InstitutionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: Prisma.AccountUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutInstitutionNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutInstitutionNestedInput;
    transferDestinations?: Prisma.TransactionUncheckedUpdateManyWithoutDestinationInstitutionNestedInput;
};
export type InstitutionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionCountOutputType = {
    accounts: number;
    transactions: number;
    transferDestinations: number;
};
export type InstitutionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    accounts?: boolean | InstitutionCountOutputTypeCountAccountsArgs;
    transactions?: boolean | InstitutionCountOutputTypeCountTransactionsArgs;
    transferDestinations?: boolean | InstitutionCountOutputTypeCountTransferDestinationsArgs;
};
export type InstitutionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionCountOutputTypeSelect<ExtArgs> | null;
};
export type InstitutionCountOutputTypeCountAccountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
};
export type InstitutionCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type InstitutionCountOutputTypeCountTransferDestinationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type InstitutionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    color?: boolean;
    icon?: boolean;
    logoUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    accounts?: boolean | Prisma.Institution$accountsArgs<ExtArgs>;
    transactions?: boolean | Prisma.Institution$transactionsArgs<ExtArgs>;
    transferDestinations?: boolean | Prisma.Institution$transferDestinationsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    color?: boolean;
    icon?: boolean;
    logoUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    color?: boolean;
    icon?: boolean;
    logoUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institution"]>;
export type InstitutionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    color?: boolean;
    icon?: boolean;
    logoUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InstitutionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "color" | "icon" | "logoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["institution"]>;
export type InstitutionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    accounts?: boolean | Prisma.Institution$accountsArgs<ExtArgs>;
    transactions?: boolean | Prisma.Institution$transactionsArgs<ExtArgs>;
    transferDestinations?: boolean | Prisma.Institution$transferDestinationsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InstitutionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InstitutionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InstitutionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Institution";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        accounts: Prisma.$AccountPayload<ExtArgs>[];
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
        transferDestinations: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        color: string;
        icon: string | null;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["institution"]>;
    composites: {};
};
export type InstitutionGetPayload<S extends boolean | null | undefined | InstitutionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstitutionPayload, S>;
export type InstitutionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstitutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstitutionCountAggregateInputType | true;
};
export interface InstitutionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Institution'];
        meta: {
            name: 'Institution';
        };
    };
    findUnique<T extends InstitutionFindUniqueArgs>(args: Prisma.SelectSubset<T, InstitutionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstitutionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstitutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstitutionFindFirstArgs>(args?: Prisma.SelectSubset<T, InstitutionFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstitutionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstitutionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstitutionFindManyArgs>(args?: Prisma.SelectSubset<T, InstitutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstitutionCreateArgs>(args: Prisma.SelectSubset<T, InstitutionCreateArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstitutionCreateManyArgs>(args?: Prisma.SelectSubset<T, InstitutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstitutionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstitutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstitutionDeleteArgs>(args: Prisma.SelectSubset<T, InstitutionDeleteArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstitutionUpdateArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstitutionDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstitutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstitutionUpdateManyArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstitutionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstitutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstitutionUpsertArgs>(args: Prisma.SelectSubset<T, InstitutionUpsertArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstitutionCountArgs>(args?: Prisma.Subset<T, InstitutionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstitutionCountAggregateOutputType> : number>;
    aggregate<T extends InstitutionAggregateArgs>(args: Prisma.Subset<T, InstitutionAggregateArgs>): Prisma.PrismaPromise<GetInstitutionAggregateType<T>>;
    groupBy<T extends InstitutionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstitutionGroupByArgs['orderBy'];
    } : {
        orderBy?: InstitutionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstitutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstitutionFieldRefs;
}
export interface Prisma__InstitutionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    accounts<T extends Prisma.Institution$accountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.Institution$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transferDestinations<T extends Prisma.Institution$transferDestinationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Institution$transferDestinationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstitutionFieldRefs {
    readonly id: Prisma.FieldRef<"Institution", 'String'>;
    readonly userId: Prisma.FieldRef<"Institution", 'String'>;
    readonly name: Prisma.FieldRef<"Institution", 'String'>;
    readonly color: Prisma.FieldRef<"Institution", 'String'>;
    readonly icon: Prisma.FieldRef<"Institution", 'String'>;
    readonly logoUrl: Prisma.FieldRef<"Institution", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Institution", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Institution", 'DateTime'>;
}
export type InstitutionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where?: Prisma.InstitutionWhereInput;
    orderBy?: Prisma.InstitutionOrderByWithRelationInput | Prisma.InstitutionOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionScalarFieldEnum | Prisma.InstitutionScalarFieldEnum[];
};
export type InstitutionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionCreateInput, Prisma.InstitutionUncheckedCreateInput>;
};
export type InstitutionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstitutionCreateManyInput | Prisma.InstitutionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    data: Prisma.InstitutionCreateManyInput | Prisma.InstitutionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InstitutionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InstitutionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionUpdateInput, Prisma.InstitutionUncheckedUpdateInput>;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstitutionUpdateManyMutationInput, Prisma.InstitutionUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
};
export type InstitutionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionUpdateManyMutationInput, Prisma.InstitutionUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
    include?: Prisma.InstitutionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InstitutionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionCreateInput, Prisma.InstitutionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstitutionUpdateInput, Prisma.InstitutionUncheckedUpdateInput>;
};
export type InstitutionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
    where: Prisma.InstitutionWhereUniqueInput;
};
export type InstitutionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionWhereInput;
    limit?: number;
};
export type Institution$accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Institution$transferDestinationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionOmit<ExtArgs> | null;
    include?: Prisma.InstitutionInclude<ExtArgs> | null;
};
