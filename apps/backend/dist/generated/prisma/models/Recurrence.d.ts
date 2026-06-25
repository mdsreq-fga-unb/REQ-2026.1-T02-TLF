import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RecurrenceModel = runtime.Types.Result.DefaultSelection<Prisma.$RecurrencePayload>;
export type AggregateRecurrence = {
    _count: RecurrenceCountAggregateOutputType | null;
    _avg: RecurrenceAvgAggregateOutputType | null;
    _sum: RecurrenceSumAggregateOutputType | null;
    _min: RecurrenceMinAggregateOutputType | null;
    _max: RecurrenceMaxAggregateOutputType | null;
};
export type RecurrenceAvgAggregateOutputType = {
    amount: number | null;
    chargeDate: number | null;
};
export type RecurrenceSumAggregateOutputType = {
    amount: number | null;
    chargeDate: number | null;
};
export type RecurrenceMinAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    categoryId: string | null;
    subCategoryId: string | null;
    description: string | null;
    amount: number | null;
    isActive: boolean | null;
    chargeDate: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecurrenceMaxAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    categoryId: string | null;
    subCategoryId: string | null;
    description: string | null;
    amount: number | null;
    isActive: boolean | null;
    chargeDate: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecurrenceCountAggregateOutputType = {
    id: number;
    accountId: number;
    categoryId: number;
    subCategoryId: number;
    description: number;
    amount: number;
    isActive: number;
    chargeDate: number;
    startDate: number;
    endDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RecurrenceAvgAggregateInputType = {
    amount?: true;
    chargeDate?: true;
};
export type RecurrenceSumAggregateInputType = {
    amount?: true;
    chargeDate?: true;
};
export type RecurrenceMinAggregateInputType = {
    id?: true;
    accountId?: true;
    categoryId?: true;
    subCategoryId?: true;
    description?: true;
    amount?: true;
    isActive?: true;
    chargeDate?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecurrenceMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    categoryId?: true;
    subCategoryId?: true;
    description?: true;
    amount?: true;
    isActive?: true;
    chargeDate?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecurrenceCountAggregateInputType = {
    id?: true;
    accountId?: true;
    categoryId?: true;
    subCategoryId?: true;
    description?: true;
    amount?: true;
    isActive?: true;
    chargeDate?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RecurrenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
    orderBy?: Prisma.RecurrenceOrderByWithRelationInput | Prisma.RecurrenceOrderByWithRelationInput[];
    cursor?: Prisma.RecurrenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecurrenceCountAggregateInputType;
    _avg?: RecurrenceAvgAggregateInputType;
    _sum?: RecurrenceSumAggregateInputType;
    _min?: RecurrenceMinAggregateInputType;
    _max?: RecurrenceMaxAggregateInputType;
};
export type GetRecurrenceAggregateType<T extends RecurrenceAggregateArgs> = {
    [P in keyof T & keyof AggregateRecurrence]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecurrence[P]> : Prisma.GetScalarType<T[P], AggregateRecurrence[P]>;
};
export type RecurrenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
    orderBy?: Prisma.RecurrenceOrderByWithAggregationInput | Prisma.RecurrenceOrderByWithAggregationInput[];
    by: Prisma.RecurrenceScalarFieldEnum[] | Prisma.RecurrenceScalarFieldEnum;
    having?: Prisma.RecurrenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecurrenceCountAggregateInputType | true;
    _avg?: RecurrenceAvgAggregateInputType;
    _sum?: RecurrenceSumAggregateInputType;
    _min?: RecurrenceMinAggregateInputType;
    _max?: RecurrenceMaxAggregateInputType;
};
export type RecurrenceGroupByOutputType = {
    id: string;
    accountId: string;
    categoryId: string | null;
    subCategoryId: string | null;
    description: string;
    amount: number;
    isActive: boolean;
    chargeDate: number;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RecurrenceCountAggregateOutputType | null;
    _avg: RecurrenceAvgAggregateOutputType | null;
    _sum: RecurrenceSumAggregateOutputType | null;
    _min: RecurrenceMinAggregateOutputType | null;
    _max: RecurrenceMaxAggregateOutputType | null;
};
export type GetRecurrenceGroupByPayload<T extends RecurrenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecurrenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecurrenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecurrenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecurrenceGroupByOutputType[P]>;
}>>;
export type RecurrenceWhereInput = {
    AND?: Prisma.RecurrenceWhereInput | Prisma.RecurrenceWhereInput[];
    OR?: Prisma.RecurrenceWhereInput[];
    NOT?: Prisma.RecurrenceWhereInput | Prisma.RecurrenceWhereInput[];
    id?: Prisma.StringFilter<"Recurrence"> | string;
    accountId?: Prisma.StringFilter<"Recurrence"> | string;
    categoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    subCategoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    description?: Prisma.StringFilter<"Recurrence"> | string;
    amount?: Prisma.IntFilter<"Recurrence"> | number;
    isActive?: Prisma.BoolFilter<"Recurrence"> | boolean;
    chargeDate?: Prisma.IntFilter<"Recurrence"> | number;
    startDate?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"Recurrence"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    subCategory?: Prisma.XOR<Prisma.SubCategoryNullableScalarRelationFilter, Prisma.SubCategoryWhereInput> | null;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type RecurrenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    subCategoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    account?: Prisma.AccountOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    subCategory?: Prisma.SubCategoryOrderByWithRelationInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
};
export type RecurrenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RecurrenceWhereInput | Prisma.RecurrenceWhereInput[];
    OR?: Prisma.RecurrenceWhereInput[];
    NOT?: Prisma.RecurrenceWhereInput | Prisma.RecurrenceWhereInput[];
    accountId?: Prisma.StringFilter<"Recurrence"> | string;
    categoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    subCategoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    description?: Prisma.StringFilter<"Recurrence"> | string;
    amount?: Prisma.IntFilter<"Recurrence"> | number;
    isActive?: Prisma.BoolFilter<"Recurrence"> | boolean;
    chargeDate?: Prisma.IntFilter<"Recurrence"> | number;
    startDate?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"Recurrence"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    subCategory?: Prisma.XOR<Prisma.SubCategoryNullableScalarRelationFilter, Prisma.SubCategoryWhereInput> | null;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type RecurrenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    subCategoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RecurrenceCountOrderByAggregateInput;
    _avg?: Prisma.RecurrenceAvgOrderByAggregateInput;
    _max?: Prisma.RecurrenceMaxOrderByAggregateInput;
    _min?: Prisma.RecurrenceMinOrderByAggregateInput;
    _sum?: Prisma.RecurrenceSumOrderByAggregateInput;
};
export type RecurrenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecurrenceScalarWhereWithAggregatesInput | Prisma.RecurrenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecurrenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecurrenceScalarWhereWithAggregatesInput | Prisma.RecurrenceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Recurrence"> | string;
    accountId?: Prisma.StringWithAggregatesFilter<"Recurrence"> | string;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"Recurrence"> | string | null;
    subCategoryId?: Prisma.StringNullableWithAggregatesFilter<"Recurrence"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"Recurrence"> | string;
    amount?: Prisma.IntWithAggregatesFilter<"Recurrence"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"Recurrence"> | boolean;
    chargeDate?: Prisma.IntWithAggregatesFilter<"Recurrence"> | number;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"Recurrence"> | Date | string;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Recurrence"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Recurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Recurrence"> | Date | string;
};
export type RecurrenceCreateInput = {
    id?: string;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutRecurrencesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutRecurrencesInput;
    subCategory?: Prisma.SubCategoryCreateNestedOneWithoutRecurrencesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceUncheckedCreateInput = {
    id?: string;
    accountId: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutRecurrencesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutRecurrencesNestedInput;
    subCategory?: Prisma.SubCategoryUpdateOneWithoutRecurrencesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceCreateManyInput = {
    id?: string;
    accountId: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecurrenceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceListRelationFilter = {
    every?: Prisma.RecurrenceWhereInput;
    some?: Prisma.RecurrenceWhereInput;
    none?: Prisma.RecurrenceWhereInput;
};
export type RecurrenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecurrenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    subCategoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecurrenceAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
};
export type RecurrenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    subCategoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecurrenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    subCategoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecurrenceSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    chargeDate?: Prisma.SortOrder;
};
export type RecurrenceNullableScalarRelationFilter = {
    is?: Prisma.RecurrenceWhereInput | null;
    isNot?: Prisma.RecurrenceWhereInput | null;
};
export type RecurrenceCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput> | Prisma.RecurrenceCreateWithoutCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManyCategoryInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput> | Prisma.RecurrenceCreateWithoutCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManyCategoryInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput> | Prisma.RecurrenceCreateWithoutCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutCategoryInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManyCategoryInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutCategoryInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutCategoryInput | Prisma.RecurrenceUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput> | Prisma.RecurrenceCreateWithoutCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutCategoryInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManyCategoryInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutCategoryInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutCategoryInput | Prisma.RecurrenceUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type RecurrenceCreateNestedManyWithoutSubCategoryInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput> | Prisma.RecurrenceCreateWithoutSubCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManySubCategoryInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUncheckedCreateNestedManyWithoutSubCategoryInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput> | Prisma.RecurrenceCreateWithoutSubCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManySubCategoryInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUpdateManyWithoutSubCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput> | Prisma.RecurrenceCreateWithoutSubCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutSubCategoryInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutSubCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManySubCategoryInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutSubCategoryInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutSubCategoryInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutSubCategoryInput | Prisma.RecurrenceUpdateManyWithWhereWithoutSubCategoryInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type RecurrenceUncheckedUpdateManyWithoutSubCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput> | Prisma.RecurrenceCreateWithoutSubCategoryInput[] | Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput | Prisma.RecurrenceCreateOrConnectWithoutSubCategoryInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutSubCategoryInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutSubCategoryInput[];
    createMany?: Prisma.RecurrenceCreateManySubCategoryInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutSubCategoryInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutSubCategoryInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutSubCategoryInput | Prisma.RecurrenceUpdateManyWithWhereWithoutSubCategoryInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type RecurrenceCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput> | Prisma.RecurrenceCreateWithoutAccountInput[] | Prisma.RecurrenceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutAccountInput | Prisma.RecurrenceCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.RecurrenceCreateManyAccountInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput> | Prisma.RecurrenceCreateWithoutAccountInput[] | Prisma.RecurrenceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutAccountInput | Prisma.RecurrenceCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.RecurrenceCreateManyAccountInputEnvelope;
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
};
export type RecurrenceUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput> | Prisma.RecurrenceCreateWithoutAccountInput[] | Prisma.RecurrenceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutAccountInput | Prisma.RecurrenceCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutAccountInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.RecurrenceCreateManyAccountInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutAccountInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutAccountInput | Prisma.RecurrenceUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type RecurrenceUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput> | Prisma.RecurrenceCreateWithoutAccountInput[] | Prisma.RecurrenceUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutAccountInput | Prisma.RecurrenceCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.RecurrenceUpsertWithWhereUniqueWithoutAccountInput | Prisma.RecurrenceUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.RecurrenceCreateManyAccountInputEnvelope;
    set?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    disconnect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    delete?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    connect?: Prisma.RecurrenceWhereUniqueInput | Prisma.RecurrenceWhereUniqueInput[];
    update?: Prisma.RecurrenceUpdateWithWhereUniqueWithoutAccountInput | Prisma.RecurrenceUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.RecurrenceUpdateManyWithWhereWithoutAccountInput | Prisma.RecurrenceUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type RecurrenceCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutTransactionsInput, Prisma.RecurrenceUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.RecurrenceWhereUniqueInput;
};
export type RecurrenceUpdateOneWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.RecurrenceCreateWithoutTransactionsInput, Prisma.RecurrenceUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.RecurrenceCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.RecurrenceUpsertWithoutTransactionsInput;
    disconnect?: Prisma.RecurrenceWhereInput | boolean;
    delete?: Prisma.RecurrenceWhereInput | boolean;
    connect?: Prisma.RecurrenceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecurrenceUpdateToOneWithWhereWithoutTransactionsInput, Prisma.RecurrenceUpdateWithoutTransactionsInput>, Prisma.RecurrenceUncheckedUpdateWithoutTransactionsInput>;
};
export type RecurrenceCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutRecurrencesInput;
    subCategory?: Prisma.SubCategoryCreateNestedOneWithoutRecurrencesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceUncheckedCreateWithoutCategoryInput = {
    id?: string;
    accountId: string;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceCreateOrConnectWithoutCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput>;
};
export type RecurrenceCreateManyCategoryInputEnvelope = {
    data: Prisma.RecurrenceCreateManyCategoryInput | Prisma.RecurrenceCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type RecurrenceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecurrenceUpdateWithoutCategoryInput, Prisma.RecurrenceUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutCategoryInput>;
};
export type RecurrenceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateWithoutCategoryInput, Prisma.RecurrenceUncheckedUpdateWithoutCategoryInput>;
};
export type RecurrenceUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.RecurrenceScalarWhereInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateManyMutationInput, Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryInput>;
};
export type RecurrenceScalarWhereInput = {
    AND?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
    OR?: Prisma.RecurrenceScalarWhereInput[];
    NOT?: Prisma.RecurrenceScalarWhereInput | Prisma.RecurrenceScalarWhereInput[];
    id?: Prisma.StringFilter<"Recurrence"> | string;
    accountId?: Prisma.StringFilter<"Recurrence"> | string;
    categoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    subCategoryId?: Prisma.StringNullableFilter<"Recurrence"> | string | null;
    description?: Prisma.StringFilter<"Recurrence"> | string;
    amount?: Prisma.IntFilter<"Recurrence"> | number;
    isActive?: Prisma.BoolFilter<"Recurrence"> | boolean;
    chargeDate?: Prisma.IntFilter<"Recurrence"> | number;
    startDate?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"Recurrence"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Recurrence"> | Date | string;
};
export type RecurrenceCreateWithoutSubCategoryInput = {
    id?: string;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutRecurrencesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutRecurrencesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceUncheckedCreateWithoutSubCategoryInput = {
    id?: string;
    accountId: string;
    categoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceCreateOrConnectWithoutSubCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput>;
};
export type RecurrenceCreateManySubCategoryInputEnvelope = {
    data: Prisma.RecurrenceCreateManySubCategoryInput | Prisma.RecurrenceCreateManySubCategoryInput[];
    skipDuplicates?: boolean;
};
export type RecurrenceUpsertWithWhereUniqueWithoutSubCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecurrenceUpdateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedUpdateWithoutSubCategoryInput>;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedCreateWithoutSubCategoryInput>;
};
export type RecurrenceUpdateWithWhereUniqueWithoutSubCategoryInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateWithoutSubCategoryInput, Prisma.RecurrenceUncheckedUpdateWithoutSubCategoryInput>;
};
export type RecurrenceUpdateManyWithWhereWithoutSubCategoryInput = {
    where: Prisma.RecurrenceScalarWhereInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateManyMutationInput, Prisma.RecurrenceUncheckedUpdateManyWithoutSubCategoryInput>;
};
export type RecurrenceCreateWithoutAccountInput = {
    id?: string;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutRecurrencesInput;
    subCategory?: Prisma.SubCategoryCreateNestedOneWithoutRecurrencesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceUncheckedCreateWithoutAccountInput = {
    id?: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutRecurrenceInput;
};
export type RecurrenceCreateOrConnectWithoutAccountInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput>;
};
export type RecurrenceCreateManyAccountInputEnvelope = {
    data: Prisma.RecurrenceCreateManyAccountInput | Prisma.RecurrenceCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type RecurrenceUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecurrenceUpdateWithoutAccountInput, Prisma.RecurrenceUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutAccountInput, Prisma.RecurrenceUncheckedCreateWithoutAccountInput>;
};
export type RecurrenceUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateWithoutAccountInput, Prisma.RecurrenceUncheckedUpdateWithoutAccountInput>;
};
export type RecurrenceUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.RecurrenceScalarWhereInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateManyMutationInput, Prisma.RecurrenceUncheckedUpdateManyWithoutAccountInput>;
};
export type RecurrenceCreateWithoutTransactionsInput = {
    id?: string;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutRecurrencesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutRecurrencesInput;
    subCategory?: Prisma.SubCategoryCreateNestedOneWithoutRecurrencesInput;
};
export type RecurrenceUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    accountId: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecurrenceCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.RecurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutTransactionsInput, Prisma.RecurrenceUncheckedCreateWithoutTransactionsInput>;
};
export type RecurrenceUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.RecurrenceUpdateWithoutTransactionsInput, Prisma.RecurrenceUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.RecurrenceCreateWithoutTransactionsInput, Prisma.RecurrenceUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.RecurrenceWhereInput;
};
export type RecurrenceUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.RecurrenceWhereInput;
    data: Prisma.XOR<Prisma.RecurrenceUpdateWithoutTransactionsInput, Prisma.RecurrenceUncheckedUpdateWithoutTransactionsInput>;
};
export type RecurrenceUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutRecurrencesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutRecurrencesNestedInput;
    subCategory?: Prisma.SubCategoryUpdateOneWithoutRecurrencesNestedInput;
};
export type RecurrenceUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceCreateManyCategoryInput = {
    id?: string;
    accountId: string;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecurrenceUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutRecurrencesNestedInput;
    subCategory?: Prisma.SubCategoryUpdateOneWithoutRecurrencesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceCreateManySubCategoryInput = {
    id?: string;
    accountId: string;
    categoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecurrenceUpdateWithoutSubCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutRecurrencesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutRecurrencesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateWithoutSubCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateManyWithoutSubCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceCreateManyAccountInput = {
    id?: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecurrenceUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutRecurrencesNestedInput;
    subCategory?: Prisma.SubCategoryUpdateOneWithoutRecurrencesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutRecurrenceNestedInput;
};
export type RecurrenceUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subCategoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    chargeDate?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecurrenceCountOutputType = {
    transactions: number;
};
export type RecurrenceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | RecurrenceCountOutputTypeCountTransactionsArgs;
};
export type RecurrenceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceCountOutputTypeSelect<ExtArgs> | null;
};
export type RecurrenceCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type RecurrenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    categoryId?: boolean;
    subCategoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    isActive?: boolean;
    chargeDate?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
    transactions?: boolean | Prisma.Recurrence$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecurrenceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recurrence"]>;
