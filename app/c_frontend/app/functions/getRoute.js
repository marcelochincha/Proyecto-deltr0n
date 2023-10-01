// import React from 'react'
// 'use client'
// import { useRouter } from 'next/router';
//
// export default function getRoute() {
//   // Calling useRouter() hook
//   const router = useRouter()
//   return router.pathname
// }
import { headers } from 'next/headers';

export default function getRoute() {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  return (fullUrl.split('/').at(-1))
}
