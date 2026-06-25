import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SubCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$SubCategoryPayload>;
export type AggregateSubCategory = {
    _count: SubCategoryCountAggregateOutputType | null;
    _min: SubCategoryMinAggregateOutputType | null;
    _max: SubCategoryMaxAggregateOutputType | null;
};
export type SubCategoryMinAggregateOutputType = {
    id: string | null;
    categoryId: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubCategoryMaxAggregateOutputType = {
    id: string | null;
    categoryId: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubCategoryCountAggregateOutputType = {
    id: number;
    categoryId: number;
    name: number;
    icon: number;
    color: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SubCategoryMinAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubCategoryMaxAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubCategoryCountAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SubCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationInput | Prisma.SubCategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubCategoryCountAggregateInputType;
    _min?: SubCategoryMinAggregateInputType;
    _max?: SubCategoryMaxAggregateInputType;
};
export type GetSubCategoryAggregateType<T extends SubCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateSubCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubCategory[P]> : Prisma.GetScalarType<T[P], AggregateSubCategory[P]>;
};
export type SubCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithAggregationInput | Prisma.SubCategoryOrderByWithAggregationInput[];
    by: Prisma.SubCategoryScalarFieldEnum[] | Prisma.SubCategoryScalarFieldEnum;
    having?: Prisma.SubCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubCategoryCountAggregateInputType | true;
    _min?: SubCategoryMinAggregateInputType;
    _max?: SubCategoryMaxAggregateInputType;
};
export type SubCategoryGroupByOutputType = {
    id: string;
    categoryId: string;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SubCategoryCountAggregateOutputType | null;
    _min: SubCategoryMinAggregateOutputType | null;
    _max: SubCategoryMaxAggregateOutputType | null;
};
export type GetSubCategoryGroupByPayload<T extends SubCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubCategoryGroupByOutputType[P]>;
}>>;
export type SubCategoryWhereInput = {
    AND?: Prisma.SubCategoryWhereInput | Prisma.SubCategoryWhereInput[];
    OR?: Prisma.SubCategoryWhereInput[];
    NOT?: Prisma.SubCategoryWhereInput | Prisma.SubCategoryWhereInput[];
    id?: Prisma.StringFilter<"SubCategory"> | string;
    categoryId?: Prisma.StringFilter<"SubCategory"> | string;
    name?: Prisma.StringFilter<"SubCategory"> | string;
    icon?: Prisma.StringFilter<"SubCategory"> | string;
    color?: Prisma.StringFilter<"SubCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    recurrences?: Prisma.RecurrenceListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type SubCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    recurrences?: Prisma.RecurrenceOrderByRelationAggregateInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
};
export type SubCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SubCategoryWhereInput | Prisma.SubCategoryWhereInput[];
    OR?: Prisma.SubCategoryWhereInput[];
    NOT?: Prisma.SubCategoryWhereInput | Prisma.SubCategoryWhereInput[];
    categoryId?: Prisma.StringFilter<"SubCategory"> | string;
    name?: Prisma.StringFilter<"SubCategory"> | string;
    icon?: Prisma.StringFilter<"SubCategory"> | string;
    color?: Prisma.StringFilter<"SubCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    recurrences?: Prisma.RecurrenceListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type SubCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SubCategoryCountOrderByAggregateInput;
    _max?: Prisma.SubCategoryMaxOrderByAggregateInput;
    _min?: Prisma.SubCategoryMinOrderByAggregateInput;
};
export type SubCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubCategoryScalarWhereWithAggregatesInput | Prisma.SubCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubCategoryScalarWhereWithAggregatesInput | Prisma.SubCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SubCategory"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"SubCategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"SubCategory"> | string;
    icon?: Prisma.StringWithAggregatesFilter<"SubCategory"> | string;
    color?: Prisma.StringWithAggregatesFilter<"SubCategory"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SubCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SubCategory"> | Date | string;
};
export type SubCategoryCreateInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubCategoriesInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutSubCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryUncheckedCreateInput = {
    id?: string;
    categoryId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutSubCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubCategoriesNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutSubCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutSubCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryCreateManyInput = {
    id?: string;
    categoryId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubCategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubCategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubCategoryListRelationFilter = {
    every?: Prisma.SubCategoryWhereInput;
    some?: Prisma.SubCategoryWhereInput;
    none?: Prisma.SubCategoryWhereInput;
};
export type SubCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubCategoryNullableScalarRelationFilter = {
    is?: Prisma.SubCategoryWhereInput | null;
    isNot?: Prisma.SubCategoryWhereInput | null;
};
export type SubCategoryCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubCategoryCreateWithoutCategoryInput[] | Prisma.SubCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutCategoryInput | Prisma.SubCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SubCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
};
export type SubCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubCategoryCreateWithoutCategoryInput[] | Prisma.SubCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutCategoryInput | Prisma.SubCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SubCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
};
export type SubCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubCategoryCreateWithoutCategoryInput[] | Prisma.SubCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutCategoryInput | Prisma.SubCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SubCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SubCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SubCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    disconnect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    delete?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    connect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    update?: Prisma.SubCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SubCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SubCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.SubCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SubCategoryScalarWhereInput | Prisma.SubCategoryScalarWhereInput[];
};
export type SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubCategoryCreateWithoutCategoryInput[] | Prisma.SubCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutCategoryInput | Prisma.SubCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SubCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SubCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SubCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    disconnect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    delete?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    connect?: Prisma.SubCategoryWhereUniqueInput | Prisma.SubCategoryWhereUniqueInput[];
    update?: Prisma.SubCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SubCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SubCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.SubCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SubCategoryScalarWhereInput | Prisma.SubCategoryScalarWhereInput[];
};
export type SubCategoryCreateNestedOneWithoutRecurrencesInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutRecurrencesInput;
    connect?: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryUpdateOneWithoutRecurrencesNestedInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutRecurrencesInput;
    upsert?: Prisma.SubCategoryUpsertWithoutRecurrencesInput;
    disconnect?: Prisma.SubCategoryWhereInput | boolean;
    delete?: Prisma.SubCategoryWhereInput | boolean;
    connect?: Prisma.SubCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubCategoryUpdateToOneWithWhereWithoutRecurrencesInput, Prisma.SubCategoryUpdateWithoutRecurrencesInput>, Prisma.SubCategoryUncheckedUpdateWithoutRecurrencesInput>;
};
export type SubCategoryCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutTransactionsInput, Prisma.SubCategoryUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryUpdateOneWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.SubCategoryCreateWithoutTransactionsInput, Prisma.SubCategoryUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.SubCategoryCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.SubCategoryUpsertWithoutTransactionsInput;
    disconnect?: Prisma.SubCategoryWhereInput | boolean;
    delete?: Prisma.SubCategoryWhereInput | boolean;
    connect?: Prisma.SubCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubCategoryUpdateToOneWithWhereWithoutTransactionsInput, Prisma.SubCategoryUpdateWithoutTransactionsInput>, Prisma.SubCategoryUncheckedUpdateWithoutTransactionsInput>;
};
export type SubCategoryCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutSubCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutSubCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryCreateOrConnectWithoutCategoryInput = {
    where: Prisma.SubCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput>;
};
export type SubCategoryCreateManyCategoryInputEnvelope = {
    data: Prisma.SubCategoryCreateManyCategoryInput | Prisma.SubCategoryCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type SubCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SubCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubCategoryUpdateWithoutCategoryInput, Prisma.SubCategoryUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutCategoryInput, Prisma.SubCategoryUncheckedCreateWithoutCategoryInput>;
};
export type SubCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SubCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubCategoryUpdateWithoutCategoryInput, Prisma.SubCategoryUncheckedUpdateWithoutCategoryInput>;
};
export type SubCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.SubCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.SubCategoryUpdateManyMutationInput, Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryInput>;
};
export type SubCategoryScalarWhereInput = {
    AND?: Prisma.SubCategoryScalarWhereInput | Prisma.SubCategoryScalarWhereInput[];
    OR?: Prisma.SubCategoryScalarWhereInput[];
    NOT?: Prisma.SubCategoryScalarWhereInput | Prisma.SubCategoryScalarWhereInput[];
    id?: Prisma.StringFilter<"SubCategory"> | string;
    categoryId?: Prisma.StringFilter<"SubCategory"> | string;
    name?: Prisma.StringFilter<"SubCategory"> | string;
    icon?: Prisma.StringFilter<"SubCategory"> | string;
    color?: Prisma.StringFilter<"SubCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SubCategory"> | Date | string;
};
export type SubCategoryCreateWithoutRecurrencesInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubCategoriesInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryUncheckedCreateWithoutRecurrencesInput = {
    id?: string;
    categoryId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryCreateOrConnectWithoutRecurrencesInput = {
    where: Prisma.SubCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedCreateWithoutRecurrencesInput>;
};
export type SubCategoryUpsertWithoutRecurrencesInput = {
    update: Prisma.XOR<Prisma.SubCategoryUpdateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedUpdateWithoutRecurrencesInput>;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedCreateWithoutRecurrencesInput>;
    where?: Prisma.SubCategoryWhereInput;
};
export type SubCategoryUpdateToOneWithWhereWithoutRecurrencesInput = {
    where?: Prisma.SubCategoryWhereInput;
    data: Prisma.XOR<Prisma.SubCategoryUpdateWithoutRecurrencesInput, Prisma.SubCategoryUncheckedUpdateWithoutRecurrencesInput>;
};
export type SubCategoryUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubCategoriesNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryUncheckedUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryCreateWithoutTransactionsInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubCategoriesInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    categoryId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutSubCategoryInput;
};
export type SubCategoryCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.SubCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutTransactionsInput, Prisma.SubCategoryUncheckedCreateWithoutTransactionsInput>;
};
export type SubCategoryUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.SubCategoryUpdateWithoutTransactionsInput, Prisma.SubCategoryUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.SubCategoryCreateWithoutTransactionsInput, Prisma.SubCategoryUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.SubCategoryWhereInput;
};
export type SubCategoryUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.SubCategoryWhereInput;
    data: Prisma.XOR<Prisma.SubCategoryUpdateWithoutTransactionsInput, Prisma.SubCategoryUncheckedUpdateWithoutTransactionsInput>;
};
export type SubCategoryUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubCategoriesNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryCreateManyCategoryInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubCategoryUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutSubCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutSubCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutSubCategoryNestedInput;
};
export type SubCategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubCategoryCountOutputType = {
    recurrences: number;
    transactions: number;
};
export type SubCategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recurrences?: boolean | SubCategoryCountOutputTypeCountRecurrencesArgs;
    transactions?: boolean | SubCategoryCountOutputTypeCountTransactionsArgs;
};
export type SubCategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type SubCategoryCountOutputTypeCountRecurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
};
export type SubCategoryCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type SubCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    recurrences?: boolean | Prisma.SubCategory$recurrencesArgs<ExtArgs>;
    transactions?: boolean | Prisma.SubCategory$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubCategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subCategory"]>;
