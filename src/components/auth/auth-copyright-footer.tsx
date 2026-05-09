export function AuthCopyrightFooter() {
  const year = new Date().getFullYear();
  return (
    <p className="mt-10 text-center text-xs text-zinc-500">
      © {year} Uptrix Inc. All rights reserved.
    </p>
  );
}
