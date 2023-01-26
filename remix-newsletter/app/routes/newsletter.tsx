import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_URL = "https://api.convertkit.com/v3";

  const res = await fetch(`${API_URL}/forms/${FORM_ID}/subscribe`, {
    method: "POST",
    body: JSON.stringify({
      api_key: API_KEY,
      email: email,
    }),
    headers: {
      "Content-Type": "application/json charset=utf-8",
    },
  });

  return res.json();
};

export default function Newsletter() {
  return (
    <main>
      <h1>Newsletter</h1>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
        />
        <button type="submit">Subscribe</button>
      </Form>
    </main>
  );
}
