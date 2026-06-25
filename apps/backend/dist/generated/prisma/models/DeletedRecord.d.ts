import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type DeletedRecordModel = runtime.Types.Result.DefaultSelection<Prisma.$DeletedRecordPayload>;
export type AggregateDeletedRecord = {
    _count: DeletedRecordCountAggregateOutputType | null;
    _min: DeletedRecordMinAggregateOutputType | null;
    _max: DeletedRecordMaxAggregateOutputType | null;
};
export type DeletedRecordMinAggregateOutputType = {
    id: string | null;
    recordId: string | null;
    tableName: $Enums.TableName | null;
    userId: string | null;
    deletedAt: Date | null;
};
export type DeletedRecordMaxAggregateOutputType = {
    id: string | null;
    recordId: string | null;
    tableName: $Enums.TableName | null;
    userId: string | null;
    deletedAt: Date | null;
};
export type DeletedRecordCountAggregateOutputType = {
    id: number;
    recordId: number;
    tableName: number;
    userId: number;
    deletedAt: number;
    _all: number;
};
export type DeletedRecordMinAggregateInputType = {
    id?: true;
    recordId?: true;
    tableName?: true;
    userId?: true;
    deletedAt?: true;
};
export type DeletedRecordMaxAggregateInputType = {
    id?: true;
    recordId?: true;
    tableName?: true;
    userId?: true;
    deletedAt?: true;
};
export type DeletedRecordCountAggregateInputType = {
    id?: true;
    recordId?: true;
    tableName?: true;
    userId?: true;
    deletedAt?: true;
    _all?: true;
};
export type DeletedRecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeletedRecordWhereInput;
    orderBy?: Prisma.DeletedRecordOrderByWithRelationInput | Prisma.DeletedRecordOrderByWithRelationInput[];
    cursor?: Prisma.DeletedRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeletedRecordCountAggregateInputType;
    _min?: DeletedRecordMinAggregateInputType;
    _max?: DeletedRecordMaxAggregateInputType;
};
export type GetDeletedRecordAggregateType<T extends DeletedRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateDeletedRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeletedRecord[P]> : Prisma.GetScalarType<T[P], AggregateDeletedRecord[P]>;
};
export type DeletedRecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeletedRecordWhereInput;
    orderBy?: Prisma.DeletedRecordOrderByWithAggregationInput | Prisma.DeletedRecordOrderByWithAggregationInput[];
    by: Prisma.DeletedRecordScalarFieldEnum[] | Prisma.DeletedRecordScalarFieldEnum;
    having?: Prisma.DeletedRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeletedRecordCountAggregateInputType | true;
    _min?: DeletedRecordMinAggregateInputType;
    _max?: DeletedRecordMaxAggregateInputType;
};
export type DeletedRecordGroupByOutputType = {
    id: string;
    recordId: string;
    tableName: $Enums.TableName;
    userId: string;
    deletedAt: Date;
    _count: DeletedRecordCountAggregateOutputType | null;
    _min: DeletedRecordMinAggregateOutputType | null;
    _max: DeletedRecordMaxAggregateOutputType | null;
};
export type GetDeletedRecordGroupByPayload<T extends DeletedRecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeletedRecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeletedRecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeletedRecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeletedRecordGroupByOutputType[P]>;
}>>;
export type DeletedRecordWhereInput = {
    AND?: Prisma.DeletedRecordWhereInput | Prisma.DeletedRecordWhereInput[];
    OR?: Prisma.DeletedRecordWhereInput[];
    NOT?: Prisma.DeletedRecordWhereInput | Prisma.DeletedRecordWhereInput[];
    id?: Prisma.StringFilter<"DeletedRecord"> | string;
    recordId?: Prisma.StringFilter<"DeletedRecord"> | string;
    tableName?: Prisma.EnumTableNameFilter<"DeletedRecord"> | $Enums.TableName;
    userId?: Prisma.StringFilter<"DeletedRecord"> | string;
    deletedAt?: Prisma.DateTimeFilter<"DeletedRecord"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DeletedRecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    recordId?: Prisma.SortOrder;
    tableName?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DeletedRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DeletedRecordWhereInput | Prisma.DeletedRecordWhereInput[];
    OR?: Prisma.DeletedRecordWhereInput[];
    NOT?: Prisma.DeletedRecordWhereInput | Prisma.DeletedRecordWhereInput[];
    recordId?: Prisma.StringFilter<"DeletedRecord"> | string;
    tableName?: Prisma.EnumTableNameFilter<"DeletedRecord"> | $Enums.TableName;
    userId?: Prisma.StringFilter<"DeletedRecord"> | string;
    deletedAt?: Prisma.DateTimeFilter<"DeletedRecord"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DeletedRecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    recordId?: Prisma.SortOrder;
    tableName?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    _count?: Prisma.DeletedRecordCountOrderByAggregateInput;
    _max?: Prisma.DeletedRecordMaxOrderByAggregateInput;
    _min?: Prisma.DeletedRecordMinOrderByAggregateInput;
};
export type DeletedRecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeletedRecordScalarWhereWithAggregatesInput | Prisma.DeletedRecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeletedRecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeletedRecordScalarWhereWithAggregatesInput | Prisma.DeletedRecordScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeletedRecord"> | string;
    recordId?: Prisma.StringWithAggregatesFilter<"DeletedRecord"> | string;
    tableName?: Prisma.EnumTableNameWithAggregatesFilter<"DeletedRecord"> | $Enums.TableName;
    userId?: Prisma.StringWithAggregatesFilter<"DeletedRecord"> | string;
    deletedAt?: Prisma.DateTimeWithAggregatesFilter<"DeletedRecord"> | Date | string;
};
export type DeletedRecordCreateInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    deletedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDeletedRecordsInput;
};
export type DeletedRecordUncheckedCreateInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    userId: string;
    deletedAt?: Date | string;
};
export type DeletedRecordUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDeletedRecordsNestedInput;
};
export type DeletedRecordUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordCreateManyInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    userId: string;
    deletedAt?: Date | string;
};
export type DeletedRecordUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordListRelationFilter = {
    every?: Prisma.DeletedRecordWhereInput;
    some?: Prisma.DeletedRecordWhereInput;
    none?: Prisma.DeletedRecordWhereInput;
};
export type DeletedRecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DeletedRecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordId?: Prisma.SortOrder;
    tableName?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type DeletedRecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordId?: Prisma.SortOrder;
    tableName?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type DeletedRecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recordId?: Prisma.SortOrder;
    tableName?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type DeletedRecordCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput> | Prisma.DeletedRecordCreateWithoutUserInput[] | Prisma.DeletedRecordUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeletedRecordCreateOrConnectWithoutUserInput | Prisma.DeletedRecordCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeletedRecordCreateManyUserInputEnvelope;
    connect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
};
export type DeletedRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput> | Prisma.DeletedRecordCreateWithoutUserInput[] | Prisma.DeletedRecordUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeletedRecordCreateOrConnectWithoutUserInput | Prisma.DeletedRecordCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeletedRecordCreateManyUserInputEnvelope;
    connect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
};
export type DeletedRecordUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput> | Prisma.DeletedRecordCreateWithoutUserInput[] | Prisma.DeletedRecordUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeletedRecordCreateOrConnectWithoutUserInput | Prisma.DeletedRecordCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeletedRecordUpsertWithWhereUniqueWithoutUserInput | Prisma.DeletedRecordUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeletedRecordCreateManyUserInputEnvelope;
    set?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    disconnect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    delete?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    connect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    update?: Prisma.DeletedRecordUpdateWithWhereUniqueWithoutUserInput | Prisma.DeletedRecordUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeletedRecordUpdateManyWithWhereWithoutUserInput | Prisma.DeletedRecordUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeletedRecordScalarWhereInput | Prisma.DeletedRecordScalarWhereInput[];
};
export type DeletedRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput> | Prisma.DeletedRecordCreateWithoutUserInput[] | Prisma.DeletedRecordUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeletedRecordCreateOrConnectWithoutUserInput | Prisma.DeletedRecordCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeletedRecordUpsertWithWhereUniqueWithoutUserInput | Prisma.DeletedRecordUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeletedRecordCreateManyUserInputEnvelope;
    set?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    disconnect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    delete?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    connect?: Prisma.DeletedRecordWhereUniqueInput | Prisma.DeletedRecordWhereUniqueInput[];
    update?: Prisma.DeletedRecordUpdateWithWhereUniqueWithoutUserInput | Prisma.DeletedRecordUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeletedRecordUpdateManyWithWhereWithoutUserInput | Prisma.DeletedRecordUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeletedRecordScalarWhereInput | Prisma.DeletedRecordScalarWhereInput[];
};
export type EnumTableNameFieldUpdateOperationsInput = {
    set?: $Enums.TableName;
};
export type DeletedRecordCreateWithoutUserInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    deletedAt?: Date | string;
};
export type DeletedRecordUncheckedCreateWithoutUserInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    deletedAt?: Date | string;
};
export type DeletedRecordCreateOrConnectWithoutUserInput = {
    where: Prisma.DeletedRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput>;
};
export type DeletedRecordCreateManyUserInputEnvelope = {
    data: Prisma.DeletedRecordCreateManyUserInput | Prisma.DeletedRecordCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DeletedRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeletedRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.DeletedRecordUpdateWithoutUserInput, Prisma.DeletedRecordUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DeletedRecordCreateWithoutUserInput, Prisma.DeletedRecordUncheckedCreateWithoutUserInput>;
};
export type DeletedRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeletedRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.DeletedRecordUpdateWithoutUserInput, Prisma.DeletedRecordUncheckedUpdateWithoutUserInput>;
};
export type DeletedRecordUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DeletedRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.DeletedRecordUpdateManyMutationInput, Prisma.DeletedRecordUncheckedUpdateManyWithoutUserInput>;
};
export type DeletedRecordScalarWhereInput = {
    AND?: Prisma.DeletedRecordScalarWhereInput | Prisma.DeletedRecordScalarWhereInput[];
    OR?: Prisma.DeletedRecordScalarWhereInput[];
    NOT?: Prisma.DeletedRecordScalarWhereInput | Prisma.DeletedRecordScalarWhereInput[];
    id?: Prisma.StringFilter<"DeletedRecord"> | string;
    recordId?: Prisma.StringFilter<"DeletedRecord"> | string;
    tableName?: Prisma.EnumTableNameFilter<"DeletedRecord"> | $Enums.TableName;
    userId?: Prisma.StringFilter<"DeletedRecord"> | string;
    deletedAt?: Prisma.DateTimeFilter<"DeletedRecord"> | Date | string;
};
export type DeletedRecordCreateManyUserInput = {
    id?: string;
    recordId: string;
    tableName: $Enums.TableName;
    deletedAt?: Date | string;
};
export type DeletedRecordUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordId?: Prisma.StringFieldUpdateOperationsInput | string;
    tableName?: Prisma.EnumTableNameFieldUpdateOperationsInput | $Enums.TableName;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeletedRecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordId?: boolean;
    tableName?: boolean;
    userId?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deletedRecord"]>;
