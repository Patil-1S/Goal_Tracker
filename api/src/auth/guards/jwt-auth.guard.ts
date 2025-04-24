// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
//   constructor(private readonly reflector: Reflector) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // Check if the route has the @Public() decorator
//     const isPublic = this.reflector.get<boolean>(
//       'isPublic',
//       context.getHandler(),
//     );
//     if (isPublic) {
//       return true;
//     }

//     // Proceed with normal authentication
//     return (await super.canActivate(context)) as boolean;
//   }
// }

// // Helper function for testing
// export const createJwtAuthGuard = () => {
//   return new JwtAuthGuard(new Reflector());
// };

// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
