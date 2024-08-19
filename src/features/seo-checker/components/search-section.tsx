import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchSection({
  inputValue,
  handleOnchange,
  handleSearch,
}: {
  inputValue: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Type URL"
        value={inputValue}
        onChange={handleOnchange}
      />
      <Button onClick={handleSearch} className="w-20">
        Submit
      </Button>
    </div>
  );
}
