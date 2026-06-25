import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryPayload>;
export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type CategoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    icon: string | null;
    color: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    icon: number;
    color: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CategoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CategoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CategoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    icon?: true;
    color?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CategoryCountAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategory[P]> : Prisma.GetScalarType<T[P], AggregateCategory[P]>;
};
export type CategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithAggregationInput | Prisma.CategoryOrderByWithAggregationInput[];
    by: Prisma.CategoryScalarFieldEnum[] | Prisma.CategoryScalarFieldEnum;
    having?: Prisma.CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type CategoryGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]>;
}>>;
export type CategoryWhereInput = {
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    id?: Prisma.StringFilter<"Category"> | string;
    userId?: Prisma.StringFilter<"Category"> | string;
    name?: Prisma.StringFilter<"Category"> | string;
    icon?: Prisma.StringFilter<"Category"> | string;
    color?: Prisma.StringFilter<"Category"> | string;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    budgets?: Prisma.BudgetListRelationFilter;
    recurrences?: Prisma.RecurrenceListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    subCategories?: Prisma.SubCategoryListRelationFilter;
};
export type CategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    budgets?: Prisma.BudgetOrderByRelationAggregateInput;
    recurrences?: Prisma.RecurrenceOrderByRelationAggregateInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
    subCategories?: Prisma.SubCategoryOrderByRelationAggregateInput;
};
export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_name?: Prisma.CategoryUserIdNameCompoundUniqueInput;
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    userId?: Prisma.StringFilter<"Category"> | string;
    name?: Prisma.StringFilter<"Category"> | string;
    icon?: Prisma.StringFilter<"Category"> | string;
    color?: Prisma.StringFilter<"Category"> | string;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    budgets?: Prisma.BudgetListRelationFilter;
    recurrences?: Prisma.RecurrenceListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    subCategories?: Prisma.SubCategoryListRelationFilter;
}, "id" | "userId_name">;
export type CategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CategoryCountOrderByAggregateInput;
    _max?: Prisma.CategoryMaxOrderByAggregateInput;
    _min?: Prisma.CategoryMinOrderByAggregateInput;
};
export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.CategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    icon?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    color?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Category"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Category"> | Date | string;
};
export type CategoryCreateInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCategoriesInput;
    budgets?: Prisma.BudgetCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetUncheckedCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput;
    budgets?: Prisma.BudgetUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUncheckedUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryListRelationFilter = {
    every?: Prisma.CategoryWhereInput;
    some?: Prisma.CategoryWhereInput;
    none?: Prisma.CategoryWhereInput;
};
export type CategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CategoryUserIdNameCompoundUniqueInput = {
    userId: string;
    name: string;
};
export type CategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput;
    isNot?: Prisma.CategoryWhereInput;
};
export type CategoryNullableScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput | null;
    isNot?: Prisma.CategoryWhereInput | null;
};
export type CategoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput> | Prisma.CategoryCreateWithoutUserInput[] | Prisma.CategoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutUserInput | Prisma.CategoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CategoryCreateManyUserInputEnvelope;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput> | Prisma.CategoryCreateWithoutUserInput[] | Prisma.CategoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutUserInput | Prisma.CategoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CategoryCreateManyUserInputEnvelope;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput> | Prisma.CategoryCreateWithoutUserInput[] | Prisma.CategoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutUserInput | Prisma.CategoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput | Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CategoryCreateManyUserInputEnvelope;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput | Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutUserInput | Prisma.CategoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput> | Prisma.CategoryCreateWithoutUserInput[] | Prisma.CategoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutUserInput | Prisma.CategoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput | Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CategoryCreateManyUserInputEnvelope;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput | Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutUserInput | Prisma.CategoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryCreateNestedOneWithoutSubCategoriesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutSubCategoriesInput, Prisma.CategoryUncheckedCreateWithoutSubCategoriesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutSubCategoriesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutSubCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutSubCategoriesInput, Prisma.CategoryUncheckedCreateWithoutSubCategoriesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutSubCategoriesInput;
    upsert?: Prisma.CategoryUpsertWithoutSubCategoriesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutSubCategoriesInput, Prisma.CategoryUpdateWithoutSubCategoriesInput>, Prisma.CategoryUncheckedUpdateWithoutSubCategoriesInput>;
};
export type CategoryCreateNestedOneWithoutBudgetsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBudgetsInput, Prisma.CategoryUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBudgetsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBudgetsInput, Prisma.CategoryUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBudgetsInput;
    upsert?: Prisma.CategoryUpsertWithoutBudgetsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutBudgetsInput, Prisma.CategoryUpdateWithoutBudgetsInput>, Prisma.CategoryUncheckedUpdateWithoutBudgetsInput>;
};
export type CategoryCreateNestedOneWithoutRecurrencesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutRecurrencesInput, Prisma.CategoryUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutRecurrencesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneWithoutRecurrencesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutRecurrencesInput, Prisma.CategoryUncheckedCreateWithoutRecurrencesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutRecurrencesInput;
    upsert?: Prisma.CategoryUpsertWithoutRecurrencesInput;
    disconnect?: Prisma.CategoryWhereInput | boolean;
    delete?: Prisma.CategoryWhereInput | boolean;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutRecurrencesInput, Prisma.CategoryUpdateWithoutRecurrencesInput>, Prisma.CategoryUncheckedUpdateWithoutRecurrencesInput>;
};
export type CategoryCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutTransactionsInput, Prisma.CategoryUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutTransactionsInput, Prisma.CategoryUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.CategoryUpsertWithoutTransactionsInput;
    disconnect?: Prisma.CategoryWhereInput | boolean;
    delete?: Prisma.CategoryWhereInput | boolean;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutTransactionsInput, Prisma.CategoryUpdateWithoutTransactionsInput>, Prisma.CategoryUncheckedUpdateWithoutTransactionsInput>;
};
export type CategoryCreateWithoutUserInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetUncheckedCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutUserInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput>;
};
export type CategoryCreateManyUserInputEnvelope = {
    data: Prisma.CategoryCreateManyUserInput | Prisma.CategoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutUserInput, Prisma.CategoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutUserInput, Prisma.CategoryUncheckedUpdateWithoutUserInput>;
};
export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutUserInput>;
};
export type CategoryScalarWhereInput = {
    AND?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
    OR?: Prisma.CategoryScalarWhereInput[];
    NOT?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
    id?: Prisma.StringFilter<"Category"> | string;
    userId?: Prisma.StringFilter<"Category"> | string;
    name?: Prisma.StringFilter<"Category"> | string;
    icon?: Prisma.StringFilter<"Category"> | string;
    color?: Prisma.StringFilter<"Category"> | string;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
};
export type CategoryCreateWithoutSubCategoriesInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCategoriesInput;
    budgets?: Prisma.BudgetCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutSubCategoriesInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetUncheckedCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutSubCategoriesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutSubCategoriesInput, Prisma.CategoryUncheckedCreateWithoutSubCategoriesInput>;
};
export type CategoryUpsertWithoutSubCategoriesInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutSubCategoriesInput, Prisma.CategoryUncheckedUpdateWithoutSubCategoriesInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutSubCategoriesInput, Prisma.CategoryUncheckedCreateWithoutSubCategoriesInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutSubCategoriesInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutSubCategoriesInput, Prisma.CategoryUncheckedUpdateWithoutSubCategoriesInput>;
};
export type CategoryUpdateWithoutSubCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput;
    budgets?: Prisma.BudgetUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutSubCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUncheckedUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutBudgetsInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCategoriesInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutBudgetsInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutBudgetsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutBudgetsInput, Prisma.CategoryUncheckedCreateWithoutBudgetsInput>;
};
export type CategoryUpsertWithoutBudgetsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutBudgetsInput, Prisma.CategoryUncheckedUpdateWithoutBudgetsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutBudgetsInput, Prisma.CategoryUncheckedCreateWithoutBudgetsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutBudgetsInput, Prisma.CategoryUncheckedUpdateWithoutBudgetsInput>;
};
export type CategoryUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutRecurrencesInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCategoriesInput;
    budgets?: Prisma.BudgetCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutRecurrencesInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetUncheckedCreateNestedManyWithoutCategoryInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutRecurrencesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutRecurrencesInput, Prisma.CategoryUncheckedCreateWithoutRecurrencesInput>;
};
export type CategoryUpsertWithoutRecurrencesInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutRecurrencesInput, Prisma.CategoryUncheckedUpdateWithoutRecurrencesInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutRecurrencesInput, Prisma.CategoryUncheckedCreateWithoutRecurrencesInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutRecurrencesInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutRecurrencesInput, Prisma.CategoryUncheckedUpdateWithoutRecurrencesInput>;
};
export type CategoryUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput;
    budgets?: Prisma.BudgetUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutRecurrencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUncheckedUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutTransactionsInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCategoriesInput;
    budgets?: Prisma.BudgetCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    userId: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.BudgetUncheckedCreateNestedManyWithoutCategoryInput;
    recurrences?: Prisma.RecurrenceUncheckedCreateNestedManyWithoutCategoryInput;
    subCategories?: Prisma.SubCategoryUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutTransactionsInput, Prisma.CategoryUncheckedCreateWithoutTransactionsInput>;
};
export type CategoryUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutTransactionsInput, Prisma.CategoryUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutTransactionsInput, Prisma.CategoryUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutTransactionsInput, Prisma.CategoryUncheckedUpdateWithoutTransactionsInput>;
};
export type CategoryUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput;
    budgets?: Prisma.BudgetUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUncheckedUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateManyUserInput = {
    id?: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CategoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.BudgetUncheckedUpdateManyWithoutCategoryNestedInput;
    recurrences?: Prisma.RecurrenceUncheckedUpdateManyWithoutCategoryNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput;
    subCategories?: Prisma.SubCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryCountOutputType = {
    budgets: number;
    recurrences: number;
    transactions: number;
    subCategories: number;
};
export type CategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budgets?: boolean | CategoryCountOutputTypeCountBudgetsArgs;
    recurrences?: boolean | CategoryCountOutputTypeCountRecurrencesArgs;
    transactions?: boolean | CategoryCountOutputTypeCountTransactionsArgs;
    subCategories?: boolean | CategoryCountOutputTypeCountSubCategoriesArgs;
};
export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type CategoryCountOutputTypeCountBudgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetWhereInput;
};
export type CategoryCountOutputTypeCountRecurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecurrenceWhereInput;
};
export type CategoryCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type CategoryCountOutputTypeCountSubCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubCategoryWhereInput;
};
export type CategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    budgets?: boolean | Prisma.Category$budgetsArgs<ExtArgs>;
    recurrences?: boolean | Prisma.Category$recurrencesArgs<ExtArgs>;
    transactions?: boolean | Prisma.Category$transactionsArgs<ExtArgs>;
    subCategories?: boolean | Prisma.Category$subCategoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    icon?: boolean;
    color?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "icon" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>;
