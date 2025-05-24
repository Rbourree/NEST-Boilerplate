
export class User {
    constructor(
        public readonly id_user: string,
        public email: string,
        public password: string,
        public firstname?: string,
        public lastname?: string,
        public address?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public zipCode?: string,
        public dateOfBirth?: Date,
        public phone?: string,
    ) {}

    /**
     * @param {string} newFirstname - The new first name of the user.
     * @throws {Error} If the new first name is empty.
     * @description Updates the firstname of the user.
     * @returns {void}
     */
    updateFirstname(newFirstname: string): void {
        if (!newFirstname.trim()) {
            throw new Error('Name cannot be empty');
        }
        this.firstname = newFirstname;
    }

    /**
     * @param {string} newLastname - The new last name of the user.
     * @throws {Error} If the new last name is empty.
     * @description Updates the lastname of the user.
     * @returns {void}
     */
    updateLastname(newLastname: string): void {
        if (!newLastname.trim()) {
            throw new Error('Name cannot be empty');
        }
        this.lastname = newLastname;
    }

    /**
     * @param {string} newEmail - The new email of the user.
     * @throws {Error} If the new email is invalid.
     * @description Updates the email of the user.
     * @returns {void}
     */
    updateEmail(newEmail: string): void {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!regexp.test(newEmail)) {
            throw new Error('Invalid email address');
        }
        this.email = newEmail;
    }

    /**
     * @param {string} newPassword - The new password of the user.
     * @throws {Error} If the new password is empty.
     * @description Updates the password of the user.
     * @returns {void}
     */
    updatePassword(newPassword: string): void {
        if (!newPassword.trim()) {
            throw new Error('Password cannot be empty');
        }
        this.password = newPassword;
    }

    /**
     * @param {string} newAddress - The new address of the user.
     * @throws {Error} If the new address is empty.
     * @description Updates the address of the user.
     * @returns {void}
     */
    updateAddress(newAddress: string): void {
        if (!newAddress.trim()) {
            throw new Error('Address cannot be empty');
        }
        this.address = newAddress;
    }

    /**
     * @param {string} newCity - The new city of the user.
     * @throws {Error} If the new city is empty.
     * @description Updates the city of the user.
     * @returns {void}
     */
    updateCity(newCity: string): void {
        if (!newCity.trim()) {
            throw new Error('City cannot be empty');
        }
        this.city = newCity;
    }

    /**
     * @param {string} newState - The new state of the user.
     * @throws {Error} If the new state is empty.
     * @description Updates the state of the user.
     * @returns {void}
     */
    updateState(newState: string): void {
        if (!newState.trim()) {
            throw new Error('State cannot be empty');
        }
        this.state = newState;
    }

    /**
     * @param {string} newCountry - The new country of the user.
     * @throws {Error} If the new country is empty.
     * @description Updates the country of the user.
     * @returns {void}
     */
    updateCountry(newCountry: string): void {
        if (!newCountry.trim()) {
            throw new Error('Country cannot be empty');
        }
        this.country = newCountry;
    }

    /**
     * @param {string} newPostalCode - The new postal code of the user.
     * @throws {Error} If the new postal code is invalid.
     * @description Updates the postal code of the user.
     * @returns {void}
     */
    updatePostalCode(newZipCode: string): void {
        const regexp = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
        if (!regexp.test(newZipCode)) {
            throw new Error('Invalid postal code');
        }
        this.zipCode = newZipCode;
    }

    /**
     * @param {Date} newDateOfBirth - The new date of birth of the user.
     * @throws {Error} If the new date of birth is empty.
     * @description Updates the date of birth of the user.
     * @returns {void}
     */
    updateDateOfBirth(newDateOfBirth: Date): void {
        if (!newDateOfBirth) {
            throw new Error('Date of birth cannot be empty');
        }
        this.dateOfBirth = newDateOfBirth;
    }

    /**
     * @param {string} newPhone - The new phone number of the user.
     * @throws {Error} If the new phone number is invalid.
     * @description Updates the phone number of the user.
     * @returns {void}
     */
    updatePhone(newPhone: string): void {
        const regexp = new RegExp(/^\+?[1-9]\d{1,14}$/);
        if (!regexp.test(newPhone)) {
            throw new Error('Invalid phone number');
        }
        this.phone = newPhone;
    }

    /**
     * @param {User} other - The other user to compare with.
     * @description Compares two users for equality.
     * @returns {boolean} True if the users are equal, false otherwise.
     */
    equals(other: User): boolean {
        return this.id_user === other.id_user &&
            this.firstname === other.firstname &&
            this.lastname === other.lastname &&
            this.email === other.email &&
            this.password === other.password &&
            this.address === other.address &&
            this.city === other.city &&
            this.state === other.state &&
            this.country === other.country &&
            this.zipCode === other.zipCode &&
            this.dateOfBirth?.getTime() === other.dateOfBirth?.getTime() &&
            this.phone === other.phone;
    }
}
