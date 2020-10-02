import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from 'dto/user.dto';
import { UserInput } from 'input/user.input';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {}

  async find(): Promise<UserInfo[]> {
    return await this.usersRepository.find().exec();
  }

  async findById(id: string): Promise<UserInfo> {
    return await this.usersRepository.findById(id).exec();
  }

  async findOne(input: { by: string; find: string }): Promise<UserInfo> {
    return await this.usersRepository
      .findOne({ [input.by]: input.find })
      .exec();
  }

  async create(input: UserInput): Promise<UserInfo> {
    const createdUser = new this.usersRepository(input);
    return await createdUser.save();
  }
}
