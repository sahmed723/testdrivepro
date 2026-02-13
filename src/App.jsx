import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const LOGO_B64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAlz0lEQVR42u18d3xdxZX/mbnl9f5UXpH0VKwuS5ZkW5YsF1lWl3slG5aQBEhgKQmQUPIjCWXZkEASIPQSEgIbwNRAwBhjcMHdVrN67+31esv8/riSkGVTQ/a3v/3s/bw/3rtz7tz5zjlz5rR5AP97/c++0H/lmxC62OsIECDkfwBgCaH0AuFLIMIIIQACQMg/ET/6Z/SIEQJAAiEAn45cRbNGltUyjIpiaAojQLwoevmIh4s4uYif4+Z3QiEEAOI/Afk3CVhi0RwzlQyTqTEUGoxZOlOKUmOWyRQ0RQECABEIIIQAIUJEEAO8OBkJdwc8Te7pk87pFq/LF4nMIScA4jcHHH1zUJFARADQMOyaqJhKS9wyfbSWoV1cuMvvbfN6urzewZB/Mhz0chwnEgBgKKSh2SiZ3KpQJqk1GWpdslpjZOQuIXJieuLvIwP7J8e9kTDMiMw3Axt9IwtVGkqaRv+t+ORqq11N0c1u597xoYMT480e13zBBkAKTGOMgIBAhJAoLmjN1OpXRsWsi7Hmag1+Qfjb6OALfV3nPE4J9j++vP8hwBRGgkgAIFNruDolozLGOhwKvjLU9+pgb3/AJ9GkaHT5BlOO1pis0sbIWBXDyhCF8Iwm40XBx/FjkWC3z9vgcZ5xTrd73dIU2JWqzTbHNnuCTa56b2z84a6WZrdTEnLhH0CNvj5jAYlAouSKHy3K3hmX2OF1P9LT9vpgHwECCK+Oiq2PtS8zRcfIZUFBGAwEegP+/qBvMhh085EwIQiARUhDy6Ll8gSFKkGtjpMr5RQ9Hg4dnx5/Y2Tow4kRICIA2mCL/2FSeqpG99Jg3/3tjWOhAJaU+X8Z4Lk53mZLui0rNyIID3Q0vdjfDQCxcuW/JCRvsjliWXmHz3NgcvTg1HirxzkZDn1ht2ZWnq7VF5tj1phjUzXasXDg1aH+5/u7RoIBANgWl3hjarYCM79sPf3KQA8A0AjzRPynA6YR4gnRMbK7sgs2WRP+2Ndxb1ujjwtHy5VXJafvsjvCPHltpG/PcF+LyyWAMP9ZhqKUmFHSmMEUAeAEISiIAYHjxPPIKECZesNma8Ima4KCxi8N9j3SdW4kGFDTzE1pOZcnprwxPHxb83FXOPw1MKOviBbzRMzU6h8pWKmi6B83HD0wPgKArkxO/7fkzIjIPdbT8fJAz1TkU37aFepcgzFfb8zQGGwKlYahWUxRGBMgokA4Ini4yGAo0O5xH3dNNbmc/QHv3LNGVr7V7rgyaZGCYh7qPPdIVysAWRVl+XXusoggXHXqcJN7+qsuafRV0ZbFWB9bsuKky3ntmSPjoWCmznBvTmG21vh4d+tj3a3OSFgitihV1dG2amtctlYvEtLj95a43a0+z3DQ5+QiEUEEABZjPcvaFOo0tTZDp0tWaSiEW7zut0b63xkdHAn4pa4MrOzKxLQrkjKaPdO3Np1qdE+ZZfLf561YajRdderwvrFhSei+YcBSpxutCQ/lr3ihv/enjcdFQi5JSLkzM6/J47ml6USLe1qiTNfqv+dIrbTECyJ3aGr8lcGBk+4JUYRomdyhVNqVajMrk1E0AIQFYZILDfr5vcHAWChII8jWGjZa4yhi7TSF3xkZfLqnvcXjlLrN0BruzSnM0el/1nz6+b5OhNDdOQXfjk/+t9NHXhvq/fKY0Zfn7QZrwqP5RQ92t/17yxkEcEdW/hVJaQ91tP6q/SwvigBgUahuSMnaanf0BbzP9na+PTo4GQ4WGqOuTc7K0esVNB0WRDcX8XBcSOABiJyitTSjZVkFRfl5rsXjfm9seO/YkJuLbLTEfS851aHU7BnqfaCjZTjgBwAG4xtSs69flPlEd+fPW04SQn6alnvNouxrTh/6Spi/WCcDwNpoS3/9zlsy8gBAhqk/5K/sq925wZYwR7YrLrmxYvPBsvod9iQKY+nmt+JTBut2Pbts1c645CytQceyC6YYAdKxbKZOvzM+6cElxcfXbeyq3vVYwUodK0MA2+2OQ2vrmys2705ImXukzprQW7Pz0YJSOUUDwE/ScwfrdpdF2yTG/KOmlIQ2XaPvqNr6q5xlEtqnCld1Vm1bboqeVS2yRwtK+2t33JqRq6YZCQaFkIZmTpRv/llm3kXkCgFCFxmakmbWxdo+Wlt7YE2dnpVJd36Snttft/OJwpVmVi7hWWqKaq/a/szSUgVFAcA9OYUdNduydAYAmLFpvqZ1gQAh0DKyA2vrXigqYzCmEH44v6Szalu+3izRpGr0H62tPVZeX2SMmZF/PGNJZWr1LVXbMrR6BMBiSnIt0EUMGMAI0RhRs96ynpU1rt/yr45UCiHJil5mjP5kXd3HZXXpGr1Es0Rvaq/a/kjBSgphGuM/L195aG29npWhi/vc88z+z21DhMBd2QUqir7uzBFOFG/JyK232C85/tEp1yQALDGaXy0uGwuFaj/e+8n0GIUQAuBFQoAAACeKhIhKiiYAPBElX48sdP5BcoZ4kQiEMAgDgJKiMYWCgiAQggFRCB2bHq89+P5IwP9q8foCYxQAnHZN/cvxA7Wxtp9lLOFF8YYzRxgK35O9lBCCEfr6wrzZljhUt3tlVCwA7IhLGqnfPbdu8/Tm9uptTy0tVVAMADAYLdCECoo+Vr7x8sQ0AJhb1Z8tTYhGGABsCtWBNbV/K61U0+ycREgiQ2P8WP7Kjuod+cYo6al6a8Jw/e6dcUkAUGyOGazbtdWe+HUEWxJms1zeULHll1mFkifUWb399owlMy6BWtdUueXJgtLPcRgB4MH84j3F62ZDAp/rXSIMACtNMafXb3q7tMIqVy3YQjBCCAFG6LGClS2VWxepdVL7rel5XTVb07UGAPg/mfmNFVui5AoEXxGxNL57cgqPrduoZWUMwq8Ur3u7tJLBFEZIy7AH1ta+XLwOANbH2u7PW/7dxFSWouavH0lAVphieqp3SUJIXQwzmr1PYXxDWvZA7a6HlhQrGQYumCMEwGBMYyynqJeLyz5aW2dgZRgQi/GbpetfLylnMNYw7NGy+nsXL4UvmuKLoE3X6Lurd2yNcwDAvzpSe2t2ZesMEsHDS0pOrN+oYZi7sgv7a3e9Uryuo2rH/XkrEDoPFUYIEPrrirUvLF97IWA0706u3vTmyvWd1dsvTUidP4YFQ5pvcp4s3/BIQYkkAxlaQ0/NzssdqdeeObJnsJdGSIAvtXi/0iEPxBNSHmN/NL/ok+nJH535ZDwcsipUv8jKr4qxvzrc80B7c49/5kyKimZKo2LrYuOWmcxamnVzkb5AoC/gGwn5nOFISBQAQI5pA8taFUqHUm1XKo2s3MtFPnFOvDncf3ByzDd73tSh0ly/KHOLLWnv+MAdzWcGAz6zTP7rvOWlxpirTh/eOzr4TznkMR9zjt74WH4xjakfnTl6cHIUADbYEm5Ky4mWyV4c6H2ut0MKGs7JeZpau9hgzFIb4pUqIytT0rQkfhwRAzznjET6Ar5zXtdZ13S71+vlPk3HJqm0lzpSdsc5JiOR+9qaXhvqBYASU+z9uQUCUFeeOtTomqIxEr7KicSveVDLyMruyV5aY7E92dNxf0ezjwsrafpfEhZ9NyHFyMg/mBp5aaD36NSElw9fYGZSMgpLGSaeiBGBCERYQKOmmWWmqB32xLIoi4uLPN3b+af+dj/Hq2nmhtSs7yelvT06dFvD8alImMaIF7+alvoaFgmi0EwEb0dc0u0ZeX4+8pv25pcHewBASdMbbY6d9sQsrX4qEj42NXFgarTRNT0Q9Ad5/nM6VdCMXa5YbDCWmmKLjNEmVnbO53xxoOf1oX4/z0llsj9Oz9bRzN0tDS8OdMHXPXX59Q9bAiACJEah/HFq9jZb4jmv87Gu1jdHBiTxStcZq2Osq8yWFLWGQWiai4wEAwOh4EQo6OHDYZEAEBnGWpqNlimsCpVVqTDRLEfEzoDn4PjY38eGm93Tkn1Sa4m/KiktU6t/baj3vvamkWAAXSQr+E8GPKu6sVSMl6M3XZOcUR5t6Qv69gz2vT7SP+CfOU5rkikydLoctSFZo7Ur5DpWrsAMjQEAeBGCAueOhIdCwS6fp9HrPOd2zR3LtCtV9db47bakBKXqg4nhBzvPNbimpFJyQRS/9pi/yQPTmTrDt+OSKy12OYXPOp37xkcPT422LDww/QVXhta4why9Ljq2QGcMiOTd0aE/93dK3P5/f2B6gccrwdazsrVRlupYe77RpKboqUiky+tp9Xu6fe6hQGCaC/p4kRMJIYSlsJqmjKzcplAmqbTpGl2iWhvFsj6eP+maemd06MDYsJP7b3YkfuFZjXlpRB3DZmj1hQZzts6QrNQaZXI5hRAQACSVTCAKASBCxLAoToVDvX5fo9t5wjXZ7HF6Zv/04BuE+s0DPr+MnQjkPM2iZWQGhtUxjIqmMGAAEIAEeN7DR6YjnIcLXzTb/N/6by0uLGSScn5f8n8p/n/945LPV28LXklm46//ZX9N87/X//Tr/wKZ7A5WzUV8dAAAAABJRU5ErkJggg==";

// ═══ SVG ICONS ═══
const I = {
  car: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17h14v-5l-2-5H7l-2 5v5z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
      <path d="M5 12h14" />
    </svg>
  ),
  clock: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  check: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  shield: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4z" />
    </svg>
  ),
  pen: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  chart: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  ),
  send: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  users: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  user: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  tag: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <circle cx="7" cy="7" r="1" />
    </svg>
  ),
  home: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    </svg>
  ),
  plus: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  cal: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  trend: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  ),
  mail: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  ),
  alert: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  dollar: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  x: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  cam: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  grid: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  arrow: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  dot: (c = "#22c55e", s = 8) => (
    <svg width={s} height={s}>
      <circle cx={s / 2} cy={s / 2} r={s / 2} fill={c} />
    </svg>
  ),
  link: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  hourglass: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2h12M6 22h12M6 2v6l6 4-6 4v6M18 2v6l-6 4 6 4v6" />
    </svg>
  ),
  arrowUp: (c = "#22c55e", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  ),
  arrowDown: (c = "#ef4444", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  ),
  report: (c = "#333", s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
};

