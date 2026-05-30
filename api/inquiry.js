export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { fornavn, etternavn, epost, destinasjon, avreise, reisende, melding, pakke } = req.body;

  const emailBody = `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#c8956c;padding:36px 40px;border-radius:12px 12px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:#fff3ec;text-transform:uppercase;font-family:Arial,sans-serif;">Vacation Guide</p>
              <h1 style="margin:8px 0 0 0;font-size:28px;color:#ffffff;font-family:'Georgia',serif;font-weight:normal;">by Karolina</h1>
              <div style="width:40px;height:1px;background:#fff3ec;margin:16px auto 0;opacity:0.5;"></div>
              <p style="margin:12px 0 0 0;font-size:13px;color:#fff3ec;letter-spacing:1px;font-family:Arial,sans-serif;">NY REISEFORESP&Oslash;RSEL</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 40px 32px;">

              <!-- Intro -->
              <p style="margin:0 0 28px 0;font-size:15px;color:#6b5c4e;line-height:1.6;font-family:Arial,sans-serif;">
                Hei Karolina! Du har mottatt en ny foresp&oslash;rsel fra <strong style="color:#c8956c;">${fornavn} ${etternavn}</strong>. Her er alle detaljene:
              </p>

              <!-- Info tabell -->
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding:12px 16px;background:#fdf8f4;border-radius:8px;margin-bottom:6px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;padding-bottom:4px;">Pakke</td>
                      </tr>
                      <tr>
                        <td style="font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;font-weight:600;">${pakke || '—'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:6px;"></td></tr>

                <tr>
                  <td style="padding:12px 16px;background:#fdf8f4;border-radius:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;padding-bottom:4px;">Navn</td>
                      </tr>
                      <tr>
                        <td style="font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;">${fornavn} ${etternavn}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:6px;"></td></tr>

                <tr>
                  <td style="padding:12px 16px;background:#fdf8f4;border-radius:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;padding-bottom:4px;">E-post</td>
                      </tr>
                      <tr>
                        <td style="font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;"><a href="mailto:${epost}" style="color:#c8956c;text-decoration:none;">${epost}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:6px;"></td></tr>

                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="49%" style="padding:12px 16px;background:#fdf8f4;border-radius:8px;">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;">Destinasjon</p>
                          <p style="margin:0;font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;">${destinasjon || '—'}</p>
                        </td>
                        <td width="2%"></td>
                        <td width="49%" style="padding:12px 16px;background:#fdf8f4;border-radius:8px;">
                          <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;">Avreise</p>
                          <p style="margin:0;font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;">${avreise || '—'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:6px;"></td></tr>

                <tr>
                  <td style="padding:12px 16px;background:#fdf8f4;border-radius:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;padding-bottom:4px;">Antall reisende</td>
                      </tr>
                      <tr>
                        <td style="font-size:15px;color:#3d2e22;font-family:Arial,sans-serif;">${reisende || '—'} person${reisende == 1 ? '' : 'er'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:6px;"></td></tr>

                <!-- Melding -->
                <tr>
                  <td style="padding:16px;background:#fdf8f4;border-radius:8px;border-left:3px solid #c8956c;">
                    <p style="margin:0 0 8px 0;font-size:10px;letter-spacing:2px;color:#c8956c;text-transform:uppercase;font-family:Arial,sans-serif;">Melding fra kunden</p>
                    <p style="margin:0;font-size:14px;color:#3d2e22;line-height:1.7;font-family:Arial,sans-serif;font-style:italic;">"${melding || '—'}"</p>
                  </td>
                </tr>

              </table>

              <!-- Svar-knapp -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${epost}?subject=Re: Din reiseforesp%C3%B8rsel - Vacation Guide by Karolina" style="display:inline-block;background-color:#c8956c;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:6px;font-size:13px;letter-spacing:1px;font-family:Arial,sans-serif;font-weight:600;">Svar kunden</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#fdf8f4;padding:24px 40px;border-radius:0 0 12px 12px;text-align:center;border-top:1px solid #ede4da;">
              <p style="margin:0;font-size:11px;color:#a89080;font-family:Arial,sans-serif;letter-spacing:1px;">VACATION GUIDE BY KAROLINA &nbsp;&bull;&nbsp; vacationguide.no</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer re_MmfQr7no_oDTR1zr6UuzV1AFy5gdZ9YDV',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Vacation Guide <noreply@vacationguide.no>',
      to: 'karolina@vacationguide.no',
      reply_to: epost,
      subject: `Ny forespørsel fra ${fornavn} ${etternavn} — ${pakke}`,
      html: emailBody,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
}
