import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import {
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import {
  ApplyAdvertismentDTO,
  createAdvertismentDTO,
} from './advertisment.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CompanyGuard } from 'src/guard/company.guard';

@ApiTags('Advertisments')
@Controller()
export class AdvertismentController {
  constructor(private readonly advertismentService: AdvertismentService) {}

  /**
   * @param {@Body} advertisment<createAdvertismentDTO>
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'Advertisments data return' })
  @UseGuards(CompanyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @Post('/')
  async advertisment(
    @Body() advertisment: createAdvertismentDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    Object.assign(advertisment, { company: req.user.company.id });
    const advertismentData =
      await this.advertismentService.createAdvertisment(advertisment);
    return response.json(advertismentData);
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'Advertisments data return' })
  @Get('/')
  async advertisments(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    const advertisements = await this.advertismentService.findAllAdvertisements(
      query.page,
      query.limit,
    );
    return response.json(advertisements);
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'Candidates data return' })
  @Get('/candidates')
  async candidates(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(
      await this.advertismentService.findAllCandidates(query),
    );
  }

  /**
   * @param {string} identifier
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'Candidates data return' })
  @ApiParam({ name: 'identifier', type: String })
  @Get('/candidates/:identifier')
  async getCandidate(
    @Param('identifier') identifier: string,
    @Response() response,
  ): Promise<string> {
    const user = await this.advertismentService.getCandidate(identifier);
    if (user === null) {
      return response.status(404).json({ message: 'User not found' });
    }
    return response.json(user);
  }

  /**
   * @param {string} identifier
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Advertisment data return' })
  @ApiParam({ name: 'identifier', type: String })
  @Get('/:identifier')
  async getAdvertisementByIdOrSlug(
    @Param('identifier') identifier: string,
    @Response() response,
  ): Promise<string> {
    const advertisementData =
      await this.advertismentService.findOneByIdOrSlug(identifier);

    if (advertisementData === null) {
      return response.status(404).json({ message: 'Advertisment not found' });
    }

    return response.json(advertisementData);
  }

  /**
   * @param {string} identifier
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Advertisment data return' })
  @ApiParam({ name: 'identifier', type: String })
  @Post('/:identifier/apply')
  async applyAdvertisment(
    @Param('identifier') identifier: string,
    @Body() data: ApplyAdvertismentDTO,
    @Response() response,
  ): Promise<string> {
    const advertisementData = await this.advertismentService.findOneByIdOrSlug(
      identifier,
      ['company', 'company.users'],
    );

    if (advertisementData === null) {
      return response.status(404).json({ message: 'Advertisment not found' });
    }

    await this.advertismentService.applyAdvertisment(advertisementData, data);

    return response.json({ message: 'Apply with success' });
  }
}
