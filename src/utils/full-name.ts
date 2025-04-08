export function fullName({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return `${lastName ? capitalize(lastName[0]) + ". " : ""}${firstName ? capitalize(firstName) : "-"}`;
}
