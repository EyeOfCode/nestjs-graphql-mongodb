import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from 'dto/user.dto';
import { UserInput, UserUpdate } from 'input/user.input';
import { User, UserDocument } from 'schemas/user.schema';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
    private readonly companyService: CompanyService,
  ) {}

  async find(): Promise<UserInfo[]> {
    return this.usersModel.find({ deleted: false }).exec();
  }

  async findSoftDelete(): Promise<UserInfo[]> {
    return this.usersModel.find().exec();
  }

  async findById(id: string): Promise<UserInfo> {
    return this.usersModel.findById(id).exec();
  }

  async findOne(input: { by: string; find: string }): Promise<UserInfo> {
    return this.usersModel.findOne({ [input.by]: input.find }).exec();
  }

  async create(companyId: string, input: UserInput): Promise<UserInfo> {
    const createdUser = await this.usersModel.create(input);
    const company = await this.companyService.findById(companyId);
    createdUser.company = company;
    const created = await createdUser.save();
    return await this.usersModel.findById(created._id).populate('company');
  }

  async update(id: string, input: UserUpdate): Promise<UserInfo> {
    await this.usersModel.findByIdAndUpdate(id, input);
    return this.usersModel.findById(id).exec();
  }

  async softDelete(id: string): Promise<UserInfo> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new Error('user not found');
    }
    await this.usersModel.findByIdAndUpdate(id, { deleted: true });
    return user;
  }

  async delete(id: string): Promise<UserInfo> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new Error('user not found');
    }
    await this.usersModel.findByIdAndDelete(id);
    return user;
  }
}
