interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  let result = `Name: ${profile.displayName}\n`;
  result += `Bio: ${profile.bio ?? "No bio provided"}\n`;
  if (profile.website) {
    result += `Website: ${profile.website}`;
  }
  return result;
}

// 1.

const profile1: Profile = {
  displayName: "Monica",
  bio: "Aspiring AI Engineer",
  website: "https://monica.dev",
  avatarUrl: "https://monica.dev/avatar.jpg"
};

// 2.
console.log(renderProfile(profile1));

// 3.
const profile2: Profile = {
  displayName: "John"
};

console.log(renderProfile(profile2));



// console.log(profile2.bio.toUpperCase());

// Error: 'profile2.bio' is possibly 'undefined'

// bio is optional, so it may be undefined.
// TypeScript prevents calling toUpperCase() on a possibly undefined value.

// correct way
console.log(profile2.bio?.toUpperCase());
