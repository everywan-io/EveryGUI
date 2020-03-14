export class UserFilter {
    platformName: string;
    term: string;
    gender: string;
    fromDateDob: string;
    toDateDob:	string;
    resident: boolean;
}

export class UserGroup {
    id: string;
    name: string;
    description: string;
    filters: UserFilter;
    createdAt: string;
    updatedAt: string;
}
