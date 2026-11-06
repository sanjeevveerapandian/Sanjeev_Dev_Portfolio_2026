"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { EMAIL, GITHUB_URL, LEETCODE_URL, LINKEDIN_URL, LIVE_SITE_URL, OSS_REPO_URL, RESUME_URL } from "@/lib/constants";

type Line = { id: number; node: ReactNode };

const SECTIONS = ["about", "experience", "projects", "skills", "contact"];
const QUICK = ["whoami", "projects", "contact", "resume"];

const A = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

/** A small working shell under the git log. Only mounts with JS, so there is never a dead input. */
export function TerminalPrompt() {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const id = useRef(0);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const outRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  useEffect(() => setReady(true), []);
  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  if (!ready) return null;

  const push = (...nodes: ReactNode[]) =>
    setLines((prev) => [...prev, ...nodes.map((node) => ({ id: id.current++, node }))].slice(-40));

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    history.current.unshift(input);
    cursor.current = -1;
    const [cmd, ...args] = input.toLowerCase().split(/\s+/);
    const echo = <span className="t-echo"><span className="p">$</span> {input}</span>;

    switch (cmd) {
      case "help":
        push(echo, "whoami  now  projects  stack  oss  contact  resume  theme  goto <section>  clear");
        break;
      case "projects":
        push(
          echo,
          "ParkEase            shipped, Aug 2026",
          <>MSS Chennai         live, {A(LIVE_SITE_URL, "msschennai.in")}</>,
          "Medical thesis      PKEST, fuzzy logic, FastAPI",
          "Traffic preemption  Flutter, ESP32, LoRa mesh",
          "PrepWise            Next.js, Firebase, Vapi AI",
          "MedRush             Pitchathon finalist",
        );
        break;
      case "whoami":
        push(echo, "Sanjeev Veerapandian, full-stack engineer in Chennai.", "B.E. Computer Science, Anna University, 2026.", "Open to SDE-1 and Full-Stack roles.");
        break;
      case "now":
        push(echo, "Building a stock exchange matching engine in Java, phase by phase, with tests.");
        break;
      case "stack":
        push(echo, "React / Next.js, Node.js / Express, ASP.NET Core, SQL Server", "also: C#, Java, TypeScript, Python, MongoDB, Docker, Azure");
        break;
      case "oss":
        push(
          echo,
          <>2 PRs merged in {A(OSS_REPO_URL, "EventSapiens")}</>,
          <>{A(`${OSS_REPO_URL}/pull/40`, "#40")} redeploy after the archive workflow commits to main</>,
          <>{A(`${OSS_REPO_URL}/pull/42`, "#42")} stop validate and build from archiving event files</>,
        );
        break;
      case "contact":
        push(echo, <>email     <a href={`mailto:${EMAIL}`}>{EMAIL}</a></>, <>linkedin  {A(LINKEDIN_URL, "sanjeev-veerapandian")}</>, <>github    {A(GITHUB_URL, "sanjeevveerapandian")}</>, <>leetcode  {A(LEETCODE_URL, "sanjeevveerapandian")}</>);
        break;
      case "resume":
        push(echo, <>Resume: <Link href="/resume">read it here</Link> or {A(RESUME_URL, "open the PDF")}</>);
        break;
      case "theme": {
        const next = args[0] === "light" || args[0] === "dark" ? args[0] : document.documentElement.classList.contains("dark") ? "light" : "dark";
        setTheme(next);
        push(echo, `theme set to ${next}`);
        break;
      }
      case "goto": {
        const target = args[0];
        if (target && SECTIONS.includes(target)) {
          push(echo, `scrolling to ${target}`);
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        } else {
          push(echo, `usage: goto ${SECTIONS.join(" | ")}`);
        }
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "sudo":
        push(echo, "nice try. this is a read-only portfolio.");
        break;
      default:
        push(echo, `command not found: ${cmd}. Try help.`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.current.length) {
      e.preventDefault();
      cursor.current = Math.min(cursor.current + 1, history.current.length - 1);
      setValue(history.current[cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? "" : history.current[cursor.current]);
    }
  };

  return (
    <div className="t-shell">
      <div ref={outRef} className="t-out" aria-live="polite">
        {lines.map((l) => <p key={l.id} className="t-line">{l.node}</p>)}
      </div>
      <form
        className="t-form"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
      >
        <label htmlFor="term-input" className="p">$</label>
        <input
          id="term-input"
          className="t-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command"
        />
      </form>
      <div className="t-quick" role="group" aria-label="Quick commands">
        {QUICK.map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}
