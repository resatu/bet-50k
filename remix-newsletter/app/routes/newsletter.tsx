import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (typeof email !== "string") {
    return { status: 400, json: { error: "Email is required" } };
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const FORM_ID = process.env.MAILCHIMP_FORM_ID;
  const API = `https://${process.env.MAILCHIMP_API_KEY}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_FORM_ID}/members`;

  const res = await fetch(`${API}/forms/${FORM_ID}/subscribe`, {
    method: "POST",
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export default function Newsletter(): JSX.Element {
  const actionData = useActionData();

  return (
    <main>
      <Form method="post">
        <h1>Subscribe now</h1>
        <p>Don't miss any of the action!</p>
        <fieldset>
          <label htmlFor="email" placeholder="your@email.com">
            Email
          </label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Sign me up!</button>
        </fieldset>
        <p>
          {actionData?.error ? actionData.message : "Thanks for subscribing!"}
        </p>
      </Form>
    </main>
  );
}
