import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

export interface AuthenticatedUser {
    id: string;
    email: string;
    isVerified: boolean;
}

/**
 * GetUser decorator can extract the entire user object from the request,
 * or a specific property if a key is provided.
 */
export const GetUser = createParamDecorator(
    (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext): AuthenticatedUser | any => {
        const request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.user ? request.user[data] : null;
        }
        return request.user;
    },
);
