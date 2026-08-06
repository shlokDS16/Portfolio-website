"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ContactForm({ formspree }: { formspree: string }) {
  const [status, setStatus] = useState<{ msg: string; kind: "" | "ok" | "err" }>({
    msg: "",
    kind: "",
  });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setStatus({ msg: "", kind: "" });

    // Mirror into Supabase so the message lands in the admin inbox.
    // Non-blocking: failures here never break the user-facing send.
    try {
      const supabase = createClient();
      await supabase.from("contact_messages").insert({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        subject: String(fd.get("subject") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
    } catch {
      // ignore
    }

    try {
      const res = await fetch(formspree, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        form.reset();
        setStatus({
          msg: "Message sent. I will get back to you soon.",
          kind: "ok",
        });
      } else {
        setStatus({
          msg: "Something went wrong. Please email me directly.",
          kind: "err",
        });
      }
    } catch {
      setStatus({ msg: "Network error. Please email me directly.", kind: "err" });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="frow">
        <div className="field">
          <label htmlFor="nm">Name</label>
          <input id="nm" name="name" type="text" required placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="em">Email</label>
          <input
            id="em"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="sub">Subject</label>
        <input
          id="sub"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
        />
      </div>
      <div className="field">
        <label htmlFor="msg">Message</label>
        <textarea
          id="msg"
          name="message"
          required
          placeholder="Tell me about it..."
        />
      </div>
      <button className="btn submit magnetic" type="submit" disabled={sending}>
        <span className="fill"></span>
        <span className="t">{sending ? "Sending..." : "Send Message →"}</span>
      </button>
      <div id="fstatus" className={status.kind}>
        {status.msg}
      </div>
    </form>
  );
}
