import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from './shared/shared.service.ts/shared.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(SharedService);
  return service.isAdminLogged ? true : router.navigate(['/login']);
};
