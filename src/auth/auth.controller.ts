import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
    version: '1',
    path: 'auth'
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // localhost:3000/api/v1/auth/login
    @Post('login')
    @HttpCode(200)
    login(@Body() body: AuthDto) {
        return this.authService.login(body.email, body.password);
    }

    // localhost:3000/api/v1/auth/profile
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: any) {
      return req.user;
    }
}
