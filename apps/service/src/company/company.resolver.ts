import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyInfo } from 'dto/company.dto';
import { CompanyInput, CompanyUpdate } from 'input/company.input';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [CompanyInfo])
  async companys(): Promise<CompanyInfo[]> {
    return this.companyService.find();
  }

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

  @Mutation(() => CompanyInfo)
  async updateCompany(
    @Args('id') id: string,
    @Args('input') input: CompanyUpdate,
  ): Promise<CompanyInfo> {
    return this.companyService.update(id, input);
  }

  @Mutation(() => String)
  async softDeleteCompany(@Args('id') id: string): Promise<string> {
    await this.companyService.softDelete(id);
    return 'success to soft delete';
  }

  @Mutation(() => String)
  async deleteCompany(@Args('id') id: string): Promise<string> {
    await this.companyService.delete(id);
    return 'success delete';
  }
}
