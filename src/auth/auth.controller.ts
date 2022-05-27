import {
  Controller,
  Request,
  Post,
  //UseGuards
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiTags('Authentication')
  async login(@Request() req) {
    return req.user;
  }

  @Post('password/request')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiTags('Authentication')
  async passwordRequest(@Request() req) {
    return req.user;
  }

  @Post('password/reset')
  @ApiOperation({ summary: 'Reset password' })
  @ApiTags('Authentication')
  async passwordReset(@Request() req) {
    return req.user;
  }
}