export type SubCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subCategory"]>;
export type SubCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subCategory"]>;
export type SubCategorySelectScalar = {
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SubCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "categoryId" | "name" | "icon" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["subCategory"]>;
export type SubCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    recurrences?: boolean | Prisma.SubCategory$recurrencesArgs<ExtArgs>;
    transactions?: boolean | Prisma.SubCategory$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubCategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type SubCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $SubCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SubCategory";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        recurrences: Prisma.$RecurrencePayload<ExtArgs>[];
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        categoryId: string;
        name: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["subCategory"]>;
    composites: {};
};
export type SubCategoryGetPayload<S extends boolean | null | undefined | SubCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload, S>;
export type SubCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubCategoryCountAggregateInputType | true;
};
export interface SubCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SubCategory'];
        meta: {
            name: 'SubCategory';
        };
    };
    findUnique<T extends SubCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, SubCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SubCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SubCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, SubCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SubCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SubCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, SubCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SubCategoryCreateArgs>(args: Prisma.SelectSubset<T, SubCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SubCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, SubCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SubCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SubCategoryDeleteArgs>(args: Prisma.SelectSubset<T, SubCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SubCategoryUpdateArgs>(args: Prisma.SelectSubset<T, SubCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SubCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SubCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, SubCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SubCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SubCategoryUpsertArgs>(args: Prisma.SelectSubset<T, SubCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__SubCategoryClient<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SubCategoryCountArgs>(args?: Prisma.Subset<T, SubCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubCategoryCountAggregateOutputType> : number>;
    aggregate<T extends SubCategoryAggregateArgs>(args: Prisma.Subset<T, SubCategoryAggregateArgs>): Prisma.PrismaPromise<GetSubCategoryAggregateType<T>>;
    groupBy<T extends SubCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: SubCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SubCategoryFieldRefs;
}
export interface Prisma__SubCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    recurrences<T extends Prisma.SubCategory$recurrencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubCategory$recurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.SubCategory$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubCategory$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SubCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"SubCategory", 'String'>;
    readonly categoryId: Prisma.FieldRef<"SubCategory", 'String'>;
    readonly name: Prisma.FieldRef<"SubCategory", 'String'>;
    readonly icon: Prisma.FieldRef<"SubCategory", 'String'>;
    readonly color: Prisma.FieldRef<"SubCategory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SubCategory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SubCategory", 'DateTime'>;
}
export type SubCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationInput | Prisma.SubCategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubCategoryScalarFieldEnum | Prisma.SubCategoryScalarFieldEnum[];
};
export type SubCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationInput | Prisma.SubCategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubCategoryScalarFieldEnum | Prisma.SubCategoryScalarFieldEnum[];
};
export type SubCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationInput | Prisma.SubCategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubCategoryScalarFieldEnum | Prisma.SubCategoryScalarFieldEnum[];
};
export type SubCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubCategoryCreateInput, Prisma.SubCategoryUncheckedCreateInput>;
};
export type SubCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SubCategoryCreateManyInput | Prisma.SubCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    data: Prisma.SubCategoryCreateManyInput | Prisma.SubCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SubCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SubCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubCategoryUpdateInput, Prisma.SubCategoryUncheckedUpdateInput>;
    where: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SubCategoryUpdateManyMutationInput, Prisma.SubCategoryUncheckedUpdateManyInput>;
    where?: Prisma.SubCategoryWhereInput;
    limit?: number;
};
export type SubCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubCategoryUpdateManyMutationInput, Prisma.SubCategoryUncheckedUpdateManyInput>;
    where?: Prisma.SubCategoryWhereInput;
    limit?: number;
    include?: Prisma.SubCategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SubCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where: Prisma.SubCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubCategoryCreateInput, Prisma.SubCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SubCategoryUpdateInput, Prisma.SubCategoryUncheckedUpdateInput>;
};
export type SubCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
    where: Prisma.SubCategoryWhereUniqueInput;
};
export type SubCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubCategoryWhereInput;
    limit?: number;
};
export type SubCategory$recurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SubCategory$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SubCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubCategorySelect<ExtArgs> | null;
    omit?: Prisma.SubCategoryOmit<ExtArgs> | null;
    include?: Prisma.SubCategoryInclude<ExtArgs> | null;
};
