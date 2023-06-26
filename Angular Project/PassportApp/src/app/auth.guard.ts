import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from './shared/shared.service.ts/shared.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(SharedService);
  return service.isLoggedIn ? true : router.navigate(['/login']);
};
