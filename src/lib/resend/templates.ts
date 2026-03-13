import type { Hook } from '@/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://tempo.app'

export function weeklyHooksEmail(hooks: Hook[]): { subject: string; html: string } {
  const hookRows = hooks.map((h) => `
    <tr>
      <td style="padding:16px 24px;border-bottom:1px solid #2A2A2A;">
        <p style="margin:0 0 4px 0;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;">${h.text}</p>
        <p style="margin:0;font-family:Inter,Helvetica,Arial,sans-serif;font-size:12px;color:#8E8E93;text-transform:uppercase;letter-spacing:0.06em;">${h.framework} &middot; ${Math.round(h.trend_confidence * 100)}% trend</p>
      </td>
    </tr>
  `).join('')

  return {
    subject: 'Your weekly hooks from Tempo',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding:0 0 32px 0;">
          <p style="margin:0;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;color:#FFFFFF;">Tempo</p>
        </td></tr>
        <tr><td style="padding:0 0 8px 0;">
          <p style="margin:0;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;font-size:28px;font-weight:700;color:#FFFFFF;">Fresh hooks, just for you</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <p style="margin:0;font-size:15px;color:#8E8E93;">This week's trending video hooks based on what's working right now.</p>
        </td></tr>
        <tr><td>
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:8px;border:1px solid #2A2A2A;">
            ${hookRows}
          </table>
        </td></tr>
        <tr><td style="padding:32px 0;" align="center">
          <a href="${APP_URL}/upload" style="display:inline-block;background-color:#0A84FF;color:#FFFFFF;font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;padding:12px 32px;border-radius:6px;text-decoration:none;">Create a video with these hooks</a>
        </td></tr>
        <tr><td style="padding:24px 0 0 0;border-top:1px solid #2A2A2A;">
          <p style="margin:0;font-size:12px;color:#48484A;text-align:center;">
            <a href="${APP_URL}/api/email/unsubscribe?token=__UNSUB_TOKEN__" style="color:#48484A;text-decoration:underline;">Unsubscribe</a> from weekly hook emails
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  }
}
