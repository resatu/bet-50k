import type { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const email = formData.get("email");

  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_URL = process.env.CONVERTKIT_API_URL;

  const res = await fetch(`${API_URL}/forms/${FORM_ID}/subscribe`, {
    method: "post",
    body: JSON.stringify({ email, api_key: API_KEY }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return res.json();
};

export default function Newsletter() {
  const actionData = useActionData();
  const transition = useTransition();
  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main>
      <Form method="post" aria-hidden={state === "success"}>
        <h2>Subscribe!</h2>
        <p>Don't miss out on the latest news!</p>
        <fieldset>
          <input
            aria-label="Email address"
            aria-describedby="error-message"
            ref={inputRef}
            type="email"
            name="email"
            placeholder="your@email.com"
          />
          <button type="submit">
            {state === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>

        <p>{state === "error" ? actionData.message : <>&nbsp;</>}</p>
      </Form>

      <div aria-hidden={state !== "success"}>
        <h2 ref={successRef} tabIndex={-1}>
          You're subscribed!
        </h2>
        <p>Thanks for subscribing to our newsletter!</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  );
}
