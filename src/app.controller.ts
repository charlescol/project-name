import { Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/users.entity';

@ApiHeader({
  name: 'Bearer',
  description: 'User Access Token',
})
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  /* Function to login user
     Input : createUserDTO : user to add
     Ouput : (HTTP 201 CREATED)
  */
  @ApiOperation({ summary: 'Get access token from user already registered.' })
  @ApiResponse({
    status: 200,
    description: 'access_token',
    type: String,
  })

  @UseGuards(AuthGuard('local'))
  @Put('login')
  async login(@Request() req) {
    return this.authService.loginWithCredentialsAsync(req.user);;
  }

  /* Function to get infos about user
   Input : createUserDTO : user to get infos
   Ouput : (HTTP 201 CREATED)
*/
  @ApiOperation({ summary: 'Get main infos about an user.' })
  @ApiResponse({
    status: 200,
    description: 'User',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req) {
    return req.user
  }
}
