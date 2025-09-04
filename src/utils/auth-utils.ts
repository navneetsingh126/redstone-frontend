// ----------------------------------------------------------------------

/**
 * Check if a token exists and is not expired
 * Note: This is a basic check, the server will validate the token
 */
export function hasValidToken(): boolean {
  const token = localStorage.getItem('access_token');
  return !!token;
}

/**
 * Get the current user from localStorage (if available)
 * This is useful for initial state before the auth context loads
 */
export function getStoredUser() {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

/**
 * Store user data in localStorage for persistence across reloads
 */
export function storeUser(user: any) {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
}

/**
 * Clear all authentication data from localStorage
 */
export function clearAuthData() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

/**
 * Check if the current path requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const publicRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/404'];
  return !publicRoutes.includes(pathname);
}
