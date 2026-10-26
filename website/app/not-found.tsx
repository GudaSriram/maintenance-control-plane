import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>Let’s get you back on track.</h1>
      <p>This page doesn’t exist, or its address has changed.</p>
      <Button href="/">Back to home</Button>
    </div>
  );
}
