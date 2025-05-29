import { z } from "zod";

const UserProps = z.object({
    id_user: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstname: z.string().optional().nullable(),
    lastname: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    zipCode: z.string().optional().nullable(),
    dateOfBirth: z.date().optional().nullable(),
    phone: z.string().optional().nullable(),
})
type UserProps = z.infer<typeof UserProps>;

/**
 * User entity representing a user in the system.
 * @class User
 * @description This class encapsulates the properties and behaviors of a user.
 * @property {string} id_user - The unique identifier of the user.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string | null} firstname - The user's first name.
 * @property {string | null} lastname - The user's last name.
 * @property {string | null} address - The user's address.
 * @property {string | null} city - The user's city.
 * @property {string | null} state - The user's state.
 * @property {string | null} country - The user's country.
 * @property {string | null} zipCode - The user's zip code.
 * @property {Date | null} dateOfBirth - The user's date of birth.
 * @property {string | null} phone - The user's phone number.
*/
export class User {
    private readonly _id_user: string
    private readonly _email: string
    private readonly _password: string
    private _firstname: string | null
    private _lastname: string | null
    private _address: string | null
    private _city: string | null
    private _state: string | null
    private _country: string | null
    private _zipCode: string | null
    private _dateOfBirth: Date | null
    private _phone: string | null

    private constructor(props: UserProps) {
        this._id_user = props.id_user;
        this._email = props.email;
        this._password = props.password;
        this._firstname = props.firstname || null;
        this._lastname = props.lastname || null;
        this._address = props.address || null;
        this._city = props.city || null;
        this._state = props.state || null;
        this._country = props.country || null;
        this._zipCode = props.zipCode || null;
        this._dateOfBirth = props.dateOfBirth || null;
        this._phone = props.phone || null;

    }
    /**
     * Create a new User instance.
     * @param {UserProps} props - The properties of the user.
     * @returns {User} A new User instance.
     * @description Creates a new User instance with the provided properties.
     */
    static create(props: UserProps) {
        try {
            UserProps.parse(props);
            return new User(props);
        } catch (error) {
            if (error instanceof z.ZodError) {                
                throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
            }
            throw error;
        }
    }

    get id_user(): string {
        return this._id_user;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get firstname(): string | null {
        return this._firstname;
    }
    get lastname(): string | null {
        return this._lastname;
    }
    get address(): string | null {
        return this._address;
    }

    get city(): string | null {
        return this._city;
    }
    get state(): string | null {
        return this._state;
    }
    get country(): string | null {
        return this._country;
    }
    get zipCode(): string | null {
        return this._zipCode;
    }
    get dateOfBirth(): Date | null {
        return this._dateOfBirth;
    }
    get phone(): string | null {
        return this._phone;
    }

    toJSON(): UserProps {
        return {
            id_user: this._id_user,
            email: this._email,
            password: this._password,
            firstname: this._firstname,
            lastname: this._lastname,
            address: this._address,
            city: this._city,
            state: this._state,
            country: this._country,
            zipCode: this._zipCode,
            dateOfBirth: this._dateOfBirth,
            phone: this._phone
        };
    }
}