// ═══ INVENTORY ═══
const INVENTORY = [
  {
    id: 1,
    year: 2015,
    make: "Acura",
    model: "ILX",
    trim: "4dr Sedan 2.0L",
    price: 11997,
    miles: 110665,
    vin: "19VDE1F32FE008412",
    stock: "FE008412",
    color: "Silver Moon Metallic",
    engine: "2.0L 4 Cyl",
    img: "https://cdn.ebizautos.media/used-2015-acura-ilx-4drsedan20l-14370-22972601-1-400.jpg",
    status: "available",
    daysOnLot: 92,
  },
  {
    id: 2,
    year: 2015,
    make: "Audi",
    model: "A3",
    trim: "1.8T Premium FWD",
    price: 8497,
    miles: 126143,
    vin: "WAUACGFF5F1001788",
    stock: "F1001788",
    color: "Glacier White Metallic",
    engine: "1.8L 4 Cyl",
    img: "https://cdn.ebizautos.media/used-2015-audi-a3-4drsedanfwd18tpremium-14370-22961399-1-400.jpg",
    status: "available",
    daysOnLot: 118,
  },
  {
    id: 3,
    year: 2017,
    make: "Audi",
    model: "A4",
    trim: "Premium Plus quattro",
    price: 15997,
    miles: 82158,
    vin: "WAUENAF41HN068262",
    stock: "HN068262",
    color: "Moonlight Blue",
    engine: "2.0L 4 Cyl",
    img: "https://cdn.ebizautos.media/used-2017-audi-a4-20tfsiautomaticpremiumplusquattroawd-14370-22958420-1-400.jpg",
    status: "available",
    daysOnLot: 45,
  },
  {
    id: 4,
    year: 2017,
    make: "Audi",
    model: "A4",
    trim: "Premium quattro AWD",
    price: 18997,
    miles: 24763,
    vin: "WAUANAF46HN022571",
    stock: "HN022571",
    color: "Scuba Blue Metallic",
    engine: "2.0L 4 Cyl",
    img: "https://cdn.ebizautos.media/used-2017-audi-a4-20tfsiautomaticpremiumquattroawd-14370-22873107-1-400.jpg",
    status: "available",
    daysOnLot: 12,
  },
  {
    id: 5,
    year: 2008,
    make: "Audi",
    model: "A4",
    trim: "2.0T Avant quattro",
    price: 5997,
    miles: 145867,
    vin: "WAUKF78EX8A042100",
    stock: "8A042100",
    color: "Brilliant Black",
    engine: "2.0L 4 Cyl",
    img: "https://cdn.ebizautos.media/used-2008-audi-a4-20tavantquattro-14370-22930213-1-400.jpg",
    status: "available",
    daysOnLot: 156,
  },
  {
    id: 6,
    year: 2013,
    make: "Audi",
    model: "A7",
    trim: "3.0 Premium Plus",
    price: 15997,
    miles: 87054,
    vin: "WAUYGAFC4DN057989",
    stock: "DN057989",
    color: "Moonlight Blue",
    engine: "3.0L V6",
    img: "https://cdn.ebizautos.media/used-2013-audi-a7-4drhatchbackquattro30premiumplus-14370-22927573-1-400.jpg",
    status: "available",
    daysOnLot: 78,
  },
  {
    id: 7,
    year: 2023,
    make: "Ford",
    model: "Bronco",
    trim: "Black Diamond 4x4",
    price: 40997,
    miles: 18200,
    vin: "1FMDE5CP3PLA96073",
    stock: "PLA96073",
    color: "Cactus Gray",
    engine: "2.3L Turbo",
    img: null,
    status: "available",
    daysOnLot: 22,
  },
  {
    id: 8,
    year: 2023,
    make: "Porsche",
    model: "Cayenne",
    trim: "Turbo",
    price: 75997,
    miles: 9100,
    vin: "WP1AF2AY2PDA20481",
    stock: "PDA20481",
    color: "Carrara White",
    engine: "4.0L V8 TT",
    img: null,
    status: "available",
    daysOnLot: 8,
  },
  {
    id: 9,
    year: 2023,
    make: "Land Rover",
    model: "Range Rover",
    trim: "Autobiography SWB",
    price: 107997,
    miles: 12400,
    vin: "SALK19E71PA088506",
    stock: "PA088506",
    color: "Santorini Black",
    engine: "4.4L V8 TT",
    img: null,
    status: "available",
    daysOnLot: 34,
  },
  {
    id: 10,
    year: 2019,
    make: "BMW",
    model: "8 Series",
    trim: "M850i xDrive",
    price: 42997,
    miles: 34500,
    vin: "WBABC4C5XKBJ35568",
    stock: "KBJ35568",
    color: "Barcelona Blue",
    engine: "4.4L V8 TT",
    img: null,
    status: "available",
    daysOnLot: 67,
  },
  {
    id: 11,
    year: 2018,
    make: "Lamborghini",
    model: "Huracan",
    trim: "LP 580-2",
    price: 185997,
    miles: 22100,
    vin: "ZHWUC2ZF7JLA09526",
    stock: "JLA09526",
    color: "Giallo Majo",
    engine: "5.2L V10",
    img: null,
    status: "available",
    daysOnLot: 41,
  },
  {
    id: 12,
    year: 2022,
    make: "Honda",
    model: "Accord Hybrid",
    trim: "Sport",
    price: 17997,
    miles: 28700,
    vin: "1HGCV3F20NA001483",
    stock: "NA001483",
    color: "Platinum White",
    engine: "2.0L Hybrid",
    img: null,
    status: "available",
    daysOnLot: 5,
  },
  {
    id: 13,
    year: 2020,
    make: "Chevrolet",
    model: "Malibu",
    trim: "LT Sunroof",
    price: 10997,
    miles: 52000,
    vin: "1G1ZD5ST6LF091057",
    stock: "LF091057",
    color: "Shadow Gray",
    engine: "1.5L Turbo",
    img: null,
    status: "available",
    daysOnLot: 103,
  },
  {
    id: 14,
    year: 2017,
    make: "Ram",
    model: "1500",
    trim: "Big Horn 4x4",
    price: 15997,
    miles: 68400,
    vin: "1C6RR7LT5HS844246",
    stock: "HS844246",
    color: "Bright White",
    engine: "5.7L V8 HEMI",
    img: null,
    status: "available",
    daysOnLot: 88,
  },
];

const USERS = {
  admin: {
    email: "bilal@magnetismmotors.com",
    password: "admin123",
    name: "Bilal Ahmed",
    role: "admin",
    initials: "BA",
  },
  manager: {
    email: "mike@magnetismmotors.com",
    password: "manager123",
    name: "Mike Graham",
    role: "manager",
    initials: "MG",
  },
  sales: {
    email: "shafay@magnetismmotors.com",
    password: "sales123",
    name: "Shafay Ahmed",
    role: "salesperson",
    initials: "SA",
  },
};
const SP = [
  { id: 1, name: "Shafay Ahmed", initials: "SA", active: true },
  { id: 2, name: "Sarah Chen", initials: "SC", active: true },
  { id: 3, name: "Devon Williams", initials: "DW", active: true },
  { id: 4, name: "Aaliyah Patel", initials: "AP", active: false },
];

// ═══ COMMISSION STRUCTURE ═══
const COMMISSION_TIERS = [
  { min: 0, max: 4, rate: 0.2, label: "0–4 cars", bonus: 0 },
  { min: 5, max: 9, rate: 0.22, label: "5–9 cars", bonus: 250 },
  { min: 10, max: 14, rate: 0.25, label: "10–14 cars", bonus: 500 },
  { min: 15, max: 999, rate: 0.3, label: "15+ cars", bonus: 1000 },
];
const getCommTier = (sold) =>
  COMMISSION_TIERS.find((t) => sold >= t.min && sold <= t.max) ||
  COMMISSION_TIERS[0];
const AVG_GROSS_PER_CAR = 2800;

function genHistory() {
  const names = [
    "James Mitchell",
    "Linda Tran",
    "Robert Garcia",
    "Patricia Okafor",
    "David Kim",
    "Angela Thompson",
    "Marcus Johnson",
    "Yuki Tanaka",
    "Elena Rodriguez",
    "Samuel Osei",
    "Priya Sharma",
    "Carlos Mendez",
    "Naomi Wells",
    "Brian Foster",
    "Diana Park",
    "Victor Huang",
    "Rachel Adams",
    "Omar Hassan",
    "Tiffany Cole",
    "Anthony Reeves",
    "Maria Lopez",
    "Kevin Nguyen",
    "Jasmine Taylor",
    "Derek Stone",
    "Alicia Brown",
    "Nathan Scott",
    "Brianna White",
    "Isaiah Moore",
  ];
  const phones = names.map(
    (_, i) =>
      `(${["404", "678", "770"][i % 3]}) 555-${String(100 + i).padStart(4, "0")}`,
  );
  const drives = [];
  let id = 1;
  for (let d = 60; d >= 0; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const ds = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const count = d === 0 ? 3 : Math.floor(Math.random() * 4) + 1;
    for (let j = 0; j < count; j++) {
      const ni = (id - 1) % names.length,
        vi = (id * 7) % INVENTORY.length,
        si = (id % 4) + 1;
      const sp = SP.find((s) => s.id === si) || SP[0],
        v = INVENTORY[vi];
      const hr = 9 + Math.floor(Math.random() * 7),
        mn = Math.floor(Math.random() * 4) * 15;
      const timeIn = `${hr > 12 ? hr - 12 : hr}:${String(mn).padStart(2, "0")} ${hr >= 12 ? "PM" : "AM"}`;
      const isActive = d === 0 && j >= count - 2;
      const outMn = mn + 20 + Math.floor(Math.random() * 25);
      const timeOut = isActive
        ? null
        : `${hr > 12 ? hr - 12 : hr}:${String(outMn % 60).padStart(2, "0")} ${hr >= 12 ? "PM" : "AM"}`;
      const outcome = isActive
        ? null
        : Math.random() > 0.78
          ? "sold"
          : Math.random() > 0.3
            ? "not_sold"
            : null;
      const startTs = isActive
        ? Date.now() - Math.floor(Math.random() * 45 + 5) * 60000
        : null;
      drives.push({
        id: id++,
        customer: names[ni],
        phone: phones[ni],
        vehicle: `${v.year} ${v.make} ${v.model}`,
        vehicleId: v.id,
        salesperson: sp.name,
        salesId: sp.id,
        timeIn,
        timeOut,
        date: ds,
        status: isActive ? "active" : "completed",
        idVerified: true,
        adfSent: Math.random() > 0.08,
        signed: true,
        signedAt: ds,
        outcome,
        startTimestamp: startTs,
      });
    }
  }
  return drives;
}

const fmt = (p) => (p ? "$" + p.toLocaleString() : "Call");
const dolAge = (d) =>
  d >= 90 ? C.red : d >= 60 ? "#f59e0b" : d >= 30 ? C.accent : C.green;
const dolLabel = (d) =>
  d >= 90 ? "Critical" : d >= 60 ? "Aging" : d >= 30 ? "Watch" : "Fresh";

