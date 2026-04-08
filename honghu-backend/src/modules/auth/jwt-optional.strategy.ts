import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

const jwtFromRequest = (req: any) => {
  const authHeader = req?.headers?.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

@Injectable()
export class JwtStrategyOptional extends PassportStrategy(Strategy, 'jwt-optional') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-key',
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      return null;
    }
    
    const user = await this.authService.validateUser(payload.sub);
    
    if (!user) {
      return null;
    }

    const userRoles = user.userRoles?.map((r: any) => r.role) || [];
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      currentRole: user.currentRole,
      primaryRole: user.primaryRole,
      roles: userRoles,
      userRoles: user.userRoles || [],
    };
  }
}