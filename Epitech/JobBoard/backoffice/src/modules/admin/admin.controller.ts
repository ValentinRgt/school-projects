import {
  Controller,
  Get,
  Put,
  UseGuards,
  Response,
  Query,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AdminService } from './admin.service';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { UserDTO } from '../user/user.dto';

@ApiTags('Admin')
@ApiBearerAuth('Authorization')
@ApiHeader({ name: 'Authorization', required: true })
@UseGuards(AdminGuard)
@UseGuards(JwtAuthGuard)
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @Get('/stats')
  async getStats(@Response() response): Promise<string> {
    return response.json(await this.adminService.getStats());
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @Get('/users')
  async getUsers(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getUsers(query));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @ApiParam({ name: 'id', type: String })
  @Get('/users/:id')
  async getUserData(
    @Param('id') id: string,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getUserData(id));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @ApiParam({ name: 'id', type: String })
  @Put('/users/:id')
  async updateUserData(
    @Param('id') id: string,
    @Body() user: UserDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.updateUserData(id, user));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User deleted return' })
  @ApiParam({ name: 'id', type: String })
  @Delete('/users/:id')
  async deleteUser(
    @Param('id') id: string,
    @Response() response,
  ): Promise<string> {
    await this.adminService.deleteUser(id);
    return response.json({ message: 'This user has been deleted' });
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @Get('/companies')
  async getCompanies(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getCompanies(query));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @ApiParam({ name: 'id', type: String })
  @Get('/companies/:id')
  async getCompanyData(
    @Param('id') id: string,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getCompanyData(id));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Company deleted return' })
  @ApiParam({ name: 'id', type: String })
  @Delete('/companies/:id')
  async deleteCompany(
    @Param('id') id: string,
    @Response() response,
  ): Promise<string> {
    await this.adminService.deleteCompany(id);
    return response.json({ message: 'This company has been deleted' });
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @Get('/advertisments')
  async getAdvertisments(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getAdvertisments(query));
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @ApiParam({ name: 'slug', type: String })
  @Get('/advertisments/:slug')
  async getAdvertisment(
    @Param('slug') slug: string,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getAdvertismentData(slug));
  }

  /**
   * @param {@Param} id
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Company deleted return' })
  @ApiParam({ name: 'id', type: String })
  @Delete('/advertisments/:id')
  async deleteAdvertisment(
    @Param('id') id: string,
    @Response() response,
  ): Promise<string> {
    await this.adminService.deleteAdvertisment(id);
    return response.json({ message: 'This company has been deleted' });
  }

  /**
   * @param {@Query} query<PaginationDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiOperation({ summary: 'Administrator permission required' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 200, description: 'Admin data return' })
  @Get('/logs')
  async getLogs(
    @Query() query: PaginationDTO,
    @Response() response,
  ): Promise<string> {
    return response.json(await this.adminService.getLogs(query));
  }
}