// ═══ WHITE THEME ═══
const C = {
  bg: "#ffffff",
  surface: "#f8f9fb",
  surfaceLight: "#f1f3f5",
  border: "rgba(0,0,0,0.08)",
  borderLight: "rgba(0,0,0,0.12)",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textDim: "#9ca3af",
  accent: "#c94050",
  accentHover: "#b3384a",
  accentLight: "#fde8eb",
  green: "#16a34a",
  red: "#ef4444",
  blue: "#2563eb",
  purple: "#7c3aed",
  amber: "#f59e0b",
  glass: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 14,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  gradText: {
    background: "linear-gradient(135deg, #c94050, #e8788a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

// ═══ MONTH UTILS ═══
const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
const getMonthLabel = (key) => {
  const [y, m] = key.split("-");
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
const getCurrentMonthKey = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`;
};
const getAvailableMonths = (td) => {
  const set = new Set();
  td.forEach((t) => set.add(getMonthKey(t.date)));
  return Array.from(set).sort().reverse();
};

// ═══ COMPONENTS ═══
function Badge({ children, color = C.accent, sm }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: sm ? "2px 8px" : "4px 12px",
        borderRadius: 100,
        fontSize: sm ? 10 : 11,
        fontWeight: 600,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        background: color + "14",
        color,
        border: `1px solid ${color}28`,
      }}
    >
      {children}
    </span>
  );
}

function Num({ end, prefix = "", suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = Math.max(end / 60, 1);
    const t = setInterval(() => {
      s += step;
      if (s >= end) {
        setV(end);
        clearInterval(t);
      } else setV(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [end]);
  return (
    <span>
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

function Stat({ label, value, prefix, suffix, color = C.accent, icon, sub }) {
  return (
    <div
      style={{
        ...C.glass,
        padding: "16px 18px",
        flex: "1 1 calc(25% - 12px)",
        minWidth: 140,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: C.textMuted,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 600,
          }}
        >
          {label}
        </div>
        {icon && <span style={{ opacity: 0.5 }}>{icon}</span>}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color,
          marginTop: 8,
          lineHeight: 1,
        }}
      >
        <Num end={value} prefix={prefix || ""} suffix={suffix || ""} />
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function Logo({ size = 32 }) {
  return (
    <img
      src={LOGO_B64}
      alt="TDP"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        objectFit: "cover",
      }}
    />
  );
}

// ═══ MONTH COMPARISON WIDGET ═══
function MonthComparison({ td, currentMonth }) {
  const months = getAvailableMonths(td);
  const [compareMonth, setCompareMonth] = useState(() => {
    const idx = months.indexOf(currentMonth);
    return months[idx + 1] || months[0];
  });

  const getCounts = (mk) => {
    const filtered = td.filter((t) => getMonthKey(t.date) === mk);
    return {
      drives: filtered.length,
      sold: filtered.filter((t) => t.outcome === "sold").length,
      closeRate: filtered.length
        ? Math.round(
            (filtered.filter((t) => t.outcome === "sold").length /
              filtered.length) *
              100,
          )
        : 0,
      crm: filtered.filter((t) => t.adfSent).length,
    };
  };

  const curr = getCounts(currentMonth);
  const comp = getCounts(compareMonth);

  const delta = (a, b) => {
    if (b === 0) return a > 0 ? 100 : 0;
    return Math.round(((a - b) / b) * 100);
  };

  const DeltaBadge = ({ val }) => {
    const d = val;
    const up = d >= 0;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
          fontSize: 11,
          fontWeight: 700,
          color: up ? C.green : C.red,
        }}
      >
        {up ? I.arrowUp(C.green, 12) : I.arrowDown(C.red, 12)}
        {Math.abs(d)}%
      </span>
    );
  };

  return (
    <div style={{ ...C.glass, padding: 22, marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700 }}>
          Month-over-Month Comparison
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: C.textMuted }}>
            Compare with:
          </span>
          <select
            value={compareMonth}
            onChange={(e) => setCompareMonth(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.surface,
              color: C.text,
              fontSize: 12,
              fontFamily: "'Outfit',sans-serif",
              cursor: "pointer",
            }}
          >
            {months
              .filter((m) => m !== currentMonth)
              .map((m) => (
                <option key={m} value={m}>
                  {getMonthLabel(m)}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        {[
          { label: "Test Drives", curr: curr.drives, comp: comp.drives },
          { label: "Cars Sold", curr: curr.sold, comp: comp.sold },
          {
            label: "Close Rate",
            curr: curr.closeRate,
            comp: comp.closeRate,
            suffix: "%",
          },
          { label: "CRM Leads", curr: curr.crm, comp: comp.crm },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: 14,
              borderRadius: 12,
              background: C.surface,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.textDim,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>
              {item.curr}
              {item.suffix || ""}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
              vs {item.comp}
              {item.suffix || ""}
            </div>
            <div style={{ marginTop: 6 }}>
              <DeltaBadge val={delta(item.curr, item.comp)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ SALESPERSON BAR CHART ═══
function SalespersonBarChart({ td, monthKey }) {
  const filtered = td.filter((t) => getMonthKey(t.date) === monthKey);
  const data = SP.map((s) => {
    const d = filtered.filter((t) => t.salesId === s.id);
    return {
      ...s,
      drives: d.length,
      sold: d.filter((t) => t.outcome === "sold").length,
    };
  }).sort((a, b) => b.drives - a.drives);
  const maxVal = Math.max(...data.map((d) => d.drives), 1);

  return (
    <div style={{ ...C.glass, padding: 24 }}>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>
        Salesperson Breakdown — {getMonthLabel(monthKey)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.map((s) => (
          <div key={s.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: C.accent + "14",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: C.accent,
                  }}
                >
                  {s.initials}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  fontSize: 12,
                }}
              >
                <span style={{ color: C.textMuted }}>{s.drives} drives</span>
                <span style={{ fontWeight: 700, color: C.green }}>
                  {s.sold} sold
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 4,
                height: 24,
                borderRadius: 6,
                overflow: "hidden",
                background: C.surface,
              }}
            >
              <div
                style={{
                  width: `${(s.drives / maxVal) * 100}%`,
                  background: `linear-gradient(90deg, ${C.accent}, ${C.accent}bb)`,
                  borderRadius: 6,
                  minWidth: s.drives > 0 ? 4 : 0,
                  transition: "width 0.6s ease",
                  position: "relative",
                }}
              >
                {s.sold > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${(s.sold / s.drives) * 100}%`,
                      background: C.green,
                      borderRadius: "6px 0 0 6px",
                      minWidth: 4,
                    }}
                  />
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 10, color: C.green }}>■ Sold</span>
              <span style={{ fontSize: 10, color: C.accent }}>
                ■ Test Drives
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ LIVE TIMER ═══
function LiveTimer({ startTimestamp }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!startTimestamp) return;
    const tick = () =>
      setElapsed(Math.floor((Date.now() - startTimestamp) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTimestamp]);
  const hrs = Math.floor(elapsed / 3600),
    mins = Math.floor((elapsed % 3600) / 60),
    secs = elapsed % 60;
  const display =
    hrs > 0
      ? `${hrs}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`
      : `${mins}m ${String(secs).padStart(2, "0")}s`;
  const color =
    elapsed > 45 * 60 ? C.red : elapsed > 30 * 60 ? "#f59e0b" : C.green;
  return (
    <span
      style={{
        fontFamily: "'Courier New',monospace",
        fontWeight: 700,
        fontSize: 15,
        color,
        letterSpacing: 0.5,
      }}
    >
      {display}
    </span>
  );
}

// ═══ ALERT TOAST ═══
function AlertToast({ alerts, onDismiss }) {
  if (!alerts.length) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 400,
      }}
    >
      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: `1px solid ${C.amber}44`,
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
          }}
        >
          <div style={{ marginTop: 2 }}>{I.mail(C.amber, 18)}</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.amber,
                marginBottom: 2,
              }}
            >
              Alert Sent
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>
              {a}
            </div>
          </div>
          <button
            onClick={() => onDismiss(i)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
            }}
          >
            {I.x(C.textDim, 14)}
          </button>
        </div>
      ))}
    </div>
  );
}