export type RecurrenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    categoryId?: boolean;
    subCategoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    isActive?: boolean;
    chargeDate?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
}, ExtArgs["result"]["recurrence"]>;
export type RecurrenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    categoryId?: boolean;
    subCategoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    isActive?: boolean;
    chargeDate?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
}, ExtArgs["result"]["recurrence"]>;
export type RecurrenceSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    categoryId?: boolean;
    subCategoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    isActive?: boolean;
    chargeDate?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RecurrenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "categoryId" | "subCategoryId" | "description" | "amount" | "isActive" | "chargeDate" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["recurrence"]>;
export type RecurrenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
    transactions?: boolean | Prisma.Recurrence$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecurrenceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RecurrenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
};
export type RecurrenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.Recurrence$categoryArgs<ExtArgs>;
    subCategory?: boolean | Prisma.Recurrence$subCategoryArgs<ExtArgs>;
};
export type $RecurrencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Recurrence";
    objects: {
        account: Prisma.$AccountPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs> | null;
        subCategory: Prisma.$SubCategoryPayload<ExtArgs> | null;
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        accountId: string;
        categoryId: string | null;
        subCategoryId: string | null;
        description: string;
        amount: number;
        isActive: boolean;
        chargeDate: number;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["recurrence"]>;
    composites: {};
};
export type RecurrenceGetPayload<S extends boolean | null | undefined | RecurrenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecurrencePayload, S>;
export type RecurrenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecurrenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecurrenceCountAggregateInputType | true;
};
export interface RecurrenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Recurrence'];
        meta: {
            name: 'Recurrence';
        };
    };
    findUnique<T extends RecurrenceFindUniqueArgs>(args: Prisma.SelectSubset<T, RecurrenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecurrenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecurrenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecurrenceFindFirstArgs>(args?: Prisma.SelectSubset<T, RecurrenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecurrenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecurrenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecurrenceFindManyArgs>(args?: Prisma.SelectSubset<T, RecurrenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecurrenceCreateArgs>(args: Prisma.SelectSubset<T, RecurrenceCreateArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecurrenceCreateManyArgs>(args?: Prisma.SelectSubset<T, RecurrenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecurrenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecurrenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecurrenceDeleteArgs>(args: Prisma.SelectSubset<T, RecurrenceDeleteArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecurrenceUpdateArgs>(args: Prisma.SelectSubset<T, RecurrenceUpdateArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecurrenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecurrenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecurrenceUpdateManyArgs>(args: Prisma.SelectSubset<T, RecurrenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecurrenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecurrenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecurrenceUpsertArgs>(args: Prisma.SelectSubset<T, RecurrenceUpsertArgs<ExtArgs>>): Prisma.Prisma__RecurrenceClient<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecurrenceCountArgs>(args?: Prisma.Subset<T, RecurrenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecurrenceCountAggregateOutputType> : number>;
    aggregate<T extends RecurrenceAggregateArgs>(args: Prisma.Subset<T, RecurrenceAggregateArgs>): Prisma.PrismaPromise<GetRecurrenceAggregateType<T>>;
    groupBy<T extends RecurrenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecurrenceGroupByArgs['orderBy'];
    } : {
        orderBy?: RecurrenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecurrenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecurrenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecurrenceFieldRefs;
}
export interface Prisma__RecurrenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.Recurrence$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Recurrence$categoryArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    subCategory<T extends Prisma.Recurrence$subCategoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Recurrence$subCategoryArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Recurrence$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Recurrence$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecurrenceFieldRefs {
    readonly id: Prisma.FieldRef<"Recurrence", 'String'>;
    readonly accountId: Prisma.FieldRef<"Recurrence", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Recurrence", 'String'>;
    readonly subCategoryId: Prisma.FieldRef<"Recurrence", 'String'>;
    readonly description: Prisma.FieldRef<"Recurrence", 'String'>;
    readonly amount: Prisma.FieldRef<"Recurrence", 'Int'>;
    readonly isActive: Prisma.FieldRef<"Recurrence", 'Boolean'>;
    readonly chargeDate: Prisma.FieldRef<"Recurrence", 'Int'>;
    readonly startDate: Prisma.FieldRef<"Recurrence", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"Recurrence", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Recurrence", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Recurrence", 'DateTime'>;
}
export type RecurrenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    where: Prisma.RecurrenceWhereUniqueInput;
};
export type RecurrenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    where: Prisma.RecurrenceWhereUniqueInput;
};
export type RecurrenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecurrenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecurrenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecurrenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecurrenceCreateInput, Prisma.RecurrenceUncheckedCreateInput>;
};
export type RecurrenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecurrenceCreateManyInput | Prisma.RecurrenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecurrenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    data: Prisma.RecurrenceCreateManyInput | Prisma.RecurrenceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecurrenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecurrenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecurrenceUpdateInput, Prisma.RecurrenceUncheckedUpdateInput>;
    where: Prisma.RecurrenceWhereUniqueInput;
};
export type RecurrenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecurrenceUpdateManyMutationInput, Prisma.RecurrenceUncheckedUpdateManyInput>;
    where?: Prisma.RecurrenceWhereInput;
    limit?: number;
};
export type RecurrenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecurrenceUpdateManyMutationInput, Prisma.RecurrenceUncheckedUpdateManyInput>;
    where?: Prisma.RecurrenceWhereInput;
    limit?: number;
    include?: Prisma.RecurrenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecurrenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    where: Prisma.RecurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecurrenceCreateInput, Prisma.RecurrenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecurrenceUpdateInput, Prisma.RecurrenceUncheckedUpdateInput>;
};
export type RecurrenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
    where: Prisma.RecurrenceWhereUniqueInput;
};
export type RecurrenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
    limit?: number;
};
export type Recurrence$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type Recurrence$subCategoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where?: Prisma.SubCategoryWhereInput;
};
export type Recurrence$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecurrenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecurrenceSelect<ExtArgs> | null;
    omit?: Prisma.RecurrenceOmit<ExtArgs> | null;
    include?: Prisma.RecurrenceInclude<ExtArgs> | null;
};
