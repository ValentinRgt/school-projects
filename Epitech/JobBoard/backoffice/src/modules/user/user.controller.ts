import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Request,
  Response,
  UseGuards,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import {
  ApiHeader,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  UpdateUserInformationDTO,
  UpdateUserPasswordDTO,
  UpdateUserProfileDTO,
} from './user.dto';
import { UserService } from './user.service';
import { CompanyService } from '../company/company.service';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@ApiHeader({ name: 'Authorization', required: true })
@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}
  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Get('me')
  async me(@Request() req, @Response() response): Promise<string> {
    return response.json(req.user);
  }

  /**
   * @param {@Body} user<UpdateUserInformationDTO>
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Put('me')
  async updataUserInformation(
    @Body() user: UpdateUserInformationDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    await this.userService.updateUserInformation(req.user.id, user);
    return response.json({ message: 'The user information has been updated' });
  }

  /**
   * @param {@Body} user<UpdateUserProfileDTO>
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Put('me/profile')
  async updataUserProfile(
    @Body() user: UpdateUserProfileDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    await this.userService.updateUserProfile(req.user.id, user);
    return response.json({ message: 'The user profile has been updated' });
  }

  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('curriculum', {
      storage: diskStorage({
        destination: './public/static/cv',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Put('me/profile/cv')
  async uploadUserCV(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    await this.userService.updateUserCurriculumVitae(req.user.id, file);
    return response.json({ message: 'The currilum has been upload' });
  }

  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/static/avatar',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Put('me/avatar')
  async updateUserAvatar(
    @UploadedFile() image: Express.Multer.File,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    await this.userService.updateUserAvatar(req.user.id, image);
    return response.json({ message: 'The avatar has been upload' });
  }

  /**
   * @param {@Body} user<UpdateUserPasswordDTO>
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Put('me/password')
  async updateUserPassword(
    @Body() user: UpdateUserPasswordDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    await this.userService.updatePassword(req.user.id, user.password);
    return response.json({ message: 'The password has been updated' });
  }

  /**
   * @param {@Param} companyId<string>
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Put('company/:id/add')
  async setCompanyToUser(
    @Param('id') companyId: string,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    const companyData = await this.companyService.findOneByIdOrSlug(companyId);

    if (companyData === null) {
      return response.status(404).json({ message: 'Company not found' });
    }

    const domainChecker = req.user.email.split('@');
    if (domainChecker[1] !== companyData.website) {
      return response
        .status(400)
        .json({ message: 'You are not allowed to add this company' });
    }

    await this.userService.setCompany(req.user.id, companyData);
    return response.json({
      message: 'The company has been added to this user',
    });
  }

  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User data return' })
  @Delete('me')
  async deleteUser(@Request() req, @Response() response): Promise<string> {
    await this.userService.deleteUser(req.user.id);
    return response.json({ message: 'This user has been deleted' });
  }

  /**
   * @param {@Request} req
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User advertisements return' })
  @Get('advertisments')
  async getAdvertisments(
    @Query() query: PaginationDTO,
    @Request() req,
    @Response() response,
  ): Promise<string> {
    const userAdvertisement = await this.userService.getUserAdvertisments(
      req.user.id,
      req.user.email,
      query.page,
      query.limit,
    );
    return response.json(userAdvertisement);
  }
}