// ═══ TODAY'S TEST DRIVES HERO ═══
function TodayTestDrives({ td, setTD }) {
  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const active = td.filter((t) => t.status === "active");
  const todayCompleted = td.filter(
    (t) => t.status === "completed" && t.date === todayStr,
  );
  const todayAll = [...active, ...todayCompleted];

  const parseT = (ts) => {
    const p = ts?.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!p) return 0;
    let h = parseInt(p[1]);
    const m = parseInt(p[2]);
    if (p[3].toUpperCase() === "PM" && h < 12) h += 12;
    if (p[3].toUpperCase() === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const markReturn = (id) => {
    setTD((p) =>
      p.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "completed",
              timeOut: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }),
              startTimestamp: null,
            }
          : t,
      ),
    );
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {active.length > 0 && (
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: C.green,
                boxShadow: `0 0 12px ${C.green}80`,
                animation: "pulse 2s infinite",
              }}
            />
          )}
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
            Today's Test Drives
          </h2>
          <Badge color={C.accent}>{todayAll.length} total</Badge>
          {active.length > 0 && (
            <Badge color={C.green}>{active.length} active</Badge>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

      {active.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {active.map((t) => {
            const veh = INVENTORY.find((v) => v.id === t.vehicleId);
            return (
              <div
                key={t.id}
                style={{
                  ...C.glass,
                  padding: "16px 18px",
                  marginBottom: 10,
                  borderLeft: `4px solid ${C.green}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: C.green + "12",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {I.car(C.green, 20)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>
                        {t.customer}
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>
                        {t.phone}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.textDim,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      Elapsed
                    </div>
                    {t.startTimestamp ? (
                      <LiveTimer startTimestamp={t.startTimestamp} />
                    ) : (
                      <span
                        style={{
                          color: C.green,
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        Out since {t.timeIn}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    fontSize: 12,
                    flexWrap: "wrap",
                    marginBottom: 12,
                  }}
                >
                  <span>
                    <span style={{ color: C.textDim }}>Vehicle:</span>{" "}
                    <span style={{ fontWeight: 600 }}>{t.vehicle}</span>
                  </span>
                  <span>
                    <span style={{ color: C.textDim }}>Sales:</span>{" "}
                    <span style={{ fontWeight: 600 }}>{t.salesperson}</span>
                  </span>
                  {veh && (
                    <span>
                      <span style={{ color: C.textDim }}>DOL:</span>{" "}
                      <span
                        style={{
                          fontWeight: 700,
                          color: dolAge(veh.daysOnLot),
                        }}
                      >
                        {veh.daysOnLot}d
                      </span>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => markReturn(t.id)}
                  style={{
                    padding: "10px 0",
                    borderRadius: 8,
                    background: C.accent,
                    border: "none",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif",
                    width: "100%",
                  }}
                >
                  Mark Returned
                </button>
              </div>
            );
          })}
        </div>
      )}

      {todayCompleted.length > 0 && (
        <div style={{ ...C.glass, padding: 14, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              minWidth: 500,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {[
                  "Customer",
                  "Vehicle",
                  "Salesperson",
                  "Out",
                  "Back",
                  "Outcome",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      color: C.textDim,
                      fontWeight: 600,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todayCompleted.map((t) => (
                <tr
                  key={t.id}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <td style={{ padding: "8px 10px", fontWeight: 600 }}>
                    {t.customer}
                  </td>
                  <td style={{ padding: "8px 10px", color: C.textMuted }}>
                    {t.vehicle}
                  </td>
                  <td style={{ padding: "8px 10px", color: C.textMuted }}>
                    {t.salesperson}
                  </td>
                  <td style={{ padding: "8px 10px", color: C.textMuted }}>
                    {t.timeIn}
                  </td>
                  <td style={{ padding: "8px 10px", color: C.textMuted }}>
                    {t.timeOut}
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    {t.outcome === "sold" ? (
                      <Badge color={C.green} sm>
                        Sold
                      </Badge>
                    ) : t.outcome === "not_sold" ? (
                      <Badge color={C.textDim} sm>
                        No Sale
                      </Badge>
                    ) : (
                      <Badge color={C.accent} sm>
                        Pending
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {todayAll.length === 0 && (
        <div style={{ ...C.glass, padding: 40, textAlign: "center" }}>
          <div style={{ marginBottom: 8, opacity: 0.3 }}>
            {I.car(C.textDim, 36)}
          </div>
          <div style={{ fontWeight: 600 }}>No test drives today yet</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
            Start a new test drive to get going
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ LIVE DASHBOARD ═══
function LiveDashboard({ td, setTD }) {
  const active = td.filter((t) => t.status === "active");
  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const completed = td.filter(
    (t) => t.status === "completed" && t.date === todayStr,
  );
  const parseT = (ts) => {
    const p = ts?.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!p) return 0;
    let h = parseInt(p[1]);
    const m = parseInt(p[2]);
    if (p[3].toUpperCase() === "PM" && h < 12) h += 12;
    if (p[3].toUpperCase() === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };
  const validCompleted = completed.filter((t) => t.timeOut);
  const avgMins =
    validCompleted.length > 0
      ? Math.round(
          validCompleted.reduce(
            (s, t) => s + (parseT(t.timeOut) - parseT(t.timeIn)),
            0,
          ) / validCompleted.length,
        )
      : 0;
  const markReturn = (id) => {
    setTD((p) =>
      p.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "completed",
              timeOut: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }),
              startTimestamp: null,
            }
          : t,
      ),
    );
  };

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        Live Dashboard
      </h1>
      <p style={{ color: C.textDim, fontSize: 13, margin: "0 0 24px" }}>
        Real-time test drive tracking
      </p>
      <div
        style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}
      >
        <Stat
          label="Currently Out"
          value={active.length}
          color={C.green}
          icon={I.dot(C.green, 10)}
        />
        <Stat
          label="Returned Today"
          value={completed.length}
          icon={I.check(C.textDim, 16)}
        />
        <Stat
          label="Avg Duration"
          value={avgMins}
          suffix=" min"
          color={C.blue}
          icon={I.clock(C.textDim, 16)}
        />
      </div>
      <TodayTestDrives td={td} setTD={setTD} />
    </div>
  );
}

// ═══ SIGNATURE PAD ═══
function SignaturePad({ onSign }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const pos = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - r.left, y: cy - r.top };
  };
  const start = (e) => {
    e.preventDefault();
    const c = ref.current.getContext("2d");
    const p = pos(e);
    c.beginPath();
    c.moveTo(p.x, p.y);
    setDrawing(true);
  };
  const move = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const c = ref.current.getContext("2d");
    const p = pos(e);
    c.lineTo(p.x, p.y);
    c.strokeStyle = "#c94050";
    c.lineWidth = 2.5;
    c.lineCap = "round";
    c.stroke();
    setDrawn(true);
  };
  const end = () => setDrawing(false);
  const clear = () => {
    ref.current.getContext("2d").clearRect(0, 0, 520, 140);
    setDrawn(false);
  };
  return (
    <div>
      <div
        style={{
          border: `2px solid ${drawn ? C.green + "44" : C.border}`,
          borderRadius: 12,
          overflow: "hidden",
          background: "#fafafa",
          position: "relative",
        }}
      >
        <canvas
          ref={ref}
          width={520}
          height={140}
          style={{
            display: "block",
            width: "100%",
            cursor: "crosshair",
            touchAction: "none",
          }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
        {!drawn && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              color: C.textDim,
              fontSize: 14,
            }}
          >
            Sign here
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 10,
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={clear}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: "transparent",
            color: C.textMuted,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          Clear
        </button>
        {drawn && (
          <button
            onClick={() => onSign(ref.current.toDataURL())}
            style={{
              padding: "8px 24px",
              borderRadius: 8,
              background: C.green,
              border: "none",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Confirm Signature
          </button>
        )}
      </div>
    </div>
  );
}

function LicenseUpload({ label, subtitle, onUpload, preview }) {
  const r = useRef(null);
  const h = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = (ev) => onUpload(ev.target.result);
    rd.readAsDataURL(f);
  };
  return (
    <div
      onClick={() => r.current.click()}
      style={{
        border: `2px dashed ${preview ? C.green + "44" : C.accent + "33"}`,
        borderRadius: 14,
        padding: preview ? 8 : 32,
        cursor: "pointer",
        background: preview ? C.green + "04" : C.surface,
        textAlign: "center",
      }}
    >
      <input
        ref={r}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={h}
        style={{ display: "none" }}
      />
      {preview ? (
        <div style={{ position: "relative" }}>
          <img
            src={preview}
            alt={label}
            style={{
              width: "100%",
              maxHeight: 180,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <Badge color={C.green} sm>
              Uploaded
            </Badge>
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 6, opacity: 0.6 }}>
            {I.cam(C.accent, 28)}
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
            {label}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>
            {subtitle}
          </div>
        </>
      )}
    </div>
  );
}

// ═══ LANDING ═══
function LandingPage({ onLogin }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    setTimeout(() => setVis(true), 50);
  }, []);
  const partners = [
    { name: "DriveCentric", abbr: "DC", color: "#4F8EF7", desc: "CRM" },
    { name: "CDK Global", abbr: "CDK", color: "#00A551", desc: "DMS" },
    { name: "DealerSocket", abbr: "DS", color: "#FF6B35", desc: "CRM" },
    { name: "RouteOne", abbr: "R1", color: "#1E3A5F", desc: "Finance" },
    { name: "vAuto", abbr: "vA", color: "#E31837", desc: "Inventory" },
    { name: "IDScan.net", abbr: "ID", color: "#0073CF", desc: "Identity" },
    { name: "Tekion", abbr: "TK", color: "#6C5CE7", desc: "DMS" },
    { name: "Reynolds & Reynolds", abbr: "R&R", color: "#2D3436", desc: "DMS" },
  ];
  return (
    <div
      style={{
        background: "#fff",
        color: C.text,
        fontFamily: "'Outfit',sans-serif",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={30} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Test Drive Pro</span>
        </div>
        <button
          onClick={onLogin}
          style={{
            padding: "8px 24px",
            borderRadius: 100,
            background: C.text,
            border: "none",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </nav>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "140px 48px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,64,80,0.06), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 720,
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Badge color={C.accent}>Dealership Management Platform</Badge>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "20px 0 20px",
              letterSpacing: -1.5,
            }}
          >
            Every test drive.
            <br />
            <span style={{ ...C.gradText }}>Tracked & optimized.</span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.textMuted,
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 0 36px",
            }}
          >
            Real-time tracking, digital agreements, ID verification, CRM
            integration, and commission management — all in one platform.
          </p>
          <button
            onClick={onLogin}
            style={{
              padding: "16px 36px",
              borderRadius: 100,
              background: C.accent,
              border: "none",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: `0 4px 24px ${C.accent}33`,
            }}
          >
            Get Started
          </button>
        </div>
      </section>
      <section style={{ padding: "80px 48px", background: C.surface }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 12px" }}>
            Built for dealerships
          </h2>
          <p style={{ color: C.textMuted, fontSize: 16 }}>
            Everything you need to manage your floor
          </p>
        </div>
        <div
          className="feat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: I.clock(C.accent, 28),
              title: "Live Tracking",
              desc: "Real-time timers and alerts for every test drive",
            },
            {
              icon: I.shield(C.green, 28),
              title: "ID Verification",
              desc: "IDScan.net integration with automatic validation",
            },
            {
              icon: I.pen(C.blue, 28),
              title: "Digital Agreements",
              desc: "Paperless signatures with TCPA-compliant consent",
            },
            {
              icon: I.send(C.purple, 28),
              title: "CRM Integration",
              desc: "Automatic ADF/XML delivery to your CRM",
            },
            {
              icon: I.dollar(C.green, 28),
              title: "Commission Tracking",
              desc: "Tiered commission structure with real-time payouts",
            },
            {
              icon: I.chart(C.accent, 28),
              title: "Reporting",
              desc: "Month-over-month performance dashboards",
            },
          ].map((f) => (
            <div key={f.title} style={{ ...C.glass, padding: 28 }}>
              <div style={{ marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                {f.title}
              </div>
              <div
                style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "60px 48px", textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            color: C.textDim,
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Integration Partners
        </div>
        <div
          className="partner-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 32,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {partners.map((p) => (
            <div
              key={p.name}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: p.color + "14",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 800,
                  color: p.color,
                }}
              >
                {p.abbr}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.textDim }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══ LOGIN ═══
function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const u = Object.values(USERS).find(
        (u) => u.email === email && u.password === pass,
      );
      if (u) onLogin(u);
      else {
        setError("Invalid credentials");
        setLoading(false);
      }
    }, 600);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.surface,
        color: C.text,
        fontFamily: "'Outfit',sans-serif",
        padding: 20,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={{ width: 400, maxWidth: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Logo size={48} />
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "14px 0 4px" }}>
            Welcome back
          </h1>
          <p style={{ color: C.textMuted, fontSize: 14, margin: 0 }}>
            Sign in to Test Drive Pro
          </p>
        </div>
        <div style={{ ...C.glass, padding: 32 }}>
          {[
            {
              l: "Email",
              v: email,
              s: setEmail,
              t: "email",
              p: "you@magnetismmotors.com",
            },
            {
              l: "Password",
              v: pass,
              s: setPass,
              t: "password",
              p: "••••••••",
            },
          ].map((f) => (
            <div key={f.l} style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                {f.l}
              </label>
              <input
                type={f.t}
                value={f.v}
                onChange={(e) => f.s(e.target.value)}
                placeholder={f.p}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  color: C.text,
                  fontSize: 14,
                  fontFamily: "'Outfit',sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: C.red + "0a",
                color: C.red,
                fontSize: 13,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {I.alert(C.red, 14)} {error}
            </div>
          )}
          <button
            onClick={submit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: C.accent,
              border: "none",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <div
          style={{
            marginTop: 24,
            padding: "20px 24px",
            borderRadius: 14,
            background: "#fff",
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.textDim,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Quick Access
          </div>
          {[
            {
              l: "Owner",
              e: "bilal@magnetismmotors.com",
              p: "admin123",
              c: C.accent,
            },
            {
              l: "Manager",
              e: "mike@magnetismmotors.com",
              p: "manager123",
              c: C.blue,
            },
            {
              l: "Sales",
              e: "shafay@magnetismmotors.com",
              p: "sales123",
              c: C.green,
            },
          ].map((q) => (
            <button
              key={q.l}
              onClick={() => {
                setEmail(q.e);
                setPass(q.p);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: "transparent",
                color: C.textMuted,
                fontSize: 13,
                cursor: "pointer",
                textAlign: "left",
                marginBottom: 4,
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              <span>
                <span style={{ color: q.c, fontWeight: 600 }}>{q.l}</span> —{" "}
                {q.e}
              </span>
              <span style={{ opacity: 0.3 }}>{I.arrow(C.textDim, 14)}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          style={{
            display: "block",
            margin: "24px auto 0",
            background: "none",
            border: "none",
            color: C.textDim,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

// ═══ RESPONSIVE HOOK ═══
function useIsMobile(bp = 768) {
  const [m, setM] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false,
  );
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return m;
}

// ═══ APP SHELL ═══
function Shell({ user, onLogout, children, nav, active, setView }) {
  const rc = { admin: C.accent, manager: C.blue, salesperson: C.green }[
    user.role
  ];
  const mob = useIsMobile();
  const [open, setOpen] = useState(false);
  const pick = (id) => {
    setView(id);
    setOpen(false);
  };

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Outfit',sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: mob ? "column" : "row",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {mob && (
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#fff",
            borderBottom: `1px solid ${C.border}`,
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 20,
                    height: 2,
                    background: C.text,
                    borderRadius: 1,
                    transition: "all 0.3s",
                    transform:
                      i === 0 && open
                        ? "rotate(45deg) translate(4px,4px)"
                        : i === 2 && open
                          ? "rotate(-45deg) translate(4px,-4px)"
                          : "none",
                    opacity: i === 1 && open ? 0 : 1,
                  }}
                />
              ))}
            </button>
            <Logo size={28} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              Test Drive Pro
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge color={rc} sm>
              {user.role === "salesperson" ? "Sales" : user.role}
            </Badge>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: rc + "14",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: rc,
              }}
            >
              {user.initials}
            </div>
          </div>
        </header>
      )}
      {mob && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}
      <aside
        style={{
          width: mob ? "280px" : "232px",
          background: "#fff",
          borderRight: mob ? "none" : `1px solid ${C.border}`,
          padding: "20px 14px",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: mob ? "56px" : "0",
          left: mob ? (open ? "0" : "-290px") : "0",
          height: mob ? "calc(100vh - 56px)" : "100vh",
          zIndex: 99,
          transition: mob ? "left 0.3s cubic-bezier(0.4,0,0.2,1)" : "none",
          boxShadow: mob && open ? "8px 0 32px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {!mob && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "4px 8px",
              marginBottom: 24,
            }}
          >
            <Logo size={32} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1 }}>
                Test Drive Pro
              </div>
              <div style={{ fontSize: 10, color: C.textDim, marginTop: 1 }}>
                Magnetism Motors
              </div>
            </div>
          </div>
        )}
        {!mob && (
          <div style={{ padding: "4px 8px", marginBottom: 16 }}>
            <Badge color={rc}>
              {user.role === "salesperson" ? "Sales" : user.role}
            </Badge>
          </div>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => pick(n.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: mob ? "12px 14px" : "10px 12px",
                borderRadius: 10,
                border: "none",
                background: active === n.id ? C.accent + "0c" : "transparent",
                color: active === n.id ? C.accent : C.textMuted,
                fontSize: mob ? 14 : 13,
                fontWeight: active === n.id ? 600 : 500,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              <span
                style={{ width: 20, display: "flex", justifyContent: "center" }}
              >
                {n.icon}
              </span>
              {n.label}
            </button>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          {!mob && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: rc + "14",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: rc,
                }}
              >
                {user.initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.textDim,
                    textTransform: "capitalize",
                  }}
                >
                  {user.role}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "transparent",
              color: C.textMuted,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main
        style={{
          marginLeft: mob ? 0 : 232,
          flex: 1,
          padding: mob ? "20px 16px" : "32px 40px",
          minHeight: "100vh",
          width: mob ? "100%" : "auto",
          background: C.surface,
        }}
      >
        {children}
      </main>
    </div>
  );
}

// ═══ TABLE ═══
function TDTable({ drives, showSales = true }) {
  if (!drives.length)
    return (
      <div
        style={{
          ...C.glass,
          padding: 40,
          textAlign: "center",
          color: C.textDim,
        }}
      >
        No test drives
      </div>
    );
  return (
    <div
      className="resp-table-wrap"
      style={{ ...C.glass, padding: "12px", overflowX: "auto" }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12,
          minWidth: 700,
        }}
      >
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {[
              "Customer",
              "Vehicle",
              showSales && "Sales",
              "Date",
              "In",
              "Out",
              "Outcome",
              "CRM",
            ]
              .filter(Boolean)
              .map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    color: C.textDim,
                    fontWeight: 600,
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {drives.map((td) => (
            <tr key={td.id} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: "8px 10px" }}>
                <div style={{ fontWeight: 600 }}>{td.customer}</div>
                <div style={{ fontSize: 10, color: C.textDim }}>{td.phone}</div>
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  color: C.textMuted,
                  fontSize: 11,
                }}
              >
                {td.vehicle}
              </td>
              {showSales && (
                <td
                  style={{
                    padding: "8px 10px",
                    color: C.textMuted,
                    fontSize: 11,
                  }}
                >
                  {td.salesperson?.split(" ")[0]}
                </td>
              )}
              <td
                style={{
                  padding: "8px 10px",
                  color: C.textMuted,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                }}
              >
                {td.date}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  color: C.textMuted,
                  fontSize: 11,
                }}
              >
                {td.timeIn}
              </td>
              <td style={{ padding: "8px 10px" }}>
                {td.timeOut || (
                  <Badge color={C.green} sm>
                    Active
                  </Badge>
                )}
              </td>
              <td style={{ padding: "8px 10px" }}>
                {td.outcome === "sold" ? (
                  <Badge color={C.green} sm>
                    Sold
                  </Badge>
                ) : td.outcome === "not_sold" ? (
                  <Badge color={C.textDim} sm>
                    No Sale
                  </Badge>
                ) : td.status === "active" ? (
                  <Badge color={C.green} sm>
                    On Drive
                  </Badge>
                ) : (
                  <Badge color={C.accent} sm>
                    Pending
                  </Badge>
                )}
              </td>
              <td style={{ padding: "8px 10px" }}>
                {td.adfSent ? (
                  <Badge color={C.blue} sm>
                    Sent
                  </Badge>
                ) : (
                  <Badge color={C.accent} sm>
                    Pending
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══ INVENTORY VIEW ═══
function InvView({ td }) {
  const [f, setF] = useState("all");
  const [sort, setSort] = useState("dol");
  const getS = (v) =>
    (td || []).find((t) => t.vehicleId === v.id && t.status === "active")
      ? "on-drive"
      : v.status;
  let list =
    f === "all" ? [...INVENTORY] : INVENTORY.filter((v) => getS(v) === f);
  if (sort === "dol") list.sort((a, b) => b.daysOnLot - a.daysOnLot);
  else if (sort === "price") list.sort((a, b) => b.price - a.price);
  const critical = INVENTORY.filter((v) => v.daysOnLot >= 90).length;
  const aging = INVENTORY.filter(
    (v) => v.daysOnLot >= 60 && v.daysOnLot < 90,
  ).length;
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Inventory</h1>
        <p style={{ color: C.textDim, fontSize: 13, margin: "4px 0 12px" }}>
          {INVENTORY.length} vehicles · magnetismmotors.com
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            ["all", "All"],
            ["available", "Available"],
            ["on-drive", "On Drive"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setF(v)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                border: `1px solid ${f === v ? C.accent + "44" : C.border}`,
                background: f === v ? C.accentLight : "transparent",
                color: f === v ? C.accent : C.textMuted,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              {l}
            </button>
          ))}
          {[
            ["dol", "By Age"],
            ["price", "By Price"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setSort(v)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                border: `1px solid ${sort === v ? C.blue + "44" : C.border}`,
                background: sort === v ? C.blue + "0a" : "transparent",
                color: sort === v ? C.blue : C.textMuted,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      {(critical > 0 || aging > 0) && (
        <div
          style={{
            ...C.glass,
            padding: "14px 20px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderLeft: `3px solid ${C.amber}`,
          }}
        >
          {I.alert(C.amber, 18)}
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>
              Aging Inventory Alert:{" "}
            </span>
            <span style={{ fontSize: 13, color: C.textMuted }}>
              {critical} critical (90+ days), {aging} aging (60-89 days).
            </span>
          </div>
        </div>
      )}
      <div
        className="resp-inv-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 14,
        }}
      >
        {list.map((v) => {
          const st = getS(v);
          const dc = dolAge(v.daysOnLot);
          return (
            <div
              key={v.id}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                border: `1px solid ${C.border}`,
                transition: "all 0.25s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  height: 130,
                  background: C.surfaceLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {v.img ? (
                  <img
                    src={v.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : null}
                {!v.img && (
                  <div
                    style={{ fontSize: 13, color: C.textDim, fontWeight: 600 }}
                  >
                    {v.year} {v.make} {v.model}
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 4,
                  }}
                >
                  <Badge color={st === "available" ? C.green : C.accent} sm>
                    {st === "on-drive" ? "On Drive" : st}
                  </Badge>
                </div>
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  <div
                    style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: 10,
                      fontWeight: 700,
                      background: dc + "14",
                      color: dc,
                      border: `1px solid ${dc}28`,
                    }}
                  >
                    {v.daysOnLot}d on lot
                  </div>
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: C.textDim }}>
                  {v.year} · {v.color}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
                  {v.make} {v.model}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{v.trim}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{ fontSize: 16, fontWeight: 700, ...C.gradText }}
                  >
                    {fmt(v.price)}
                  </span>
                  <span style={{ fontSize: 11, color: C.textDim }}>
                    {v.miles.toLocaleString()} mi
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══ CONTRACT ═══
function Contract({ vehicle, sigData }) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      style={{
        background: "#fff",
        color: "#111",
        borderRadius: 12,
        padding: "36px 32px",
        maxHeight: 460,
        overflow: "auto",
        fontSize: 12.5,
        lineHeight: 1.7,
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #111",
          paddingBottom: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Magnetism Motors
        </div>
        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
          2279 Lawrenceville Hwy, Lawrenceville, GA 30044 · (770) 800-1100
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            marginTop: 14,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Test Drive Agreement
        </div>
      </div>
      <p>
        <strong>Date:</strong> {today}
      </p>
      {vehicle && (
        <div
          style={{
            padding: 14,
            background: "#f5f5f5",
            borderRadius: 8,
            marginBottom: 16,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            fontSize: 11.5,
          }}
        >
          <div>
            <strong>Vehicle:</strong> {vehicle.year} {vehicle.make}{" "}
            {vehicle.model}
          </div>
          <div>
            <strong>Trim:</strong> {vehicle.trim}
          </div>
          <div>
            <strong>VIN:</strong> {vehicle.vin}
          </div>
          <div>
            <strong>Stock:</strong> {vehicle.stock}
          </div>
        </div>
      )}
      <p>I, the undersigned, acknowledge and agree to the following:</p>
      <p>
        <strong>1. VALID LICENSE & INSURANCE.</strong> I possess a valid
        driver's license and maintain automobile liability insurance.
      </p>
      <p>
        <strong>2. SAFE OPERATION.</strong> I will operate the vehicle safely,
        lawfully, and will not exceed speed limits or operate under the
        influence.
      </p>
      <p>
        <strong>3. LIABILITY & DAMAGES.</strong> I assume full responsibility
        for damages, violations, or incidents during the test drive.
      </p>
      <p>
        <strong>4. IDENTITY VERIFICATION.</strong> I authorize Magnetism Motors
        to photograph and verify my government-issued ID.
      </p>
      <p>
        <strong>5. DESIGNATED ROUTE & TIMEFRAME.</strong> I will follow the
        designated route and return the vehicle within the agreed timeframe.
      </p>
      <p>
        <strong>6. VEHICLE CONDITION.</strong> I will report any issues observed
        before, during, or after the test drive.
      </p>
      <div
        style={{
          padding: 14,
          background: "#f0f7ff",
          border: "1px solid #cde0f5",
          borderRadius: 8,
          margin: "16px 0",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>
          7. CONSENT TO RECEIVE TEXT MESSAGES
        </p>
        <p style={{ margin: "6px 0 0" }}>
          By signing, I consent to receive SMS/MMS from Magnetism Motors
          including follow-up, promotional offers, and service reminders.
          Message/data rates may apply. Consent is not a condition of purchase.
          Reply STOP to opt out.
        </p>
      </div>
      <p>
        <strong>8. GOVERNING LAW.</strong> This Agreement is governed by Georgia
        law.
      </p>
      {sigData ? (
        <div
          style={{ borderTop: "1px solid #ccc", marginTop: 16, paddingTop: 12 }}
        >
          <img src={sigData} alt="Sig" style={{ height: 50 }} />
          <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>
            Digitally signed {today}
          </div>
        </div>
      ) : (
        <div
          style={{
            borderTop: "1px solid #ccc",
            marginTop: 16,
            paddingTop: 12,
            color: "#999",
            fontStyle: "italic",
          }}
        >
          Awaiting signature...
        </div>
      )}
    </div>
  );
}

// ═══ NEW TEST DRIVE ═══
function NewTD({ testDrives, setTestDrives, setAlerts }) {
  const [step, setStep] = useState(0);
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [parsed, setParsed] = useState(null);
  const [sel, setSel] = useState(null);
  const [sigData, setSigData] = useState(null);
  const [started, setStarted] = useState(false);
  const [phone, setPhone] = useState("");
  const [vehQ, setVehQ] = useState("");
  const steps = ["Upload ID", "Select Vehicle", "Sign & Go"];
  const verify = () => {
    setVerifying(true);
    setTimeout(() => {
      setParsed({
        firstName: "Linda",
        lastName: "Tran",
        dob: "03/15/1988",
        license: "GA-058472198",
        expires: "03/15/2027",
        address: "1245 Peachtree Blvd, Atlanta GA",
        state: "Georgia",
        trust: 97,
      });
      setVerified(true);
      setVerifying(false);
    }, 2000);
  };
  const go = () => {
    const v = INVENTORY.find((x) => x.id === sel);
    if (v.daysOnLot >= 60) {
      setAlerts((p) => [
        ...p,
        `${v.year} ${v.make} ${v.model} (${v.daysOnLot} days on lot) is on a test drive with ${parsed.firstName} ${parsed.lastName}. Priority: close this deal.`,
      ]);
    }
    setTestDrives((p) => [
      {
        id: Date.now(),
        customer: `${parsed.firstName} ${parsed.lastName}`,
        phone,
        vehicle: `${v.year} ${v.make} ${v.model}`,
        vehicleId: v.id,
        salesperson: "Shafay Ahmed",
        salesId: 1,
        timeIn: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        timeOut: null,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "active",
        idVerified: true,
        adfSent: true,
        signed: true,
        signedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        outcome: null,
        startTimestamp: Date.now(),
      },
      ...p,
    ]);
    setStarted(true);
  };
  const sv = sel ? INVENTORY.find((v) => v.id === sel) : null;
  const filteredInv = INVENTORY.filter(
    (v) =>
      !vehQ ||
      `${v.year} ${v.make} ${v.model} ${v.trim}`
        .toLowerCase()
        .includes(vehQ.toLowerCase()),
  );
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        New Test Drive
      </h1>
      <p style={{ color: C.textDim, fontSize: 13, margin: "0 0 28px" }}>
        Walk through each step
      </p>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < 2 ? 1 : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    i < step ? C.green : i === step ? C.accent : C.surfaceLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: i < step ? "#fff" : i === step ? "#fff" : C.textDim,
                }}
              >
                {i < step ? <span>{I.check("#fff", 14)}</span> : i + 1}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: i === step ? 600 : 400,
                  color: i <= step ? C.text : C.textDim,
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </span>
            </div>
            {i < 2 && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: i < step ? C.green + "66" : C.border,
                  margin: "0 14px",
                }}
              />
            )}
          </div>
        ))}
      </div>
      {started ? (
        <div style={{ ...C.glass, padding: 48, textAlign: "center" }}>
          <div style={{ marginBottom: 12 }}>{I.check(C.green, 48)}</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>
            Test Drive Started!
          </h2>
          <p style={{ color: C.textMuted, fontSize: 14 }}>
            {parsed?.firstName} {parsed?.lastName} is on a test drive with{" "}
            {sv?.year} {sv?.make} {sv?.model}
          </p>
        </div>
      ) : step === 0 ? (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {!verified ? (
            <div style={{ ...C.glass, padding: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
                Upload Driver's License
              </h2>
              <p
                style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}
              >
                Take photos of the front and back for IDScan.net verification.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <LicenseUpload
                  label="Front"
                  subtitle="Photo of front"
                  onUpload={setFrontImg}
                  preview={frontImg}
                />
                <LicenseUpload
                  label="Back (Barcode)"
                  subtitle="Photo of barcode"
                  onUpload={setBackImg}
                  preview={backImg}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: C.textMuted,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(770) 555-0100"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.text,
                    fontSize: 14,
                    fontFamily: "'Outfit',sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              {frontImg && backImg && !verifying && (
                <button
                  onClick={verify}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 12,
                    background: C.accent,
                    border: "none",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif",
                  }}
                >
                  Verify Identity
                </button>
              )}
              {verifying && (
                <div
                  style={{
                    textAlign: "center",
                    padding: 20,
                    color: C.textMuted,
                  }}
                >
                  Verifying identity...
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ ...C.glass, padding: 24, marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  {I.check(C.green, 20)}
                  <span style={{ fontWeight: 700, color: C.green }}>
                    Identity Verified
                  </span>
                  <Badge color={C.green} sm>
                    {parsed.trust}% match
                  </Badge>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    fontSize: 13,
                  }}
                >
                  {[
                    ["Name", `${parsed.firstName} ${parsed.lastName}`],
                    ["DOB", parsed.dob],
                    ["License", parsed.license],
                    ["Expires", parsed.expires],
                    ["State", parsed.state],
                    ["Address", parsed.address],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <span style={{ color: C.textDim }}>{l}:</span>{" "}
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 12,
                  background: C.accent,
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                Continue to Vehicle Selection
              </button>
            </div>
          )}
        </div>
      ) : step === 1 ? (
        <div>
          <input
            value={vehQ}
            onChange={(e) => setVehQ(e.target.value)}
            placeholder="Search vehicles..."
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background: "#fff",
              color: C.text,
              fontSize: 14,
              fontFamily: "'Outfit',sans-serif",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 16,
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              gap: 12,
            }}
          >
            {filteredInv.map((v) => (
              <button
                key={v.id}
                onClick={() => setSel(v.id)}
                style={{
                  ...C.glass,
                  padding: 16,
                  cursor: "pointer",
                  border:
                    sel === v.id
                      ? `2px solid ${C.accent}`
                      : `1px solid ${C.border}`,
                  borderRadius: 14,
                  textAlign: "left",
                  fontFamily: "'Outfit',sans-serif",
                  background: sel === v.id ? C.accentLight : "#fff",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  {v.year} {v.make} {v.model}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                  {v.trim}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 700, ...C.gradText }}>
                    {fmt(v.price)}
                  </span>
                  <span style={{ color: dolAge(v.daysOnLot), fontWeight: 700 }}>
                    {v.daysOnLot}d
                  </span>
                </div>
              </button>
            ))}
          </div>
          {sel && (
            <button
              onClick={() => setStep(2)}
              style={{
                marginTop: 20,
                width: "100%",
                padding: 14,
                borderRadius: 12,
                background: C.accent,
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              Continue to Agreement
            </button>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Contract vehicle={sv} sigData={sigData} />
          {!sigData && (
            <div style={{ marginTop: 20 }}>
              <SignaturePad onSign={setSigData} />
            </div>
          )}
          {sigData && (
            <button
              onClick={go}
              style={{
                marginTop: 20,
                width: "100%",
                padding: 14,
                borderRadius: 12,
                background: C.green,
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              Start Test Drive
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══ PERFORMANCE PAGE ═══
function PerformancePage({ td }) {
  const currentMonth = getCurrentMonthKey();
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const months = getAvailableMonths(td);
  const filtered = td.filter((t) => getMonthKey(t.date) === monthFilter);

  const totalDrives = filtered.length;
  const totalSold = filtered.filter((t) => t.outcome === "sold").length;
  const totalAdf = filtered.filter((t) => t.adfSent).length;

  const dailyData = useMemo(() => {
    const m = {};
    filtered.forEach((t) => {
      m[t.date] = (m[t.date] || 0) + 1;
    });
    return Object.entries(m).slice(-14);
  }, [filtered]);
  const maxD = Math.max(...dailyData.map((d) => d[1]), 1);

  const topVehicles = INVENTORY.map((v) => ({
    ...v,
    count: filtered.filter((t) => t.vehicleId === v.id).length,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
          Performance & Reporting
        </h1>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: "#fff",
            color: C.text,
            fontSize: 13,
            fontFamily: "'Outfit',sans-serif",
            cursor: "pointer",
          }}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {getMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}
      >
        <Stat
          label="Test Drives"
          value={totalDrives}
          icon={I.car(C.textDim, 16)}
        />
        <Stat
          label="Cars Sold"
          value={totalSold}
          color={C.green}
          icon={I.dollar(C.textDim, 16)}
        />
        <Stat
          label="Close Rate"
          value={totalDrives ? Math.round((totalSold / totalDrives) * 100) : 0}
          suffix="%"
          color={C.purple}
          icon={I.trend(C.textDim, 16)}
        />
        <Stat
          label="CRM Leads"
          value={totalAdf}
          color={C.blue}
          icon={I.send(C.textDim, 16)}
        />
      </div>
      <MonthComparison td={td} currentMonth={monthFilter} />
      <div
        className="resp-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div style={{ ...C.glass, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Drives per Day
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              height: 160,
            }}
          >
            {dailyData.map(([d, v], i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{ fontSize: 10, fontWeight: 700, color: C.accent }}
                >
                  {v}
                </span>
                <div
                  style={{
                    width: "100%",
                    height: (v / maxD) * 120,
                    borderRadius: "4px 4px 2px 2px",
                    background: `linear-gradient(180deg,${C.accent},${C.accent}88)`,
                    minHeight: 4,
                  }}
                />
                <span
                  style={{
                    fontSize: 8,
                    color: C.textDim,
                    transform: "rotate(-45deg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.split(",")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...C.glass, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Most Test Driven Vehicles
          </div>
          {topVehicles
            .filter((v) => v.count > 0)
            .map((v, i) => (
              <div
                key={v.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 0",
                  borderBottom:
                    i < topVehicles.length - 1
                      ? `1px solid ${C.border}`
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: C.textDim,
                    width: 18,
                  }}
                >
                  #{i + 1}
                </span>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>
                  {v.year} {v.make} {v.model}
                </div>
                <div
                  style={{
                    width: 60,
                    height: 6,
                    borderRadius: 3,
                    background: C.surfaceLight,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(v.count / topVehicles[0].count) * 100}%`,
                      background: C.accent,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.accent,
                    width: 24,
                    textAlign: "right",
                  }}
                >
                  {v.count}
                </span>
              </div>
            ))}
        </div>
      </div>
      <SalespersonBarChart td={td} monthKey={monthFilter} />
    </div>
  );
}

// ═══ AGREEMENTS PAGE ═══
function AgreementsPage({ td }) {
  const signed = td.filter((t) => t.signed);
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        Agreements
      </h1>
      <p style={{ color: C.textDim, fontSize: 13, margin: "0 0 20px" }}>
        {signed.length} signed agreements
      </p>
      <div style={{ ...C.glass, padding: 14, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
            minWidth: 500,
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Customer", "Vehicle", "Salesperson", "Date", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      color: C.textDim,
                      fontWeight: 600,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {signed.slice(0, 30).map((t) => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>
                  {t.customer}
                </td>
                <td style={{ padding: "8px 10px", color: C.textMuted }}>
                  {t.vehicle}
                </td>
                <td style={{ padding: "8px 10px", color: C.textMuted }}>
                  {t.salesperson}
                </td>
                <td style={{ padding: "8px 10px", color: C.textMuted }}>
                  {t.signedAt}
                </td>
                <td style={{ padding: "8px 10px" }}>
                  <Badge color={C.green} sm>
                    Signed
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══ CUSTOMERS PAGE ═══
function CustomersPage({ td }) {
  const customers = {};
  td.forEach((t) => {
    if (!customers[t.customer])
      customers[t.customer] = {
        name: t.customer,
        phone: t.phone,
        drives: 0,
        lastDate: t.date,
        sold: false,
      };
    customers[t.customer].drives++;
    if (t.outcome === "sold") customers[t.customer].sold = true;
    customers[t.customer].lastDate = t.date;
  });
  const list = Object.values(customers).sort((a, b) => b.drives - a.drives);
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        Customers
      </h1>
      <p style={{ color: C.textDim, fontSize: 13, margin: "0 0 20px" }}>
        {list.length} unique customers
      </p>
      <div style={{ ...C.glass, padding: 14, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
            minWidth: 500,
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Customer", "Phone", "Drives", "Last Visit", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      color: C.textDim,
                      fontWeight: 600,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 30).map((c) => (
              <tr
                key={c.name}
                style={{ borderBottom: `1px solid ${C.border}` }}
              >
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>
                  {c.name}
                </td>
                <td style={{ padding: "8px 10px", color: C.textMuted }}>
                  {c.phone}
                </td>
                <td
                  style={{
                    padding: "8px 10px",
                    fontWeight: 700,
                    color: C.blue,
                  }}
                >
                  {c.drives}
                </td>
                <td style={{ padding: "8px 10px", color: C.textMuted }}>
                  {c.lastDate}
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {c.sold ? (
                    <Badge color={C.green} sm>
                      Sold
                    </Badge>
                  ) : (
                    <Badge color={C.textDim} sm>
                      Lead
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══ MY DRIVES (with sale logging) ═══
function MyDrives({ drives, setTD }) {
  const markOutcome = (id, outcome) => {
    setTD((p) => p.map((t) => (t.id === id ? { ...t, outcome } : t)));
  };
  const sold = drives.filter((t) => t.outcome === "sold").length;
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>
        My Test Drives
      </h1>
      <p style={{ color: C.textDim, fontSize: 13, margin: "0 0 20px" }}>
        {drives.length} total · {sold} sold ·{" "}
        {Math.round(drives.length ? (sold / drives.length) * 100 : 0)}% close
        rate
      </p>
      {drives.length === 0 ? (
        <div
          style={{
            ...C.glass,
            padding: 40,
            textAlign: "center",
            color: C.textDim,
          }}
        >
          No test drives yet
        </div>
      ) : (
        drives.map((t) => (
          <div
            key={t.id}
            style={{ ...C.glass, padding: "16px 20px", marginBottom: 8 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background:
                      t.status === "active"
                        ? C.green + "12"
                        : t.outcome === "sold"
                          ? C.green + "12"
                          : t.outcome === "not_sold"
                            ? C.surfaceLight
                            : C.accent + "12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t.status === "active"
                    ? I.dot(C.green, 10)
                    : t.outcome === "sold"
                      ? I.dollar(C.green, 14)
                      : t.outcome === "not_sold"
                        ? I.x(C.textDim, 14)
                        : I.hourglass(C.accent, 14)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {t.customer}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>
                    {t.vehicle} · {t.date} · {t.timeIn}
                    {t.timeOut ? ` - ${t.timeOut}` : ""}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {t.status === "active" ? (
                  <Badge color={C.green} sm>
                    Active
                  </Badge>
                ) : t.outcome === "sold" ? (
                  <Badge color={C.green} sm>
                    Sold
                  </Badge>
                ) : t.outcome === "not_sold" ? (
                  <Badge color={C.textDim} sm>
                    No Sale
                  </Badge>
                ) : (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => markOutcome(t.id, "sold")}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: C.green + "12",
                        border: `1px solid ${C.green}33`,
                        color: C.green,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Outfit',sans-serif",
                      }}
                    >
                      Sold
                    </button>
                    <button
                      onClick={() => markOutcome(t.id, "not_sold")}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: C.surfaceLight,
                        border: `1px solid ${C.border}`,
                        color: C.textMuted,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Outfit',sans-serif",
                      }}
                    >
                      No Sale
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ═══ COMMISSION PAGE (Sales) ═══
function CommissionPage({ td, salesId }) {
  const currentMonth = getCurrentMonthKey();
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const months = getAvailableMonths(td);
  const myDrives = td.filter(
    (t) => t.salesId === salesId && getMonthKey(t.date) === monthFilter,
  );
  const sold = myDrives.filter((t) => t.outcome === "sold").length;
  const tier = getCommTier(sold);
  const grossEst = sold * AVG_GROSS_PER_CAR;
  const commEst = Math.round(grossEst * tier.rate);
  const totalEst = commEst + tier.bonus;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
          Commission Tracker
        </h1>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: "#fff",
            color: C.text,
            fontSize: 13,
            fontFamily: "'Outfit',sans-serif",
            cursor: "pointer",
          }}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {getMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}
      >
        <Stat
          label="Cars Sold"
          value={sold}
          color={C.green}
          icon={I.dollar(C.green, 16)}
        />
        <Stat
          label="Est. Gross"
          value={grossEst}
          prefix="$"
          color={C.blue}
          icon={I.trend(C.textDim, 16)}
        />
        <Stat
          label="Commission"
          value={commEst}
          prefix="$"
          color={C.accent}
          icon={I.dollar(C.accent, 16)}
        />
        <Stat
          label="Tier Bonus"
          value={tier.bonus}
          prefix="$"
          color={C.purple}
          icon={I.check(C.purple, 16)}
        />
      </div>

      <div style={{ ...C.glass, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
          Estimated Total Payout
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, ...C.gradText }}>
          ${totalEst.toLocaleString()}
        </div>
        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
          at {(tier.rate * 100).toFixed(0)}% commission rate ({tier.label})
        </div>
      </div>

      <div style={{ ...C.glass, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          Commission Tiers
        </div>
        {COMMISSION_TIERS.map((t, i) => {
          const isActive = sold >= t.min && sold <= t.max;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                borderRadius: 12,
                marginBottom: 6,
                background: isActive ? C.accent + "08" : "transparent",
                border: isActive
                  ? `1px solid ${C.accent}22`
                  : `1px solid transparent`,
              }}
            >
              <div style={{ width: 36, textAlign: "center" }}>
                {isActive ? (
                  I.check(C.green, 18)
                ) : (
                  <span style={{ fontSize: 14, color: C.textDim }}>—</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: isActive ? C.text : C.textMuted,
                  }}
                >
                  {t.label}
                </div>
                <div style={{ fontSize: 12, color: C.textDim }}>
                  {(t.rate * 100).toFixed(0)}% of gross + ${t.bonus} bonus
                </div>
              </div>
              {isActive && <Badge color={C.accent}>Current</Badge>}
            </div>
          );
        })}
      </div>

      <div style={{ ...C.glass, padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          Sales This Month
        </div>
        {myDrives.filter((t) => t.outcome === "sold").length === 0 ? (
          <div style={{ textAlign: "center", padding: 20, color: C.textDim }}>
            No sales recorded yet this month
          </div>
        ) : (
          myDrives
            .filter((t) => t.outcome === "sold")
            .map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {I.dollar(C.green, 16)}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>
                    {t.customer}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>
                    {t.vehicle} · {t.date}
                  </div>
                </div>
                <Badge color={C.green} sm>
                  Sold
                </Badge>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

// ═══ PORTALS ═══
function AdminPortal({ user, onLogout, td, setTD, alerts, setAlerts }) {
  const [view, setView] = useState("dashboard");
  const currentMonth = getCurrentMonthKey();
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const months = getAvailableMonths(td);
  const nav = [
    { id: "dashboard", icon: I.grid(C.textMuted, 16), label: "Dashboard" },
    { id: "live", icon: I.clock(C.textMuted, 16), label: "Live Tracking" },
    { id: "performance", icon: I.trend(C.textMuted, 16), label: "Performance" },
    { id: "drives", icon: I.cal(C.textMuted, 16), label: "All Drives" },
    { id: "agreements", icon: I.pen(C.textMuted, 16), label: "Agreements" },
    { id: "customers", icon: I.user(C.textMuted, 16), label: "Customers" },
    { id: "inventory", icon: I.tag(C.textMuted, 16), label: "Inventory" },
    { id: "team", icon: I.users(C.textMuted, 16), label: "Team" },
  ];
  const filtered = td.filter((t) => getMonthKey(t.date) === monthFilter);
  const active = td.filter((t) => t.status === "active");
  const content = () => {
    if (view === "inventory") return <InvView td={td} />;
    if (view === "live") return <LiveDashboard td={td} setTD={setTD} />;
    if (view === "drives")
      return (
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 24px" }}>
            All Test Drives
          </h1>
          <TDTable drives={td} />
        </div>
      );
    if (view === "agreements") return <AgreementsPage td={td} />;
    if (view === "customers") return <CustomersPage td={td} />;
    if (view === "performance") return <PerformancePage td={td} />;
    if (view === "team")
      return (
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 24px" }}>
            Sales Team
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 14,
            }}
          >
            {SP.map((s) => {
              const d = td.filter((t) => t.salesId === s.id);
              const monthDrives = filtered.filter((t) => t.salesId === s.id);
              const monthSold = monthDrives.filter(
                (t) => t.outcome === "sold",
              ).length;
              return (
                <div key={s.id} style={{ ...C.glass, padding: 22 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: C.accent + "12",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        color: C.accent,
                      }}
                    >
                      {s.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{s.name}</div>
                      <Badge color={s.active ? C.green : C.textDim} sm>
                        {s.active ? "On Floor" : "Off"}
                      </Badge>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {[
                      ["All Time", d.length, C.blue],
                      ["This Month", monthDrives.length, C.accent],
                      ["Sold", monthSold, C.green],
                    ].map(([l, v, c]) => (
                      <div
                        key={l}
                        style={{
                          textAlign: "center",
                          padding: 10,
                          borderRadius: 10,
                          background: C.surface,
                        }}
                      >
                        <div
                          style={{ fontSize: 20, fontWeight: 700, color: c }}
                        >
                          {v}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: C.textDim,
                            marginTop: 3,
                          }}
                        >
                          {l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    // DASHBOARD - Current Month focus
    const sold = filtered.filter((t) => t.outcome === "sold").length;
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ color: C.textDim, fontSize: 13, margin: "4px 0 0" }}>
              Magnetism Motors — Lawrenceville, GA
            </p>
          </div>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: "#fff",
              color: C.text,
              fontSize: 13,
              fontFamily: "'Outfit',sans-serif",
              cursor: "pointer",
            }}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {getMonthLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <TodayTestDrives td={td} setTD={setTD} />

        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <Stat
            label="Test Drives"
            value={filtered.length}
            icon={I.car(C.textDim, 16)}
            sub={getMonthLabel(monthFilter)}
          />
          <Stat
            label="Active Now"
            value={active.length}
            color={C.green}
            icon={I.dot(C.green, 10)}
          />
          <Stat
            label="Cars Sold"
            value={sold}
            color={C.green}
            icon={I.dollar(C.textDim, 16)}
          />
          <Stat
            label="Close Rate"
            value={
              filtered.length ? Math.round((sold / filtered.length) * 100) : 0
            }
            suffix="%"
            color={C.purple}
            icon={I.trend(C.textDim, 16)}
          />
        </div>

        <MonthComparison td={td} currentMonth={monthFilter} />
        <SalespersonBarChart td={td} monthKey={monthFilter} />
      </div>
    );
  };
  return (
    <Shell
      user={user}
      onLogout={onLogout}
      nav={nav}
      active={view}
      setView={setView}
    >
      <AlertToast
        alerts={alerts}
        onDismiss={(i) => setAlerts((p) => p.filter((_, j) => j !== i))}
      />
      {content()}
    </Shell>
  );
}

function ManagerPortal({ user, onLogout, td, setTD, alerts, setAlerts }) {
  const [view, setView] = useState("floor");
  const currentMonth = getCurrentMonthKey();
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const months = getAvailableMonths(td);
  const nav = [
    { id: "floor", icon: I.grid(C.textMuted, 16), label: "Floor View" },
    { id: "live", icon: I.clock(C.textMuted, 16), label: "Live Tracking" },
    { id: "performance", icon: I.trend(C.textMuted, 16), label: "Performance" },
    { id: "drives", icon: I.car(C.textMuted, 16), label: "All Drives" },
    { id: "agreements", icon: I.pen(C.textMuted, 16), label: "Agreements" },
    { id: "team", icon: I.users(C.textMuted, 16), label: "Salespeople" },
    { id: "inventory", icon: I.tag(C.textMuted, 16), label: "Inventory" },
  ];
  const active = td.filter((t) => t.status === "active");
  const filtered = td.filter((t) => getMonthKey(t.date) === monthFilter);
  const content = () => {
    if (view === "inventory") return <InvView td={td} />;
    if (view === "live") return <LiveDashboard td={td} setTD={setTD} />;
    if (view === "performance") return <PerformancePage td={td} />;
    if (view === "drives")
      return (
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 24px" }}>
            All Test Drives
          </h1>
          <TDTable drives={td} />
        </div>
      );
    if (view === "agreements") return <AgreementsPage td={td} />;
    if (view === "team")
      return (
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 24px" }}>
            Salespeople
          </h1>
          {SP.map((s) => (
            <div
              key={s.id}
              style={{
                ...C.glass,
                padding: "16px 20px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: C.blue + "12",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: C.blue,
                }}
              >
                {s.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>
                  {td.filter((t) => t.salesId === s.id).length} drives ·{" "}
                  {
                    filtered.filter(
                      (t) => t.salesId === s.id && t.outcome === "sold",
                    ).length
                  }{" "}
                  sold this month
                </div>
              </div>
              <Badge color={s.active ? C.green : C.textDim} sm>
                {s.active ? "On Floor" : "Off"}
              </Badge>
            </div>
          ))}
        </div>
      );
    // FLOOR VIEW
    const sold = filtered.filter((t) => t.outcome === "sold").length;
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
            Floor View
          </h1>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: "#fff",
              color: C.text,
              fontSize: 13,
              fontFamily: "'Outfit',sans-serif",
              cursor: "pointer",
            }}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {getMonthLabel(m)}
              </option>
            ))}
          </select>
        </div>
        <TodayTestDrives td={td} setTD={setTD} />
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <Stat
            label="Active"
            value={active.length}
            color={C.green}
            icon={I.dot(C.green, 10)}
          />
          <Stat
            label="This Month"
            value={filtered.length}
            icon={I.car(C.textDim, 16)}
          />
          <Stat
            label="Sold"
            value={sold}
            color={C.green}
            icon={I.dollar(C.textDim, 16)}
          />
        </div>
        <MonthComparison td={td} currentMonth={monthFilter} />
        <SalespersonBarChart td={td} monthKey={monthFilter} />
      </div>
    );
  };
  return (
    <Shell
      user={user}
      onLogout={onLogout}
      nav={nav}
      active={view}
      setView={setView}
    >
      <AlertToast
        alerts={alerts}
        onDismiss={(i) => setAlerts((p) => p.filter((_, j) => j !== i))}
      />
      {content()}
    </Shell>
  );
}

function SalesPortal({ user, onLogout, td, setTD, alerts, setAlerts }) {
  const [view, setView] = useState("dashboard");
  const currentMonth = getCurrentMonthKey();
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const months = getAvailableMonths(td);
  const nav = [
    { id: "dashboard", icon: I.home(C.textMuted, 16), label: "My Dashboard" },
    { id: "new", icon: I.plus(C.textMuted, 16), label: "New Test Drive" },
    { id: "live", icon: I.clock(C.textMuted, 16), label: "Live Tracking" },
    { id: "drives", icon: I.car(C.textMuted, 16), label: "My Drives" },
    { id: "commission", icon: I.dollar(C.textMuted, 16), label: "Commission" },
    { id: "inventory", icon: I.tag(C.textMuted, 16), label: "Inventory" },
  ];
  const my = td.filter((t) => t.salesId === 1);
  const myMonth = my.filter((t) => getMonthKey(t.date) === monthFilter);
  const content = () => {
    if (view === "inventory") return <InvView td={td} />;
    if (view === "new")
      return (
        <NewTD testDrives={td} setTestDrives={setTD} setAlerts={setAlerts} />
      );
    if (view === "live") return <LiveDashboard td={td} setTD={setTD} />;
    if (view === "drives") return <MyDrives drives={my} setTD={setTD} />;
    if (view === "commission") return <CommissionPage td={td} salesId={1} />;
    const sold = myMonth.filter((t) => t.outcome === "sold").length;
    const tier = getCommTier(sold);
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p style={{ color: C.textDim, fontSize: 13, margin: "4px 0 0" }}>
              {getMonthLabel(monthFilter)}
            </p>
          </div>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: "#fff",
              color: C.text,
              fontSize: 13,
              fontFamily: "'Outfit',sans-serif",
              cursor: "pointer",
            }}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {getMonthLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <TodayTestDrives td={td} setTD={setTD} />

        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <Stat
            label="My Drives"
            value={myMonth.length}
            icon={I.car(C.textDim, 16)}
            sub={getMonthLabel(monthFilter)}
          />
          <Stat
            label="Active"
            value={my.filter((t) => t.status === "active").length}
            color={C.green}
            icon={I.dot(C.green, 10)}
          />
          <Stat
            label="Sold"
            value={sold}
            color={C.green}
            icon={I.dollar(C.textDim, 16)}
          />
          <Stat
            label="Close Rate"
            value={
              myMonth.length ? Math.round((sold / myMonth.length) * 100) : 0
            }
            suffix="%"
            color={C.purple}
            icon={I.trend(C.textDim, 16)}
          />
        </div>

        {/* Commission Summary Card */}
        <div
          style={{
            ...C.glass,
            padding: 20,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: C.textMuted,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              Estimated Commission
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, ...C.gradText }}>
              $
              {(
                Math.round(sold * AVG_GROSS_PER_CAR * tier.rate) + tier.bonus
              ).toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
              {tier.label} · {(tier.rate * 100).toFixed(0)}% rate
              {tier.bonus > 0 ? ` + $${tier.bonus} bonus` : ""}
            </div>
          </div>
          <button
            onClick={() => setView("commission")}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: C.accent,
              border: "none",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            View Details
          </button>
        </div>

        <MonthComparison td={my} currentMonth={monthFilter} />

        {my.filter((t) => t.outcome === null && t.status === "completed")
          .length > 0 && (
          <div
            style={{
              ...C.glass,
              padding: 16,
              marginBottom: 20,
              borderLeft: `3px solid ${C.accent}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ opacity: 0.5 }}>{I.hourglass(C.accent, 16)}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>
                You have{" "}
                {
                  my.filter(
                    (t) => t.outcome === null && t.status === "completed",
                  ).length
                }{" "}
                drives waiting for outcome
              </span>
              <button
                onClick={() => setView("drives")}
                style={{
                  marginLeft: "auto",
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: C.accent + "12",
                  border: `1px solid ${C.accent}28`,
                  color: C.accent,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                Update Now
              </button>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>
          Recent
        </h2>
        {my.slice(0, 6).map((t) => (
          <div
            key={t.id}
            style={{
              ...C.glass,
              padding: "12px 16px",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{ width: 24, display: "flex", justifyContent: "center" }}
            >
              {t.status === "active"
                ? I.dot(C.green, 10)
                : t.outcome === "sold"
                  ? I.dollar(C.green, 14)
                  : t.outcome === "not_sold"
                    ? I.x(C.textDim, 14)
                    : I.hourglass(C.accent, 14)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.customer}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>
                {t.vehicle} · {t.date}
              </div>
            </div>
            <Badge
              color={
                t.outcome === "sold"
                  ? C.green
                  : t.status === "active"
                    ? C.green
                    : t.outcome === "not_sold"
                      ? C.textDim
                      : C.accent
              }
              sm
            >
              {t.outcome === "sold"
                ? "Sold"
                : t.status === "active"
                  ? "Active"
                  : t.outcome === "not_sold"
                    ? "No Sale"
                    : "Pending"}
            </Badge>
          </div>
        ))}
      </div>
    );
  };
  return (
    <Shell
      user={user}
      onLogout={onLogout}
      nav={nav}
      active={view}
      setView={setView}
    >
      {content()}
    </Shell>
  );
}

// ═══ GLOBAL RESPONSIVE STYLES ═══
const RESP_CSS = `
@media(max-width:768px){
  .resp-grid-2{grid-template-columns:1fr !important}
  .resp-grid-3{grid-template-columns:1fr !important}
  .resp-grid-cards{grid-template-columns:1fr !important}
  .resp-inv-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr)) !important}
  .resp-table-wrap{font-size:12px !important}
  .resp-table-wrap th,.resp-table-wrap td{padding:8px 6px !important}
  .resp-inv-filters{flex-direction:column !important;align-items:stretch !important}
  .resp-inv-header{flex-direction:column !important;gap:12px !important}
  .feat-grid{grid-template-columns:1fr !important}
}
`;

// ═══ ROOT ═══
export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [td, setTD] = useState(() => genHistory());
  const [alerts, setAlerts] = useState([]);
  const login = (u) => {
    setUser(u);
    setPage("app");
  };
  const logout = () => {
    setUser(null);
    setPage("landing");
  };
  return (
    <>
      <style>{RESP_CSS}</style>
      {page === "landing" ? (
        <LandingPage onLogin={() => setPage("login")} />
      ) : page === "login" ? (
        <LoginPage onLogin={login} onBack={() => setPage("landing")} />
      ) : user?.role === "admin" ? (
        <AdminPortal
          user={user}
          onLogout={logout}
          td={td}
          setTD={setTD}
          alerts={alerts}
          setAlerts={setAlerts}
        />
      ) : user?.role === "manager" ? (
        <ManagerPortal
          user={user}
          onLogout={logout}
          td={td}
          setTD={setTD}
          alerts={alerts}
          setAlerts={setAlerts}
        />
      ) : user?.role === "salesperson" ? (
        <SalesPortal
          user={user}
          onLogout={logout}
          td={td}
          setTD={setTD}
          alerts={alerts}
          setAlerts={setAlerts}
        />
      ) : null}
    </>
  );
}
