export class InquiryOperator {
    id: string;
    fullname: string;
    avatar: string;
}

export class Inquiry {
    id: string;
    type: string;
    recipientsGroupName: string;
    operator: InquiryOperator;
    createdAt: string;
    updatedAt: string;
}
