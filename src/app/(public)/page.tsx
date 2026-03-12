"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Pagina de apresentação</p>

      <Link href={'/login'} style={{ background: 'var(--gray-300)' }}>Login</Link>
    </div>
  );
}
