import { UUID, Email, ZipCode, Phone } from "./value-objects";

interface UserProps {
    id_user: UUID;
    email: Email;
    password: string;
    firstname?: string | null;
    lastname?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    zipCode?: ZipCode | null;
    dateOfBirth?: Date | null;
    phone?: Phone | null;
}

/**
 * User entity representing a user in the system.
 * @class User
 * @description This class encapsulates the properties and behaviors of a user.
 * It includes methods for creating, updating, and retrieving user information.
 * @property {UUID} id_user - The unique identifier of the user.
 * @property {Email} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} [firstname] - The first name of the user.
 * @property {string} [lastname] - The last name of the user.
 * @property {string} [address] - The address of the user.
 * @property {string} [city] - The city of the user.
 * @property {string} [state] - The state of the user.
 * @property {string} [country] - The country of the user.
 * @property {ZipCode} [zipCode] - The postal code of the user.
 * @property {Date} [dateOfBirth] - The date of birth of the user.
 * @property {Phone} [phone] - The phone number of the user.
 * @throws {Error} If required properties are missing during creation.
 * @throws {Error} If any property is invalid during updates.
 * @example
 * const user = User.create(
 *   UUID.create('123e4567-e89b-12d3-a456-426614174000'),
 *   Email.create('john.doe@example.com'),
 *   'password123',
 *   'John',
 *   'Doe',
 *   '123 Main St',
 *   'Anytown',
 *   'CA',
 *   'USA',
 *   ZipCode.create('12345'),
 *   new Date('1990-01-01'),
 *   Phone.create('555-1234')
 * );
 */
export class User {
    private props: UserProps;

    /**
     * Private constructor to enforce the use of the static create method.
     * @param {UserProps} props - The properties of the user.
     * @description Initializes a new User instance with the provided properties.
     */
    private constructor(props: UserProps) {
        this.props = props;
    }
    /**
     * Create a new User instance.
     * @param {UserProps} props - The properties of the user.
     * @returns {User} A new User instance.
     * @throws {Error} If required properties are missing.
     * @description Creates a new User instance with the provided properties.
     */
    static create(
        id_user: UUID,
        email: Email,
        password: string,
        firstname?: string | null,
        lastname?: string | null,
        address?: string | null,
        city?: string | null,
        state?: string | null,
        country?: string | null,
        zipCode?: ZipCode | null,
        dateOfBirth?: Date | null,
        phone?: Phone | null
    ): User {
        if (!id_user || !email || !password) {
            throw new Error('id_user, email, and password are required to create a User');
        }
        return new User({
            id_user,
            email,
            password,
            firstname: firstname || null,
            lastname: lastname || null,
            address: address || null,
            city: city || null,
            state: state || null,
            country: country || null,
            zipCode: zipCode || null,
            dateOfBirth: dateOfBirth || null,
            phone: phone || null
        });
    }

    /**
     * Get the properties of the user.
     * @returns {UserProps} The properties of the user.
     * @description Returns the properties of the user.
     */
    get data(): UserProps {
        return this.props;
    }

    
    /**
     * Get id_user
     * @returns {UUID} The unique identifier of the user.
     * @description Returns the unique identifier of the user.
     */
    get id_user(): UUID {
        return this.props.id_user;
    }

    /**
     * Get email
     * @returns {Email} The email of the user.
     * @description Returns the email of the user.
     */
    get email(): Email {
        return this.props.email;
    }

    /**
     * Get password
     * @returns {string} The password of the user.
     * @description Returns the password of the user.
     */
    get password(): string {
        return this.props.password;
    }

    
    get firstname(): string | null {
        return this.props.firstname || null;
    }
    get lastname(): string | null {
        return this.props.lastname || null;
    }
    get address(): string | null {
        return this.props.address || null;
    }

    get city(): string | null {
        return this.props.city || null;
    }
    get state(): string | null {
        return this.props.state || null;
    }
    get country(): string | null {
        return this.props.country || null;
    }
    get zipCode(): ZipCode | null {
        return this.props.zipCode || null;
    }
    get dateOfBirth(): Date | null {
        return this.props.dateOfBirth || null;
    }
    get phone(): Phone | null {
        return this.props.phone || null;
    }

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
        this.props.firstname = newFirstname;
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
        this.props.lastname = newLastname;
    }

    /**
     * @param {string} newEmail - The new email of the user.
     * @throws {Error} If the new email is invalid.
     * @description Updates the email of the user.
     * @returns {void}
     */
    updateEmail(newEmail: Email): void {
        this.props.email = newEmail;

    }

    /**
     * @param {string} newPassword - The new password of the user.
     * @throws {Error} If the new password is empty.
     * @description Updates the password of the user.
     * @returns {void}
     */
    updatePassword(newPassword: string): void {
        this.props.password = newPassword;
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
        this.props.address = newAddress;
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
        this.props.city = newCity;
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
        this.props.state = newState;
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
        this.props.country = newCountry;
    }

    /**
     * @param {string} newPostalCode - The new postal code of the user.
     * @throws {Error} If the new postal code is invalid.
     * @description Updates the postal code of the user.
     * @returns {void}
     */
    updateZipCode(newZipCode: string | ZipCode | null | undefined): void {
        if (!newZipCode) {
            this.props.zipCode = null;
            return;
        }
        if (typeof newZipCode === 'string') {
            this.props.zipCode = ZipCode.create(newZipCode);
        } else {
            this.props.zipCode = newZipCode;
        }
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
        this.props.dateOfBirth = newDateOfBirth;
    }

    /**
     * @param {string} newPhone - The new phone number of the user.
     * @throws {Error} If the new phone number is invalid.
     * @description Updates the phone number of the user.
     * @returns {void}
     */
    updatePhone(newPhone: Phone): void {
        this.props.phone = newPhone;
    }

    /**
     * @param {Partial<User>} data - The data to update the user with.
     * @description Updates the user with the provided data.
     * @returns {void}
     */
    update(data: User): void {
        if (data.props.firstname) this.updateFirstname(data.props.firstname);
        if (data.props.lastname) this.updateLastname(data.props.lastname);
        if (data.props.email) this.updateEmail(data.props.email);
        if (data.props.address) this.updateAddress(data.props.address);
        if (data.props.city) this.updateCity(data.props.city);
        if (data.props.state) this.updateState(data.props.state);
        if (data.props.country) this.updateCountry(data.props.country);
        if (data.props.zipCode) this.updateZipCode(data.props.zipCode);
        if (data.props.dateOfBirth) this.updateDateOfBirth(data.props.dateOfBirth);
        if (data.props.phone) this.updatePhone(data.props.phone);
    }
    
    toJSON() {
        return {
            id_user: this.id_user.getValue(),
            email: this.email.getValue(),
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            address: this.address,
            city: this.city,
            state: this.state,
            country: this.country,
            zipCode: this.zipCode ? this.zipCode.getValue() : null,
            dateOfBirth: this.dateOfBirth,
            phone: this.phone ? this.phone.getValue() : null,
        };
    }
}