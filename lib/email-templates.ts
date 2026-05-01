export const BASE_URL = "https://preveil.shop";

const wrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:#120d08;padding:36px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;letter-spacing:0.3em;color:#f0ead6;text-transform:uppercase;">Preveil</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 40px;font-family:Georgia,serif;color:#1a1208;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f0e8;padding:24px 40px;text-align:center;border-top:1px solid #e5ddd0;">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#9a8f82;letter-spacing:0.2em;text-transform:uppercase;">
              preveil.shop
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

const goldButton = (href: string, label: string) => `
  <div style="text-align:center;margin:36px 0;">
    <a href="${href}" style="display:inline-block;padding:12px 40px;border:1px solid #c8a45a;color:#c8a45a;text-decoration:none;font-family:Georgia,serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">
      ${label}
    </a>
  </div>
`;

const divider = `<hr style="border:none;border-top:1px solid #e5ddd0;margin:36px 0;">`;

export function welcomeEmail(availablePoints: number) {
  const dollarValue = (availablePoints / 100).toFixed(2);

  const content = `
    <h2 style="font-size:26px;font-weight:300;letter-spacing:0.1em;margin:0 0 24px;">Welcome.</h2>
    <p style="line-height:1.9;color:#444;margin:0 0 20px;">
      You've joined a community of people who believe the world is more alive than modern culture admits. We make goods for those who remember.
    </p>
    <p style="line-height:1.9;color:#444;margin:0 0 32px;">
      As a welcome gift, you have <strong style="color:#1a1208;">${availablePoints} reward points</strong> — worth <strong style="color:#c8a45a;">$${dollarValue}</strong> to redeem at checkout. You'll earn more points with every order that ships.
    </p>
    ${goldButton(`${BASE_URL}/shop`, "Explore the Shop")}
    ${divider}
  `;

  return wrapper(content);
}

export function postPurchaseEmail({
  items,
  total,
  pointsRedeemed,
  pointsEarned,
  availablePoints,
}: {
  items: { name: string; variantName: string; quantity: number; price: number }[];
  total: number;
  pointsRedeemed: number;
  pointsEarned: number;
  availablePoints: number;
}) {
  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:14px;color:#444;border-bottom:1px solid #f0ebe3;">
        ${item.name} <span style="color:#9a8f82;">— ${item.variantName} × ${item.quantity}</span>
      </td>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:14px;color:#c8a45a;text-align:right;border-bottom:1px solid #f0ebe3;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join("");

  const redemptionRow = pointsRedeemed > 0 ? `
    <tr>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:13px;color:#9a8f82;">
        Points redeemed (${pointsRedeemed} pts)
      </td>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:13px;color:#c8a45a;text-align:right;">
        -$${(pointsRedeemed / 100).toFixed(2)}
      </td>
    </tr>
  ` : "";

  const pointsNote = pointsEarned > 0 ? `
    <p style="line-height:1.9;color:#444;margin:0 0 20px;">
      You've earned <strong style="color:#1a1208;">${pointsEarned} reward points</strong> on this order. They'll be available to redeem in 14 days — you'll see them reflected in your account.
    </p>
    <p style="line-height:1.9;color:#444;margin:0 0 32px;">
      Your current available balance: <strong style="color:#c8a45a;">${availablePoints} points ($${(availablePoints / 100).toFixed(2)})</strong>
    </p>
  ` : `
    <p style="line-height:1.9;color:#444;margin:0 0 32px;">
      Your current points balance: <strong style="color:#c8a45a;">${availablePoints} points ($${(availablePoints / 100).toFixed(2)})</strong>
    </p>
  `;

  const content = `
    <h2 style="font-size:26px;font-weight:300;letter-spacing:0.1em;margin:0 0 8px;">Thank you.</h2>
    <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#9a8f82;margin:0 0 36px;">Your order is confirmed</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${itemRows}
      ${redemptionRow}
      <tr>
        <td style="padding:16px 0 0;font-family:Georgia,serif;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#9a8f82;">Total</td>
        <td style="padding:16px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:300;color:#1a1208;text-align:right;">$${total.toFixed(2)}</td>
      </tr>
    </table>

    ${divider}
    ${pointsNote}
    ${goldButton(`${BASE_URL}/account`, "View Your Account")}
    ${divider}

    <p style="font-size:13px;line-height:1.9;color:#888;text-align:center;margin:0;">
      Something wrong with your order? Reach us at <a href="mailto:preveil.llc@gmail.com" style="color:#c8a45a;text-decoration:none;">preveil.llc@gmail.com</a>
    </p>
  `;

  return wrapper(content);
}

