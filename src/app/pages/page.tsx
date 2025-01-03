import { Characters } from "../../components/Characters";
import PasswordGenerator from "@/src/components/PasswordGenerator";

export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PasswordGenerator />
      <Characters />
    </div>
  );
}
