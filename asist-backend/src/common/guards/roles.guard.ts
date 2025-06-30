import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Extraer los roles permitidos definidos por el decorador @Roles(...)
        const requiredRoles = this.reflector.get<number[]>('roles', context.getHandler());
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; 
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user?.idrole) {
            throw new ForbiddenException('Rol no definido en el token.');
        }

        if (!requiredRoles.includes(user.idrole)) {
            throw new ForbiddenException('No tienes permiso para acceder a este recurso.');
        }

        return true;
    }
}