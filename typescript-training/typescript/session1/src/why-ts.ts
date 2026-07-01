type User = { fullName: string };

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase(); 
}