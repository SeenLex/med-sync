export async function createZoomMeeting(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Missing required environment variables');
  }

  const authResponse = await fetch('https://zoom.us/oauth/token?' + new URLSearchParams({
    grant_type: 'account_credentials',
    account_id: accountId,
  }), {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
  });

  const authData = await authResponse.json();
  const accessToken = authData.access_token;

  try {
    const meetingResponse = await fetch(
      'https://api.zoom.us/v2/users/draghicideenisdaniel@gmail.com/meetings',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'Test Meeting',
          type: 2,
          start_time: new Date(Date.now() + 3600000).toISOString(),
          duration: 60,
          timezone: 'UTC',
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: true,
            mute_upon_entry: false,
            watermark: false,
            use_pmi: false,
            approval_type: 0,
            registration_type: 1,
            audio: 'both',
            auto_recording: 'none',
          },
        }),
      }
    );

    const meetingData = await meetingResponse.json();
    return meetingData.join_url;
  } catch (error) {
    console.log({ error })
    return "";
  }
}