export function getRoleUrl(role) {
  switch (role) {
    case 0:
      return '/user';
    case 1:
      return '/editor';
    case 2:
      return '/admin';
    default:
      return;
  }
}
