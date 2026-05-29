export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fornavn, etternavn, epost, destinasjon, avreise, reisende, melding, pakke } = req.body;

  const emailBody = `
    <h2>Ny reiseforespÃ¸rsel! âœˆï¸</h2>
    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold;color:#a97248;">Pakke</td><td style="padding:8px">${pakke}</td></tr>
      <tr style="background:#f9f5f0"><td style="padding:8px;font-weight:bold;color:#a97248;">Navn</td><td style="padding:8px">${fornavn} ${etternavn}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#a97248;">E-post</td><td style="padding:8px"><a href="mailto:${epost}">${epost}</a></td></tr>
      <tr style="background:#f9f5f0"><td style="padding:8px;font-weight:bold;color:#a97248;">Destinasjon</td><td style="padding:8px">${destinasjon || 'â€”'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#a97248;">Avreise</td><td style="padding:8px">${avreise || 'â€”'}</td></tr>
      <tr style="background:#f9f5f0"><td style="padding:8px;font-weight:bold;color:#a97248;">Reisende</td><td style="padding:8px">${reisende}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#a97248;">Melding</td><td style="padding:8px">${melding || 'â€”'}</td></tr>
    </table>
    <p style="margin-top:24px;font-family:sans-serif;color:#8a7b6f;font-size:13px;">
      Svar kunden pÃ¥: <a href="mailto:${epost}">${epost}</a>
    </p>
  `;

  try {
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
        subject: `Ny forespÃ¸rsel fra ${fornavn} ${etternavn} â€” ${pakke}`,
        html: emailBody,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Kunne ikke sende e-post' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Serverfeil' });
  }
}
