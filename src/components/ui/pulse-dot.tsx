export function PulseDot() {
  return (
    <span aria-hidden="true" className="relative flex size-2.5 items-center justify-center">
      <span className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-success" />
    </span>
  );
}
