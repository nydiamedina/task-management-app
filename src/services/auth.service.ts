import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";

dotenv.config();
const { JWT_SECRET } = process.env;

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(emailAddress: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByEmailAddress(emailAddress);

    if (!user) {
      throw new Error(`User with email address ${emailAddress} was not found.`);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new Error("Invalid login credentials.");
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }

  async signup(
    emailAddress: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    const existingUser = await this.userRepository.findOneByEmailAddress(
      emailAddress
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    const user = new User();
    user.emailAddress = emailAddress;
    user.password = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName;

    await this.userRepository.create(user);
  }

  async logout(token: string) {
    // TODO: Add functionality to log out user
    // For example, remove token from cache or database
    // or blacklist the token
  }
}
