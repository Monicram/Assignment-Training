function getUserLabel(user) {
  return user.fullNme.toUpperCase();
}

const user = { fullName: "Alice Smith" };
console.log(getUserLabel(user));

//