// createSession(userId) — створює access та refresh токени, створює сесію в базі даних і повертає її;
// setSessionCookies(res, session) — додає до відповіді три кукі:
// accessToken
// refreshToken
// sessionId

// httpOnly: true
// secure: true
// sameSite: 'none'
// maxAge: для accessToken — 15 хв, для refreshToken і sessionId — 1 день
