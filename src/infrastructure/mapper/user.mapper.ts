import { User } from "../../core/users/user.entity";
import { Email, Phone, ZipCode, UUID } from"../../core/users/value-objects";

export class UserMapper {

  static toUser(record: any): User {    
    return User.create(
      UUID.create(record.id_user),
      Email.create(record.email),
      record.password,
      record.firstname,
      record.lastname,
      record.address,
      record.city,
      record.state,
      record.country,
      record.zipCode ? ZipCode.create(record.zipCode) : null,
      record.dateOfBirth,
      record.phone ? Phone.create(record.phone) : null
    );
  }

  static toPersistence(user: User) {
    
    return {
      id_user: user.id_user.getValue(),
      email: user.email.getValue(),
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      zipCode: user.zipCode ? user.zipCode.getValue() : null,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone ? user.phone.getValue() : null,
    };
  }
}
