import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Response,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { createCompanyDTO } from './company.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CompanyGuard } from 'src/guard/company.guard';

@ApiTags('Companies')
@Controller()
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  /**
   * @param {string} identifier
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company data return' })
  @Post()
  async createCompany(
    @Body() company: createCompanyDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    if (req.user.company !== null) {
      return response.status(403).json({
        error: 'Forbidden',
        code: 403,
        message: 'This user already have a company',
      });
    }

    const companyData = await this.companyService.findOrCreate(company);

    if (companyData.status === false) {
      return response.status(403).json({
        error: 'Forbidden',
        code: 403,
        message: 'This company already exist',
      });
    }

    this.userService.setCompany(req.user.id, companyData.company);

    return response.json(companyData);
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'Companies data return' })
  @Get('/')
  async companies(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    const companies = await this.companyService.findAllCompanies(
      query.page,
      query.limit,
    );
    return response.json(companies);
  }

  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company data return' })
  @UseGuards(CompanyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @Get('/candidates')
  async getCandidates(@Request() req, @Response() response): Promise<string> {
    return response.json(
      await this.companyService.findCandidatesByCompany(req.user.company),
    );
  }

  /**
   * @param {@Param} id<string>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company data return' })
  @UseGuards(CompanyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @Put('/candidates')
  async updateCandidates(
    @Body() data: any,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.companyService.updateCandidate(data.id));
  }

  /**
   * @param {string} identifier
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company data return' })
  @ApiParam({ name: 'identifier', type: String })
  @Get('/:identifier')
  async getCompanyByIdOrSlug(
    @Param('identifier') identifier: string,
    @Response() response,
  ): Promise<string> {
    const companyData = await this.companyService.findOneByIdOrSlug(identifier);

    if (companyData === null) {
      return response.status(404).json({ message: 'Company not found' });
    }

    return response.json(companyData);
  }

  /**
   * @param {string} companyName
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company data return' })
  @ApiParam({ name: 'name', type: String })
  @Get('/:name/name')
  async getCompanyByName(
    @Param('name') companyName: string,
    @Response() response,
  ): Promise<string> {
    const companyData = await this.companyService.findByName(companyName);

    if (companyData.length === 0) {
      return response.status(404).json({ message: 'Company not found' });
    }

    return response.json(companyData);
  }

  /**
   * @param {string} companyName
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Company advertisments return' })
  @ApiParam({ name: 'slug', type: String })
  @Get('/:slug/advertisments')
  async getCompanyAdvertisments(
    @Param('slug') companySlug: string,
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(
      await this.companyService.findAdvertismentByCompany(companySlug, query),
    );
  }
}
