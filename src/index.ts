type User = {
  id: number;
  name: string;
};

function processAny(person: any): string {
  return person.name;
}
const result1 = processAny({ id: 1, name: "hong" });
const result2 = processAny({ id: 2 });

function processUnknown(person: unknown): string | null {
  if (typeof person === "object" && person !== null && "name" in person) {
    return (person as User).name;
  }
  return null;
}
const result3 = processUnknown({ id: 1, name: "hong" });
const result4 = processUnknown({ id: 2 });
