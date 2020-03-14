export enum Gender {
    male = 'm',
    female = 'f'
}

export enum UserAccount {
    pending = 'pending',
    active = 'active'
}

export class User {
    id: string;
    email: string;
    name: string;
    surname: string;
    fullname: string;
    gender: Gender;
    account: UserAccount;
    fiscalCode: string;
    phone: {
        prefix: string;
        number: string;
        formatted: string;
    };
    info: string;
    emergencyContacts: string;
    residentialAddress: string;
    resident: boolean;
    location: {
        latitude: string;
        longitude: string;
        name: string;
    };
    birthplace: string;
    avatar: string;
    dob: string;
    createdAt: string;
    updatedAt: string;

    defineExtraProperties() {
        this.fullname = `${this.name} ${this.surname}`;
    }

    stringifyGender() {
        const genderSuffix = this.gender === 'm'
            ? 'male'
            : 'female';

        return `commons.gender.${genderSuffix}`;
    }
}
