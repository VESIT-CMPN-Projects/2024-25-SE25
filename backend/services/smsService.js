import twilio from 'twilio';

// Initialize Twilio client with your credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

console.log('Twilio Config:', {
  accountSid,
  authToken: authToken ? '***' : 'missing',
  twilioPhoneNumber
});

const client = twilio(accountSid, authToken);

const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // Ensure it has country code
  if (!cleaned.startsWith('91')) {
    cleaned = '91' + cleaned;
  }
  
  // Add the plus sign
  return '+' + cleaned;
};

export const sendFineNotification = async (phoneNumber, fineDetails) => {
  try {
    if (!phoneNumber) {
      throw new Error('Phone number is required');
    }

    const message = `Traffic Fine Notice: A fine of Rs. ${fineDetails.amount} has been issued for your vehicle (${fineDetails.registrationNumber}) for ${fineDetails.violationType}. Due date: ${new Date(fineDetails.dueDate).toLocaleDateString()}. Please pay the fine before the due date to avoid additional penalties.`;

    // Format the phone number
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    console.log('Sending SMS to:', formattedPhoneNumber);
    console.log('Message content:', message);

    const result = await client.messages.create({
      body: message,
      to: formattedPhoneNumber,
      from: twilioPhoneNumber
    });

    console.log('SMS notification sent:', result.sid);
    return result;
  } catch (error) {
    console.error('Error sending SMS notification:', {
      error: error.message,
      code: error.code,
      moreInfo: error.moreInfo,
      status: error.status,
      details: error.details
    });
    throw error;
  }
};
