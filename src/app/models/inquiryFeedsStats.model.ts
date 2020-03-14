export class InquiryFeedStats {
    receivers: string;
    sent: {
        amount: string;
        percentage: string;
    };
    delivered: {
        amount: string;
        percentage: string
    };
    readed: {
        amount: string;
        percentage: string
    };
    withResponse: {
        amount: string;
        percentage: string
    };
}