export function accountDeletedEmail() {
  const content = `
    <h2 style="font-size:26px;font-weight:300;letter-spacing:0.1em;margin:0 0 24px;">Your account has been deleted.</h2>
    <p style="line-height:1.9;color:#444;margin:0 0 20px;">
      Your Preveil account and all associated data have been permanently removed as requested.
    </p>
    <p style="line-height:1.9;color:#444;margin:0 0 32px;">
      If you didn't request this, please contact us immediately at <a href="mailto:preveil.llc@gmail.com" style="color:#c8a45a;text-decoration:none;">preveil.llc@gmail.com</a>.
    </p>
    ${divider}
    <p style="font-size:13px;line-height:1.9;color:#888;text-align:center;margin:0;">
      You're always welcome back. <a href="${BASE_URL}/account" style="color:#c8a45a;text-decoration:none;">Create a new account</a>
    </p>
  `;

  return wrapper(content);
}

export function shippingNotificationEmail({
  carrier,
  trackingNumber,
  trackingUrl,
}: {
  carrier: string;
  trackingNumber: string;
  trackingUrl: string | null;
}) {
  const trackingButton = trackingUrl
    ? goldButton(trackingUrl, "Track Your Order")
    : `<p style="line-height:1.9;color:#444;margin:0 0 32px;">Tracking number: <strong style="color:#1a1208;">${trackingNumber}</strong> via ${carrier}</p>`;

  const content = `
    <h2 style="font-size:26px;font-weight:300;letter-spacing:0.1em;margin:0 0 8px;">Your order is on its way.</h2>
    <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#9a8f82;margin:0 0 36px;">Shipped via ${carrier}</p>

    <p style="line-height:1.9;color:#444;margin:0 0 20px;">
      Tracking number: <strong style="color:#1a1208;">${trackingNumber}</strong>
    </p>

    ${trackingButton}
    ${divider}

    <p style="font-size:13px;line-height:1.9;color:#888;text-align:center;margin:0;">
      Questions? Reach us at <a href="mailto:preveil.llc@gmail.com" style="color:#c8a45a;text-decoration:none;">preveil.llc@gmail.com</a>
    </p>
  `;

  return wrapper(content);
}

export function abandonedCartEmail(items: { name: string; variantName: string; quantity: number; price: number }[]) {
  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:14px;color:#444;border-bottom:1px solid #f0ebe3;">
        ${item.name} <span style="color:#9a8f82;">— ${item.variantName} × ${item.quantity}</span>
      </td>
      <td style="padding:10px 0;font-family:Georgia,serif;font-size:14px;color:#c8a45a;text-align:right;border-bottom:1px solid #f0ebe3;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join("");

  const content = `
    <h2 style="font-size:26px;font-weight:300;letter-spacing:0.1em;margin:0 0 8px;">Something left behind.</h2>
    <p style="line-height:1.9;color:#444;margin:0 0 32px;">
      You left a few things in your cart. They're still waiting for you.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${itemRows}
    </table>

    ${goldButton(`${BASE_URL}/cart`, "Return to Cart")}
    ${divider}

    <p style="font-size:13px;line-height:1.9;color:#888;text-align:center;margin:0;">
      Questions? Reach us at <a href="mailto:preveil.llc@gmail.com" style="color:#c8a45a;text-decoration:none;">preveil.llc@gmail.com</a>
    </p>
  `;

  return wrapper(content);
}