export type DeletedRecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordId?: boolean;
    tableName?: boolean;
    userId?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deletedRecord"]>;
export type DeletedRecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recordId?: boolean;
    tableName?: boolean;
    userId?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deletedRecord"]>;
export type DeletedRecordSelectScalar = {
    id?: boolean;
    recordId?: boolean;
    tableName?: boolean;
    userId?: boolean;
    deletedAt?: boolean;
};
export type DeletedRecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recordId" | "tableName" | "userId" | "deletedAt", ExtArgs["result"]["deletedRecord"]>;
export type DeletedRecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeletedRecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeletedRecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DeletedRecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeletedRecord";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        recordId: string;
        tableName: $Enums.TableName;
        userId: string;
        deletedAt: Date;
    }, ExtArgs["result"]["deletedRecord"]>;
    composites: {};
};
export type DeletedRecordGetPayload<S extends boolean | null | undefined | DeletedRecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload, S>;
export type DeletedRecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeletedRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeletedRecordCountAggregateInputType | true;
};
export interface DeletedRecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeletedRecord'];
        meta: {
            name: 'DeletedRecord';
        };
    };
    findUnique<T extends DeletedRecordFindUniqueArgs>(args: Prisma.SelectSubset<T, DeletedRecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeletedRecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeletedRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeletedRecordFindFirstArgs>(args?: Prisma.SelectSubset<T, DeletedRecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeletedRecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeletedRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeletedRecordFindManyArgs>(args?: Prisma.SelectSubset<T, DeletedRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeletedRecordCreateArgs>(args: Prisma.SelectSubset<T, DeletedRecordCreateArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeletedRecordCreateManyArgs>(args?: Prisma.SelectSubset<T, DeletedRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeletedRecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeletedRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeletedRecordDeleteArgs>(args: Prisma.SelectSubset<T, DeletedRecordDeleteArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeletedRecordUpdateArgs>(args: Prisma.SelectSubset<T, DeletedRecordUpdateArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeletedRecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeletedRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeletedRecordUpdateManyArgs>(args: Prisma.SelectSubset<T, DeletedRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeletedRecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeletedRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeletedRecordUpsertArgs>(args: Prisma.SelectSubset<T, DeletedRecordUpsertArgs<ExtArgs>>): Prisma.Prisma__DeletedRecordClient<runtime.Types.Result.GetResult<Prisma.$DeletedRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeletedRecordCountArgs>(args?: Prisma.Subset<T, DeletedRecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeletedRecordCountAggregateOutputType> : number>;
    aggregate<T extends DeletedRecordAggregateArgs>(args: Prisma.Subset<T, DeletedRecordAggregateArgs>): Prisma.PrismaPromise<GetDeletedRecordAggregateType<T>>;
    groupBy<T extends DeletedRecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeletedRecordGroupByArgs['orderBy'];
    } : {
        orderBy?: DeletedRecordGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeletedRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeletedRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeletedRecordFieldRefs;
}
export interface Prisma__DeletedRecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeletedRecordFieldRefs {
    readonly id: Prisma.FieldRef<"DeletedRecord", 'String'>;
    readonly recordId: Prisma.FieldRef<"DeletedRecord", 'String'>;
    readonly tableName: Prisma.FieldRef<"DeletedRecord", 'TableName'>;
    readonly userId: Prisma.FieldRef<"DeletedRecord", 'String'>;
    readonly deletedAt: Prisma.FieldRef<"DeletedRecord", 'DateTime'>;
}
export type DeletedRecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where: Prisma.DeletedRecordWhereUniqueInput;
};
export type DeletedRecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where: Prisma.DeletedRecordWhereUniqueInput;
};
export type DeletedRecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where?: Prisma.DeletedRecordWhereInput;
    orderBy?: Prisma.DeletedRecordOrderByWithRelationInput | Prisma.DeletedRecordOrderByWithRelationInput[];
    cursor?: Prisma.DeletedRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeletedRecordScalarFieldEnum | Prisma.DeletedRecordScalarFieldEnum[];
};
export type DeletedRecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where?: Prisma.DeletedRecordWhereInput;
    orderBy?: Prisma.DeletedRecordOrderByWithRelationInput | Prisma.DeletedRecordOrderByWithRelationInput[];
    cursor?: Prisma.DeletedRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeletedRecordScalarFieldEnum | Prisma.DeletedRecordScalarFieldEnum[];
};
export type DeletedRecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where?: Prisma.DeletedRecordWhereInput;
    orderBy?: Prisma.DeletedRecordOrderByWithRelationInput | Prisma.DeletedRecordOrderByWithRelationInput[];
    cursor?: Prisma.DeletedRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeletedRecordScalarFieldEnum | Prisma.DeletedRecordScalarFieldEnum[];
};
export type DeletedRecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeletedRecordCreateInput, Prisma.DeletedRecordUncheckedCreateInput>;
};
export type DeletedRecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeletedRecordCreateManyInput | Prisma.DeletedRecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeletedRecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    data: Prisma.DeletedRecordCreateManyInput | Prisma.DeletedRecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DeletedRecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DeletedRecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeletedRecordUpdateInput, Prisma.DeletedRecordUncheckedUpdateInput>;
    where: Prisma.DeletedRecordWhereUniqueInput;
};
export type DeletedRecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeletedRecordUpdateManyMutationInput, Prisma.DeletedRecordUncheckedUpdateManyInput>;
    where?: Prisma.DeletedRecordWhereInput;
    limit?: number;
};
export type DeletedRecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeletedRecordUpdateManyMutationInput, Prisma.DeletedRecordUncheckedUpdateManyInput>;
    where?: Prisma.DeletedRecordWhereInput;
    limit?: number;
    include?: Prisma.DeletedRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DeletedRecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where: Prisma.DeletedRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeletedRecordCreateInput, Prisma.DeletedRecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeletedRecordUpdateInput, Prisma.DeletedRecordUncheckedUpdateInput>;
};
export type DeletedRecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
    where: Prisma.DeletedRecordWhereUniqueInput;
};
export type DeletedRecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeletedRecordWhereInput;
    limit?: number;
};
export type DeletedRecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeletedRecordSelect<ExtArgs> | null;
    omit?: Prisma.DeletedRecordOmit<ExtArgs> | null;
    include?: Prisma.DeletedRecordInclude<ExtArgs> | null;
};
