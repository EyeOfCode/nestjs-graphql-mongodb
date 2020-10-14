import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData, UserInfo } from 'dto/user.dto';
import { UserInput, UserUpdate } from 'input/user.input';
import { User, UserDocument } from 'schemas/user.schema';
import { CompanyInfo } from 'dto/company.dto';
import { CompanyService } from '../company/company.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async findEmail(email: string): Promise<UserData>{
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(
      String(email).toLowerCase(),
    );
    if (!isValidEmail) {
      throw new Error('email not in proper format');
    }
    return this.usersModel.findOne({ email }).exec();
  }

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

  async getCompanyData(id: string): Promise<CompanyInfo | null> {
    const company = await this.companyService.findById(id);
    return company || null;
  }

  async create(companyId: string, input: UserInput): Promise<UserInfo> {
    const checkEmail = await this.findEmail(input.email)
    const user = await this.usersModel.findOne({email: checkEmail.email})
    if(user){
      throw new Error('duplicate user');
    }

    const createdUser = await this.usersModel.create(input);
    createdUser.password = await bcrypt.hashSync(createdUser.password,10);
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
