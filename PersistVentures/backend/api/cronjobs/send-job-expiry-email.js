import { sendJobExpiryEmail } from '../../controller/emailController.js';

export default async function handler(req, res) {
  await sendJobExpiryEmail(req, res);
}
