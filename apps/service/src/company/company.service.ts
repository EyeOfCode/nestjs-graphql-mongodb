import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo } from 'dto/company.dto';
import { CompanyInput, CompanyUpdate } from 'input/company.input';
import { Company, CompanyDocument } from 'schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly CompanysRepository: Model<CompanyDocument>,
  ) {}

  async find(): Promise<CompanyInfo[]> {
    return this.CompanysRepository.find({ deleted: false }).exec();
  }

  async findSoftDelete(): Promise<CompanyInfo[]> {
    return this.CompanysRepository.find().exec();
  }

  async findById(id: string): Promise<CompanyInfo> {
    return this.CompanysRepository.findById(id).exec();
  }

  async findOne(input: { by: string; find: string }): Promise<CompanyInfo> {
    return this.CompanysRepository.findOne({ [input.by]: input.find }).exec();
  }

  async create(input: CompanyInput): Promise<CompanyInfo> {
    const createdCompany = await this.CompanysRepository.create(input);
    return createdCompany.save();
  }

  async update(id: string, input: CompanyUpdate): Promise<CompanyInfo> {
    await this.CompanysRepository.findByIdAndUpdate(id, input);
    return this.CompanysRepository.findById(id).exec();
  }

  async softDelete(id: string): Promise<CompanyInfo> {
    const Company = await this.CompanysRepository.findById(id).exec();
    if (!Company) {
      throw new Error('Company not found');
    }
    await this.CompanysRepository.findByIdAndUpdate(id, { deleted: true });
    return Company;
  }

  async delete(id: string): Promise<CompanyInfo> {
    const Company = await this.CompanysRepository.findById(id).exec();
    if (!Company) {
      throw new Error('Company not found');
    }
    await this.CompanysRepository.findByIdAndDelete(id);
    return Company;
  }
}
