import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  loginPage(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) return res.redirect('/dashboard');
    const flash = (req as any).flash?.('error') ?? [];
    return res.render('login', { error: flash[0], layout: false });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    return res.redirect('/dashboard');
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => res.redirect('/auth/login'));
  }
}