export type CategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    budgets?: boolean | Prisma.Category$budgetsArgs<ExtArgs>;
    recurrences?: boolean | Prisma.Category$recurrencesArgs<ExtArgs>;
    transactions?: boolean | Prisma.Category$transactionsArgs<ExtArgs>;
    subCategories?: boolean | Prisma.Category$subCategoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Category";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        budgets: Prisma.$BudgetPayload<ExtArgs>[];
        recurrences: Prisma.$RecurrencePayload<ExtArgs>[];
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
        subCategories: Prisma.$SubCategoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["category"]>;
    composites: {};
};
export type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryPayload, S>;
export type CategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryCountAggregateInputType | true;
};
export interface CategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Category'];
        meta: {
            name: 'Category';
        };
    };
    findUnique<T extends CategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CategoryFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CategoryCreateArgs>(args: Prisma.SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CategoryDeleteArgs>(args: Prisma.SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CategoryUpdateArgs>(args: Prisma.SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CategoryUpsertArgs>(args: Prisma.SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CategoryCountArgs>(args?: Prisma.Subset<T, CategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryCountAggregateOutputType> : number>;
    aggregate<T extends CategoryAggregateArgs>(args: Prisma.Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;
    groupBy<T extends CategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CategoryFieldRefs;
}
export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    budgets<T extends Prisma.Category$budgetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    recurrences<T extends Prisma.Category$recurrencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$recurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.Category$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    subCategories<T extends Prisma.Category$subCategoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$subCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CategoryFieldRefs {
    readonly id: Prisma.FieldRef<"Category", 'String'>;
    readonly userId: Prisma.FieldRef<"Category", 'String'>;
    readonly name: Prisma.FieldRef<"Category", 'String'>;
    readonly icon: Prisma.FieldRef<"Category", 'String'>;
    readonly color: Prisma.FieldRef<"Category", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Category", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Category", 'DateTime'>;
}
export type CategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
};
export type CategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type CategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
    include?: Prisma.CategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
};
export type CategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type Category$budgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetSelect<ExtArgs> | null;
    omit?: Prisma.BudgetOmit<ExtArgs> | null;
    include?: Prisma.BudgetInclude<ExtArgs> | null;
    where?: Prisma.BudgetWhereInput;
    orderBy?: Prisma.BudgetOrderByWithRelationInput | Prisma.BudgetOrderByWithRelationInput[];
    cursor?: Prisma.BudgetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetScalarFieldEnum | Prisma.BudgetScalarFieldEnum[];
};
export type Category$recurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Category$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Category$subCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
};
