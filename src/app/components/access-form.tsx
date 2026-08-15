import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function AccessForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-primary/40 bg-primary/5 px-6 py-4">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <p className="font-mono text-sm tracking-wide text-foreground">
          CLEARANCE PENDING — check your inbox, operative.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="group flex w-full max-w-md items-center rounded-full border border-border bg-input pl-6 pr-1.5 py-1.5 transition-colors focus-within:border-primary/60"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="operative@domain.com"
        className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
      >
        REQUEST ACCESS
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
