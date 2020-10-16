import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyInfo } from 'dto/company.dto';
import { CompanyInput, CompanyUpdate } from 'input/company.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [CompanyInfo])
  async companys(): Promise<CompanyInfo[]> {
    return this.companyService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => CompanyInfo)
  async company(@Args('id') id: string): Promise<CompanyInfo> {
    return this.companyService.findById(id);
  }

  @Mutation(() => CompanyInfo)
  async createCompany(
    @Args('input') input: CompanyInput,
  ): Promise<CompanyInfo> {
    return this.companyService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CompanyInfo)
  async updateCompany(
    @Args('id') id: string,
    @Args('input') input: CompanyUpdate,
  ): Promise<CompanyInfo> {
    return this.companyService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async softDeleteCompany(@Args('id') id: string): Promise<string> {
    await this.companyService.softDelete(id);
    return 'success to soft delete';
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async deleteCompany(@Args('id') id: string): Promise<string> {
    await this.companyService.delete(id);
    return 'success delete';
  }
}
